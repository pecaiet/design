import { cloneElement, useEffect, useEffectEvent, useState, type KeyboardEvent, type MouseEvent, type ReactElement, type Ref, type RefObject } from 'react'

// What menus, pickers and popovers share: who keeps them open, closing on a press or focus outside, the button they open from,
// and moving through rows with the keys. Not exported from the package.

/** Sets a ref the way React would: a callback or an object. */
export function assign<T>(ref: Ref<T> | undefined, node: T) {
  if (typeof ref === 'function') ref(node)
  else if (ref) ref.current = node
}

/** Open or not: the app's when it passes open (with onOpenChange), else the component keeps it. */
export function useOpen(open: boolean | undefined, onOpenChange: ((open: boolean) => void) | undefined) {
  const [own, setOwn] = useState(false)
  const shown = open ?? own
  const change = (next: boolean) => {
    if (next === shown) return
    setOwn(next)
    onOpenChange?.(next)
  }
  return [shown, change] as const
}

/** While it's open, a press outside the panel and its button closes it, and so does focus moving on to something outside them (Tab).
 *  After a press on nothing that takes focus, focus goes back to the button. */
export function useOutside(open: boolean, panel: RefObject<HTMLElement | null>, button: RefObject<HTMLElement | null>, close: () => void) {
  const shut = useEffectEvent(close)
  useEffect(() => {
    if (!open) return
    const outside = (target: EventTarget | null) =>
      target instanceof Node && !panel.current?.contains(target) && !button.current?.contains(target)
    const press = (event: PointerEvent) => {
      if (!outside(event.target)) return
      shut()
      // The press moves focus by itself just after this; only then can we tell whether it went somewhere.
      setTimeout(() => {
        const now = document.activeElement
        if (!now || now === document.body || panel.current?.contains(now)) button.current?.focus({ preventScroll: true })
      })
    }
    const focus = (event: FocusEvent) => {
      if (outside(event.target)) shut()
    }
    document.addEventListener('pointerdown', press)
    document.addEventListener('focusin', focus)
    return () => {
      document.removeEventListener('pointerdown', press)
      document.removeEventListener('focusin', focus)
    }
  }, [open])
}

export type TriggerProps = {
  id?: string
  ref?: Ref<HTMLElement>
  onClick?: (event: MouseEvent<HTMLElement>) => void
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void
}

/** The button a menu or popover opens from, given what it needs. Its own id, ref and handlers stay; a handler of its own that calls
 *  preventDefault() stops ours. */
export function withTrigger(element: ReactElement<TriggerProps>, props: TriggerProps & Record<string, unknown>) {
  const own = element.props
  return cloneElement(element, {
    ...props,
    id: own.id ?? props.id,
    ref: (node: HTMLElement | null) => {
      assign(own.ref, node)
      assign(props.ref, node)
    },
    onClick: (event: MouseEvent<HTMLElement>) => {
      own.onClick?.(event)
      if (!event.defaultPrevented) props.onClick?.(event)
    },
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      own.onKeyDown?.(event)
      if (!event.defaultPrevented) props.onKeyDown?.(event)
    },
  })
}

/** Up and Down, Home and End move focus through the rows; wrap goes round from the last to the first. True when it was one of them. */
export function moveFocus(rows: HTMLElement[], key: string, wrap: boolean) {
  const at = rows.indexOf(document.activeElement as HTMLElement)
  const last = rows.length - 1
  let next: number
  if (key === 'ArrowDown') next = at < 0 ? 0 : wrap && at === last ? 0 : Math.min(at + 1, last)
  else if (key === 'ArrowUp') next = at < 0 ? last : wrap && at === 0 ? last : Math.max(at - 1, 0)
  else if (key === 'Home') next = 0
  else if (key === 'End') next = last
  else return false
  rows[next]?.focus()
  return true
}

/** A letter typed on a row moves focus to the next row whose words start with it. True when one did. */
export function typeAhead(rows: HTMLElement[], event: KeyboardEvent) {
  if (event.key.length !== 1 || event.key === ' ' || event.ctrlKey || event.metaKey || event.altKey) return false
  const at = rows.indexOf(document.activeElement as HTMLElement)
  const letter = event.key.toLocaleLowerCase()
  const next = [...rows.slice(at + 1), ...rows.slice(0, at + 1)].find(row => row.textContent?.trim().toLocaleLowerCase().startsWith(letter))
  next?.focus()
  return Boolean(next)
}
