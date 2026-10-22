import { useEffect, useEffectEvent, useId, useRef, type ComponentPropsWithRef, type FormEventHandler, type MouseEvent, type ReactNode } from 'react'
import { cx } from './cx'
import { close } from './motion'
import { assign } from './popup'

export type DialogProps = Omit<ComponentPropsWithRef<'dialog'>, 'open' | 'onClose' | 'onCancel'> & {
  /** dialog: a small window over the page (Modal, the search window). modal: the settings window. drawer: the panel from the
   *  right. The settings window and the drawer take focus themselves when they open (no row lights up); Tab moves in. */
  kind: 'dialog' | 'modal' | 'drawer'
  /** Open while true (showModal(): the page dims and focus stays inside); turning false plays the closing, then closes. */
  open: boolean
  /** Esc or a click on the dimmed page asked to close (the click counts only when the press started there too): set open to
   *  false. Also called if the browser closed it by itself. Focus goes back to what opened it. */
  onClose: () => void
  /** Working: Esc and a click on the dimmed page wait until it's done. */
  busy?: boolean
  /** A form with unsaved changes: a click on the dimmed page doesn't close it. */
  unsaved?: boolean
}

/** The <dialog> under the Modal, the Drawer, the search window and the settings window: opening, closing and its motion. */
export function Dialog({ kind, open, onClose, busy, unsaved, className, ref, onPointerDown, onClick, ...dialog }: DialogProps) {
  const own = useRef<HTMLDialogElement>(null)
  const pressed = useRef(false)

  useEffect(() => {
    const element = own.current
    if (!element) return
    if (open && !element.open) {
      element.showModal()
      if (kind !== 'dialog') element.focus()
    }
    if (!open && element.open) close(element)
  }, [open])

  // Esc is handled here, before pecaiet.js would close it on its own, so closing always goes through the app (and waits while busy).
  const cancel = useEffectEvent((event: Event) => {
    if (event.target !== own.current) return
    event.stopPropagation()
    event.preventDefault()
    if (!busy) onClose()
  })
  useEffect(() => {
    if (!open) return
    const listener = (event: Event) => cancel(event)
    window.addEventListener('cancel', listener, true)
    return () => window.removeEventListener('cancel', listener, true)
  }, [open])

  // On the dimmed page: the press lands on the dialog itself, outside its box.
  const outside = (event: MouseEvent<HTMLDialogElement>) => {
    const box = event.currentTarget.getBoundingClientRect()
    return event.target === event.currentTarget
      && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)
  }

  return (
    <dialog
      tabIndex={kind === 'dialog' ? undefined : -1}
      {...dialog}
      ref={node => {
        own.current = node
        assign(ref, node)
      }}
      className={cx(`pc-${kind}`, className)}
      onClose={() => {
        if (open) onClose()
      }}
      onPointerDown={event => {
        pressed.current = outside(event)
        onPointerDown?.(event)
      }}
      onClick={event => {
        if (pressed.current && outside(event) && !busy && !unsaved) onClose()
        pressed.current = false
        onClick?.(event)
      }}
    />
  )
}

export type ModalProps = Omit<DialogProps, 'kind' | 'title' | 'children' | 'onSubmit'> & {
  /** The question, or the task: "Sign out everywhere?", "New list". The window is labelled by it. */
  title: ReactNode
  /** What happens, in muted words under the title. */
  description?: ReactNode
  /** Fields (choices use the Select), an error Alert first, longer text. It scrolls when it doesn't fit; the title and the actions
   *  stay where they are. */
  children?: ReactNode
  /** Cancel (outline), then the action named for what it does ("Sign out", "Delete user"; never "OK"), primary, or solid red for a
   *  delete that can't be undone. Working: the action busy, Cancel disabled, and busy on the Modal. */
  actions: ReactNode
  /** Makes it a form, so Enter in a field sends it: give the action type="submit". */
  onSubmit?: FormEventHandler<HTMLFormElement>
}

/** A small window over the page that asks one thing: a yes or no, or a few fields. No x: Cancel, Esc or the dimmed page close it.
 *  Opening focuses the first field, or Cancel (put it first) for a confirmation. A sheet from the bottom on phones. */
export function Modal({ title, description, children, actions, onSubmit, ...dialog }: ModalProps) {
  const id = useId()
  const parts = (
    <>
      <div>
        <h2 className="pc-dialog-title" id={id}>{title}</h2>
        {description && <p className="pc-dialog-description">{description}</p>}
      </div>
      {children && <div className="pc-dialog-content">{children}</div>}
      <div className="pc-dialog-actions">{actions}</div>
    </>
  )
  return (
    <Dialog aria-labelledby={id} {...dialog} kind="dialog">
      {onSubmit ? <form className="pc-dialog-body" onSubmit={onSubmit}>{parts}</form> : <div className="pc-dialog-body">{parts}</div>}
    </Dialog>
  )
}
