import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cx } from './cx'

export type EmptyStateProps = Omit<ComponentPropsWithRef<'div'>, 'title' | 'children'> & {
  /** What isn't there: "No failed jobs", "No tasks yet", "No tasks match “zzz”". No icon and no button: the page's own action
   *  stays where it always is. */
  title: ReactNode
  /** One line: what will show up here, or why nothing does. */
  description?: ReactNode
}

export function EmptyState({ title, description, className, ...div }: EmptyStateProps) {
  return (
    <div {...div} className={cx('pc-empty', className)}>
      <p className="pc-empty-title">{title}</p>
      {description && <p className="pc-empty-description">{description}</p>}
    </div>
  )
}
