import { CaretDownIcon } from '@phosphor-icons/react'
import { createContext, useContext, useEffect, useId, useRef, useState, type ComponentPropsWithRef, type ReactNode } from 'react'
import { cx } from './cx'
import { assign } from './popup'

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
  /** Open at first. Passed with onOpenChange it follows the app, and a change from the app grows or shrinks it, like a press. */
  open?: boolean
  /** It opened or closed (the toggle event, after pecaiet.js has played it). */
  onOpenChange?: (open: boolean) => void
  /** Coming later: half strength, and it doesn't open. */
  disabled?: boolean
}

export function AccordionItem({ summary, children, open, onOpenChange, disabled, className, ref, ...details }: AccordionItemProps) {
  const name = useContext(Name)
  // React sets open only at first; a later change from the app plays as a press on the question, so pecaiet.js grows or shrinks it.
  const [first] = useState(open)
  const own = useRef<HTMLDetailsElement>(null)
  useEffect(() => {
    if (open !== undefined && own.current && own.current.open !== open) own.current.querySelector('summary')?.click()
  }, [open])
  return (
    <details
      name={name}
      {...details}
      ref={node => {
        own.current = node
        assign(ref, node)
      }}
      className={cx('pc-accordion-item', className)}
      open={first}
      aria-disabled={disabled || undefined}
      onToggle={event => onOpenChange?.(event.currentTarget.open)}
    >
      <summary tabIndex={disabled ? -1 : undefined} onClick={disabled ? event => event.preventDefault() : undefined}>
        {summary}
        <CaretDownIcon />
      </summary>
      {!disabled && <div className="pc-accordion-content">{children}</div>}
    </details>
  )
}
