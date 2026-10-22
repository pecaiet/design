import { Link as InertiaLink } from '@inertiajs/react'
import { CaretRight } from '@phosphor-icons/react'
import { Fragment, type ComponentPropsWithRef, type ReactNode } from 'react'
import { cx } from './cx'

export type BreadcrumbsProps = Omit<ComponentPropsWithRef<'nav'>, 'children'> & {
  /** The pages above this one, the top one first. */
  parents: { label: ReactNode; href: string }[]
  /** The page you are on, last. */
  current: ReactNode
}

/** Above the page header, only on pages below another page (a user under Users), never on a top-level page. */
export function Breadcrumbs({ parents, current, className, ...nav }: BreadcrumbsProps) {
  return (
    <nav {...nav} className={cx('pc-breadcrumbs', className)} aria-label="Breadcrumb">
      {parents.map(({ label, href }) => (
        <Fragment key={href}>
          <InertiaLink href={href}>{label}</InertiaLink>
          <CaretRight />
        </Fragment>
      ))}
      <span aria-current="page">{current}</span>
    </nav>
  )
}
