import type { ComponentPropsWithRef, CSSProperties, ReactNode } from 'react'
import { cx } from './cx'

export type LabelProps = ComponentPropsWithRef<'label'> & {
  /** Marks the few fields that don't have to be filled in; required ones have no mark. */
  optional?: boolean
  /** A link about the field at the right end of the label's row, in 12px: <Link href="/password/new">Forgot password?</Link>. */
  action?: ReactNode
}

// No class in pecaiet.css yet for the label's row with a link at its end.
const ROW: CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--pc-space-2)' }
const SMALL: CSSProperties = { fontSize: 'var(--pc-text-12)', lineHeight: 'var(--pc-line-16)' }

export function Label({ optional, action, children, className, ...label }: LabelProps) {
  const own = (
    <label {...label} className={cx('pc-label', className)}>
      {children}
      {optional && <> <span className="pc-label-optional">(optional)</span></>}
    </label>
  )
  if (!action) return own
  return (
    <div style={ROW}>
      {own}
      <span style={SMALL}>{action}</span>
    </div>
  )
}
