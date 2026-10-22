import { CheckCircle, Info, Warning, WarningCircle, X } from '@phosphor-icons/react'
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode, type Ref } from 'react'
import { Button } from './Button'
import { leave } from './motion'

const ICONS = { success: <CheckCircle />, warning: <Warning />, error: <WarningCircle />, news: <Info /> }

export type ToastOptions = {
  /** One short sentence: "Task deleted", "Couldn't save". */
  text: ReactNode
  /** success: a teal tick. warning: amber (offline, about to run out). error: red. News, muted, by default. */
  tone?: 'success' | 'warning' | 'error'
  /** A ghost button before the x ("Undo", "Retry"); it closes the toast too. */
  action?: { label: ReactNode; onClick: () => void }
  /** How long it stays, in ms: about five seconds, ten with an action. Never while it's under the pointer or has focus. */
  duration?: number
}

/** Shows a toast and gives back its id; toast.dismiss(id) takes it away early. */
export type Toaster = ((toast: ToastOptions) => number) & { dismiss: (id: number) => void }

const Toasts = createContext<Toaster | null>(null)

/** toast({ text, tone }) from anywhere under the ToastProvider. */
export function useToast() {
  const toast = useContext(Toasts)
  if (!toast) throw new Error('useToast needs a ToastProvider around the app.')
  return toast
}

export type ToastProviderProps = { children: ReactNode }

/** Holds the toasts over the page at the bottom right (across the bottom on phones), the newest at the bottom. Put it once around
 *  the app. Something people must act on before going on is an Alert or a Modal, not a toast. */
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<(ToastOptions & { id: number })[]>([])
  const elements = useRef(new Map<number, HTMLDivElement>())
  const leaving = useRef(new Set<number>())
  const last = useRef(0)

  const toast = useMemo(() => {
    // It shrinks out while it fades and the toasts above glide down, then it goes. (It grows in by itself: pecaiet.js.)
    const dismiss = async (id: number) => {
      if (leaving.current.has(id)) return
      leaving.current.add(id)
      await leave(elements.current.get(id) ?? null)
      leaving.current.delete(id)
      setToasts(list => list.filter(item => item.id !== id))
    }
    const show = (options: ToastOptions) => {
      const id = ++last.current
      setToasts(list => [...list, { ...options, id }])
      return id
    }
    return Object.assign(show, { dismiss })
  }, [])

  return (
    <Toasts value={toast}>
      {children}
      <div className="pc-toasts">
        {toasts.map(({ id, ...options }) => (
          <Toast
            key={id}
            {...options}
            ref={element => {
              if (element) elements.current.set(id, element)
              else elements.current.delete(id)
            }}
            onDismiss={() => toast.dismiss(id)}
          />
        ))}
      </div>
    </Toasts>
  )
}

function Toast({ text, tone, action, duration, onDismiss, ref }: ToastOptions & { onDismiss: () => void; ref: Ref<HTMLDivElement> }) {
  const left = useRef(duration ?? (action ? 10000 : 5000))
  const since = useRef(0)
  const timer = useRef<number>(undefined)
  const holds = useRef({ pointer: false, focus: false })

  const run = () => {
    since.current = Date.now()
    timer.current = window.setTimeout(onDismiss, left.current)
  }
  useEffect(() => {
    run()
    return () => window.clearTimeout(timer.current)
  }, [])
  // Under the pointer or with focus, it waits; the time left runs on once both have gone.
  const hold = (kind: 'pointer' | 'focus', on: boolean) => {
    const was = holds.current.pointer || holds.current.focus
    holds.current[kind] = on
    const is = holds.current.pointer || holds.current.focus
    if (is && !was) {
      window.clearTimeout(timer.current)
      left.current -= Date.now() - since.current
    }
    if (was && !is) run()
  }

  return (
    <div
      ref={ref}
      className="pc-toast"
      data-tone={tone}
      role={tone === 'error' ? 'alert' : 'status'}
      onPointerEnter={() => hold('pointer', true)}
      onPointerLeave={() => hold('pointer', false)}
      onFocus={() => hold('focus', true)}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) hold('focus', false)
      }}
    >
      {ICONS[tone ?? 'news']}
      <span className="pc-toast-text">{text}</span>
      {action && (
        <Button variant="ghost" onClick={() => {
          action.onClick()
          onDismiss()
        }}>
          {action.label}
        </Button>
      )}
      <Button
        variant="ghost"
        icon={<X />}
        label="Dismiss"
        data-pc-dismiss=""
        onClick={event => {
          // Handled here, so pecaiet.js doesn't remove an element React still owns.
          event.preventDefault()
          onDismiss()
        }}
      />
    </div>
  )
}
