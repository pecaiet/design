import type { ComponentPropsWithRef } from 'react'
import { cx } from './cx'

export type BadgeProps = ComponentPropsWithRef<'span'> & {
  /** neutral by default. primary: the one status that matters (Admin). soft: a quiet label. outline: plain facts (User, Public).
   *  warning: needs attention soon (Expires soon). destructive: Failed. */
  variant?: 'primary' | 'soft' | 'outline' | 'warning' | 'destructive'
  /** 16px tall with 10px words, for tight spots such as on an avatar. */
  small?: boolean
}

export function Badge({ variant, small, className, ...span }: BadgeProps) {
  return <span {...span} className={cx('pc-badge', variant && `pc-badge-${variant}`, small && 'pc-badge-small', className)} />
}
