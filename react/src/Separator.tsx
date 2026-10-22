import type { ReactNode } from 'react'
import { cx } from './cx'

export type SeparatorProps = { className?: string } & (
  /** Between sections. bleed runs it to a card's or panel's edges. */
  | { bleed?: boolean; vertical?: never; children?: never }
  /** Between items in a row (a date, a count), 16px tall. */
  | { vertical: true; bleed?: never; children?: never }
  /** A word in the middle: "or" between two ways to sign in. */
  | { children: ReactNode; bleed?: never; vertical?: never }
)

export function Separator({ bleed, vertical, children, className }: SeparatorProps) {
  if (children) return <div className={cx('pc-separator-text', className)} role="separator">{children}</div>
  if (vertical) return <span className={cx('pc-separator', 'pc-separator-vertical', className)} aria-hidden="true" />
  return <hr className={cx('pc-separator', bleed && 'pc-separator-bleed', className)} />
}
