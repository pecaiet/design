import { CaretDown } from '@phosphor-icons/react'
import { createContext, useContext, useId, type ComponentPropsWithRef, type ReactNode } from 'react'
import { cx } from './cx'

const Name = createContext<string | undefined>(undefined)

export type AccordionProps = ComponentPropsWithRef<'div'> & {
  /** One open at a time: opening one closes the others (the items share a name). Several can be open by default. */
  single?: boolean
}

/** Questions or sections that open to show more, one under another: FAQs and optional detail, never something needed to finish a
 *  task. The browser opens and closes them (Enter and Space too); with pecaiet.js the answer grows open and the rest glide. */
export function Accordion({ single, className, ...div }: AccordionProps) {
  const name = useId()
  return (
    <Name value={single ? name : undefined}>
      <div {...div} className={cx('pc-accordion', className)} />
    </Name>
  )
}

export type AccordionItemProps = Omit<ComponentPropsWithRef<'details'>, 'children' | 'open' | 'onToggle'> & {
  /** The question. */
  summary: ReactNode
  /** The answer. */
  children?: ReactNode
  /** Open at first. Passed with onOpenChange it follows the app; it changes only when its value does, so the motion isn't cut short. */
  open?: boolean
  /** It opened or closed (the toggle event, after pecaiet.js has played it). */
  onOpenChange?: (open: boolean) => void
  /** Coming later: half strength, and it doesn't open. */
  disabled?: boolean
}

export function AccordionItem({ summary, children, open, onOpenChange, disabled, className, ...details }: AccordionItemProps) {
  const name = useContext(Name)
  return (
    <details
      name={name}
      {...details}
      className={cx('pc-accordion-item', className)}
      open={open}
      aria-disabled={disabled || undefined}
      onToggle={event => onOpenChange?.(event.currentTarget.open)}
    >
      <summary tabIndex={disabled ? -1 : undefined} onClick={disabled ? event => event.preventDefault() : undefined}>
        {summary}
        <CaretDown />
      </summary>
      {!disabled && <div className="pc-accordion-content">{children}</div>}
    </details>
  )
}
