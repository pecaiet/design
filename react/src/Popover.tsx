import { X } from '@phosphor-icons/react'
import { useEffect, useId, useRef, type ReactElement, type ReactNode } from 'react'
import { Button } from './Button'
import { cx } from './cx'
import { useOpen, useOutside, withTrigger, type TriggerProps } from './popup'

const FOCUSABLE = 'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'

type Name =
  /** In its head, as a .pc-dialog-title: the popover is labelled by it, and on phones its x sits beside it. */
  | { title: ReactNode; label?: never }
  /** No title: its name for screen readers. */
  | { title?: never; label: string }

export type PopoverProps = Name & {
  /** The button that opens it, on click: it gets aria-haspopup="dialog", aria-expanded (it keeps its hover fill while open) and the
   *  click; its own ref and handlers stay. */
  trigger: ReactElement<TriggerProps>
  /** The title's heading level, under the page's own: h3 by default. */
  titleAs?: 'h2' | 'h3' | 'h4'
  /** Muted words under the title. */
  text?: ReactNode
  /** A link, a field, a Datepicker. */
  children?: ReactNode
  /** Cancel, then the action, under a line. Their clicks are yours: control open to close it from them. */
  actions?: ReactNode
  /** Lined up with the button's end instead of its start. */
  align?: 'start' | 'end'
  /** Opens above the button, where there's no room below. */
  up?: boolean
  /** Leave both out and it opens and closes by itself. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** On the anchor around the button and the popover. */
  className?: string
}

/** A panel that opens from a button and can hold a link, a field or buttons; anything you can click goes here, not in a Tooltip.
 *  4px under the button, at most 320px wide; a sheet from the bottom over the dimmed page on phones. Opening moves focus to the
 *  first thing in it; Esc, a click outside or Tab out close it, and focus goes back to the button. */
export function Popover({ trigger, title, label, titleAs: Title = 'h3', text, children, actions, align, up, open: shown, onOpenChange, className }: PopoverProps) {
  const [open, setOpen] = useOpen(shown, onOpenChange)
  const panel = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLElement>(null)
  const id = useId()

  const close = () => {
    setOpen(false)
    button.current?.focus()
  }
  useOutside(open, panel, button, () => setOpen(false))

  useEffect(() => {
    if (!open) return
    // The x only shows on phones: the first thing that can take focus and is drawn.
    const first = [...(panel.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])].find(element => element.checkVisibility())
    first?.focus()
  }, [open])

  return (
    <div
      className={cx('pc-popover-anchor', className)}
      onKeyDown={event => {
        if (event.key !== 'Escape' || !open) return
        // Prevented, so a dialog around it stays open.
        event.preventDefault()
        event.stopPropagation()
        close()
      }}
    >
      {withTrigger(trigger, {
        ref: button,
        'aria-haspopup': 'dialog',
        'aria-expanded': open,
        'aria-controls': `${id}-popover`,
        onClick: () => setOpen(!open),
      })}
      <div className="pc-popover-backdrop" />
      <div
        ref={panel}
        id={`${id}-popover`}
        className={cx('pc-popover', align === 'end' && 'pc-popover-end', up && 'pc-popover-up')}
        role="dialog"
        aria-labelledby={title ? `${id}-title` : undefined}
        aria-label={label}
        hidden={!open}
      >
        {title && (
          <div className="pc-popover-head">
            <Title className="pc-dialog-title" id={`${id}-title`}>{title}</Title>
            <Button variant="ghost" icon={<X />} label="Close" className="pc-popover-close" onClick={close} />
          </div>
        )}
        {text && <p className="pc-popover-text">{text}</p>}
        {children}
        {actions && <div className="pc-dialog-actions">{actions}</div>}
      </div>
    </div>
  )
}
