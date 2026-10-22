import type { ComponentPropsWithRef } from 'react'
import { cx } from './cx'

export type ButtonGroupProps = ComponentPropsWithRef<'div'>

/** Buttons side by side, 8px apart, each its own shape, wrapping when there's no room: page and dialog actions. At most one
 *  primary; a delete goes last. */
export function ButtonGroup({ className, ...div }: ButtonGroupProps) {
  return <div {...div} className={cx('pc-btn-group', className)} />
}

export type ToolbarProps = ComponentPropsWithRef<'div'>

/** Tools on a list or an editor (search, sort, view, more): ghost buttons, usually icon only, in a quiet tray. A tool that stays
 *  on is pressed. Choosing one of a few options is a SegmentedControl. */
export function Toolbar({ className, ...div }: ToolbarProps) {
  return <div {...div} className={cx('pc-toolbar', className)} />
}

/** Between groups of tools in a Toolbar. */
export function ToolbarDivider({ className }: { className?: string }) {
  return <span className={cx('pc-toolbar-divider', className)} />
}
