import type { HTMLAttributes } from 'react'
import { cx } from './cx'

export type SkeletonProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  /** line: a line of text (make a paragraph's last one shorter). title: a title. circle: an avatar. control: a field or a
   *  button. Without one, size the block yourself (a badge, a picture). Widths come from the layout; keep the real layout around
   *  the blocks and give the area that's loading aria-busy="true". */
  shape?: 'line' | 'title' | 'circle' | 'control'
}

export function Skeleton({ shape, className, ...span }: SkeletonProps) {
  return <span {...span} className={cx('pc-skeleton', shape && `pc-skeleton-${shape}`, className)} aria-hidden="true" />
}
