import type { ComponentPropsWithRef, ReactNode } from 'react'
import { Breadcrumbs, type BreadcrumbsProps } from './Breadcrumbs'
import { cx } from './cx'
import { SidebarToggle } from './Navigation'

export type PageHeaderProps = Omit<ComponentPropsWithRef<'div'>, 'title' | 'children'> & {
  /** The page's title, its h1. */
  title: ReactNode
  /** An optional line about the page, muted, lined up with the title (not the toggle). */
  description?: ReactNode
  /** On the right: at most one primary button, or the ⋯ menu of the thing the page is about. When it doesn't fit beside the title
   *  it moves under it. */
  actions?: ReactNode
  /** Only on a page below another page (a user under Users): the trail above, lined up with the title. */
  breadcrumbs?: Pick<BreadcrumbsProps, 'parents' | 'current'>
}

/** The top of a page: the sidebar toggle (inside a Navigation), the title, an optional line, and the page's action on the right. */
export function PageHeader({ title, description, actions, breadcrumbs, className, ...div }: PageHeaderProps) {
  const header = (
    <div {...div} className={cx('pc-page-header', className)}>
      <div className="pc-page-header-text">
        <div className="pc-page-title-row">
          <SidebarToggle />
          <h1 className="pc-page-title">{title}</h1>
        </div>
        {description && <p className="pc-page-description">{description}</p>}
      </div>
      {actions && <div className="pc-page-header-actions">{actions}</div>}
    </div>
  )
  if (!breadcrumbs) return header
  return (
    <>
      {/* The space under the trail is the app's to add (6px in idp); it has to stay the header's sibling to line up. */}
      <Breadcrumbs {...breadcrumbs} style={{ marginBottom: 'var(--pc-space-1-5)' }} />
      {header}
    </>
  )
}
