import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cx } from './cx'

export type HeadingProps = ComponentPropsWithRef<'h2'> & (
  /** The page's title, an h1: one per page (each Settings section's title is one too). */
  | { page: true; as?: never; description?: never }
  /** A section on a page that isn't in a card, as big as a card's title. as: its level, in order (h2 by default); the look stays. */
  | { page?: false; as?: 'h2' | 'h3' | 'h4'; description?: ReactNode }
)

export function Heading({ page, as: Tag = 'h2', description, className, ...heading }: HeadingProps) {
  if (page) return <h1 {...heading} className={cx('pc-page-title', className)} />
  if (!description) return <Tag {...heading} className={cx('pc-section-title', className)} />
  return (
    // pecaiet.css has no class for a section's title and its line together: the 2px between them, as in a card's header.
    <div className={className} style={{ display: 'grid', gap: 'var(--pc-space-0-5)' }}>
      <Tag {...heading} className="pc-section-title" />
      <p className="pc-section-description">{description}</p>
    </div>
  )
}
