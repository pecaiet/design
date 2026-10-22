import { CheckCircle, Warning, WarningCircle, X } from '@phosphor-icons/react'
import { useEffect, useRef, type HTMLAttributes, type MouseEvent, type ReactNode, type Ref } from 'react'
import { Button } from './Button'
import { cx } from './cx'
import { enter as grow, leave } from './motion'

const ICONS = { notice: <CheckCircle />, warning: <Warning />, error: <WarningCircle /> }

export type AlertProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  /** notice: something worked, or what happens next. warning: needs attention soon, nothing is wrong yet. error: something went wrong. */
  kind: 'notice' | 'warning' | 'error'
  /** Replaces the kind's icon with one that says more (Info, Archive). An alert always has one. */
  icon?: ReactNode
  /** A title in the kind's colour, the words (children) under it in the text colour. */
  title?: ReactNode
  /** A form's errors: children is the lead line ("Fix these 2 fields…"), these are listed under it. */
  items?: ReactNode[]
  /** An outline button at the end (Unarchive). */
  action?: { label: ReactNode; onClick?: () => void; href?: string }
  /** Shows the x. Called once the alert has shrunk out; then drop it from state. */
  onDismiss?: () => void
  /** Across the top of a page: no corners, edge to edge, one line. */
  banner?: boolean
  /** Something the person just caused: it grows in when it appears. Leave it off for what was already on the page. */
  enter?: boolean
}

export function Alert({ kind, icon, title, items, action, onDismiss, banner, enter, children, className, ...element }: AlertProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (enter) grow(ref.current)
  }, [])

  const dismiss = async (event: MouseEvent) => {
    // Handled here, so pecaiet.js doesn't remove an element React still owns.
    event.preventDefault()
    await leave(ref.current)
    onDismiss?.()
  }

  const attributes = {
    ...element,
    className: cx('pc-alert', `pc-alert-${kind}`, banner && 'pc-alert-banner', className),
    role: kind === 'error' ? 'alert' : 'status',
  }
  const end = (
    <>
      {action && (action.href
        ? <Button variant="outline" className="pc-alert-action" href={action.href}>{action.label}</Button>
        : <Button variant="outline" className="pc-alert-action" onClick={action.onClick}>{action.label}</Button>)}
      {onDismiss && <Button variant="ghost" icon={<X />} label="Dismiss" className="pc-alert-close" onClick={dismiss} />}
    </>
  )

  if (!title && !items && !action && !onDismiss) {
    return (
      <p {...attributes} ref={ref as Ref<HTMLParagraphElement>}>
        {icon ?? ICONS[kind]}
        <span>{children}</span>
      </p>
    )
  }
  const oneLine = !title && !items
  return (
    <div {...attributes} ref={ref as Ref<HTMLDivElement>}>
      {icon ?? ICONS[kind]}
      {oneLine ? (
        <span>{children}</span>
      ) : (
        <div className="pc-alert-body">
          {title && <p className="pc-alert-title">{title}</p>}
          {children && <p>{children}</p>}
          {items && <ul>{items.map((item, i) => <li key={i}>{item}</li>)}</ul>}
        </div>
      )}
      {end}
    </div>
  )
}
