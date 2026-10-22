import type { ComponentPropsWithRef } from 'react'
import { cx } from './cx'

export type LabelProps = ComponentPropsWithRef<'label'> & {
  /** Marks the few fields that don't have to be filled in; required ones have no mark. */
  optional?: boolean
}

export function Label({ optional, children, className, ...label }: LabelProps) {
  return (
    <label {...label} className={cx('pc-label', className)}>
      {children}
      {optional && <> <span className="pc-label-optional">(optional)</span></>}
    </label>
  )
}
