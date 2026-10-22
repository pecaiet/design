import { Fragment, type ComponentPropsWithRef, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from './cx'

export type ListProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /** A few short points in running text. Anything people act on is rows instead: tasks, menu items, files, a Table. */
  items: ReactNode[]
  /** Numbers instead of bullets, only when the order matters (steps). */
  numbered?: boolean
}

export function List({ items, numbered, className, ...list }: ListProps) {
  const Tag = numbered ? 'ol' : 'ul'
  return (
    <Tag {...list} className={cx('pc-list', className)}>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </Tag>
  )
}

export type DetailsProps = Omit<ComponentPropsWithRef<'dl'>, 'children'> & {
  /** Labels and values describing one thing (a client, a user, a job). A value can hold Code, a Badge or a small button; an
   *  empty one says "Not set" rather than staying blank. */
  items: { label: ReactNode; value?: ReactNode }[]
}

export function Details({ items, className, ...dl }: DetailsProps) {
  return (
    <dl {...dl} className={cx('pc-details', className)}>
      {items.map(({ label, value }, i) => (
        <Fragment key={i}>
          <dt>{label}</dt>
          <dd>{value || value === 0 ? value : <span className="pc-muted">Not set</span>}</dd>
        </Fragment>
      ))}
    </dl>
  )
}
