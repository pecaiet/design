import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { Fragment, type ComponentPropsWithRef, type HTMLAttributes, type ReactNode } from 'react'
import { Button } from './Button'
import { cx } from './cx'

export type PaginationProps = Omit<ComponentPropsWithRef<'nav'>, 'children'> & {
  /** The page you're on, from 1. */
  page: number
  pages: number
  /** Each page's address, so every page has one: page => `/users?page=${page}`. */
  href: (page: number) => string
} & (
  /** Previous, the page numbers and Next. arrows: Previous and Next as arrows alone, where room is short. numbers={false}:
   *  only the two ends, when the page number doesn't matter (a log, search results; in a PaginationBar). */
  | { compact?: false; arrows?: boolean; numbers?: boolean }
  /** For a narrow card, and below 48rem: "Page 5 of 20" between two arrows. */
  | { compact: true; arrows?: never; numbers?: never }
)

/** Moving through pages: the first and last pages and the ones either side of the one you're on (seven or fewer: all of them),
 *  "…" for the rest. An end that goes nowhere is turned off. */
export function Pagination({ page, pages, href, compact, arrows, numbers = true, className, ...nav }: PaginationProps) {
  const shown = pages <= 7
    ? Array.from({ length: pages }, (_, i) => i + 1)
    : [1, page - 1, page, page + 1, pages].filter((n, i, all) => n >= 1 && n <= pages && all.indexOf(n) === i)

  const end = (next: boolean) => {
    const to = next ? page + 1 : page - 1
    const icon = next ? <CaretRight /> : <CaretLeft />
    const words = next ? 'Next' : 'Previous'
    const off = to < 1 || to > pages
    if (compact || arrows) {
      const label = `${words} page`
      if (off) return <a className="pc-btn pc-btn-ghost pc-btn-icon" aria-disabled="true" aria-label={label} data-pc-tooltip={label}>{icon}</a>
      return <Button variant="ghost" href={href(to)} icon={icon} label={label} />
    }
    if (off) return <a className="pc-btn pc-btn-ghost" aria-disabled="true">{next ? <>{words}{icon}</> : <>{icon}{words}</>}</a>
    return next
      ? <Button variant="ghost" href={href(to)} iconAfter={icon}>{words}</Button>
      : <Button variant="ghost" href={href(to)} icon={icon}>{words}</Button>
  }
  return (
    <nav aria-label="Pages" {...nav} className={cx('pc-pagination', className)}>
      {end(false)}
      {compact ? (
        <span className="pc-pagination-where">Page {page} of {pages}</span>
      ) : numbers && shown.map((n, i) => (
        <Fragment key={n}>
          {i > 0 && n - shown[i - 1] > 1 && <span className="pc-pagination-gap" aria-hidden="true">…</span>}
          <Button variant="ghost" href={href(n)} className="pc-btn-icon pc-pagination-page" aria-current={n === page ? 'page' : undefined}>
            {n}
          </Button>
        </Fragment>
      ))}
      {end(true)}
    </nav>
  )
}

export type PaginationBarProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & {
  /** Where you are, first: "81–100 of 394". */
  count: ReactNode
  /** Rows per page, before the count, for a big table: the Select's button. */
  size?: ReactNode
  /** The Pagination, at the end. */
  children: ReactNode
}

/** A count and the pages, as under a table in the card's footer. */
export function PaginationBar({ count, size, children, className, ...div }: PaginationBarProps) {
  return (
    <div {...div} className={cx('pc-pagination-bar', className)}>
      {size && <span className="pc-pagination-size">Rows per page{size}</span>}
      <span className="pc-pagination-count">{count}</span>
      {children}
    </div>
  )
}

export type PaginationMoreProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onClick'> & {
  /** The button's words: "Show 20 more". */
  children: ReactNode
  /** How many are shown: "40 of 134". */
  count: ReactNode
  /** Adds the next rows to the ones already shown. */
  onClick: () => void
  /** While the next rows load. */
  busy?: boolean
}

/** Show more instead of pages. */
export function PaginationMore({ children, count, onClick, busy, className, ...div }: PaginationMoreProps) {
  return (
    <div {...div} className={cx('pc-pagination-more', className)}>
      <Button variant="outline" busy={busy} onClick={onClick}>{children}</Button>
      <span className="pc-pagination-count">{count}</span>
    </div>
  )
}
