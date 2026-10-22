import type { ComponentPropsWithRef } from 'react'
import { cx } from './cx'

export type VisuallyHiddenProps = ComponentPropsWithRef<'span'> & {
  /** Comes back into sight when it gets keyboard focus. */
  focusable?: boolean
}

/** Words for screen readers only, that the eye gets from the layout: the "tasks" after a count, the name of a column with no
 *  visible heading. An icon button names itself with aria-label instead. */
export function VisuallyHidden({ focusable, className, ...span }: VisuallyHiddenProps) {
  return <span {...span} className={cx(focusable ? 'pc-visually-hidden-focusable' : 'pc-visually-hidden', className)} />
}
