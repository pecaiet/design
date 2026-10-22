import { cloneElement, useEffect, type ReactElement } from 'react'

export type TooltipProps = {
  /** A few words, one short sentence at most. On an icon-only button, its name: the same words as its aria-label (Button's label
   *  gives it one already). A shortcut goes after the name ("Search  ⌘K"). Never the only place for something people need. */
  text: string
  /** Above by default. bottom near the top edge (a header, a toolbar at the top, a drawer's or window's head); left or right where
   *  there's no room. */
  side?: 'bottom' | 'left' | 'right'
  /** The element it's about; it gets data-pc-tooltip. On something that can't be used, aria-disabled="true", not disabled. */
  children: ReactElement<Record<string, unknown>>
}

/** A short hint on hover (after 360ms) and at once on keyboard focus, drawn by pecaiet.css from data-pc-tooltip. */
export function Tooltip({ text, side, children }: TooltipProps) {
  return cloneElement(children, { 'data-pc-tooltip': text, 'data-pc-tooltip-side': side })
}

/** Esc hides the tooltip under the pointer or on the focused element (data-pc-tooltip-hidden) until the pointer or focus leaves it.
 *  Call it once, in the app's layout: it covers every data-pc-tooltip on the page, Buttons' too. */
export function useTooltipEscape() {
  useEffect(() => {
    const hide = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      document
        .querySelectorAll('[data-pc-tooltip]:hover, [data-pc-tooltip]:focus-visible, [data-pc-tooltip]:has(:focus-visible)')
        .forEach(element => element.setAttribute('data-pc-tooltip-hidden', ''))
    }
    const back = (event: PointerEvent | FocusEvent) => {
      const element = event.target instanceof Element ? event.target.closest('[data-pc-tooltip-hidden]') : null
      const to = event.relatedTarget
      if (element && !(to instanceof Node && element.contains(to))) element.removeAttribute('data-pc-tooltip-hidden')
    }
    document.addEventListener('keydown', hide)
    document.addEventListener('pointerout', back)
    document.addEventListener('focusout', back)
    return () => {
      document.removeEventListener('keydown', hide)
      document.removeEventListener('pointerout', back)
      document.removeEventListener('focusout', back)
    }
  }, [])
}
