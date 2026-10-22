import { Link as InertiaLink } from '@inertiajs/react'
import type { ComponentPropsWithoutRef, ComponentPropsWithRef, ReactNode } from 'react'
import { cx } from './cx'

export type CardProps = Omit<ComponentPropsWithRef<'div'>, 'title'> & {
  title?: ReactNode
  /** A line under the title. */
  description?: ReactNode
  /** On the right of the header, centred on the title's line: a small button, a ⋯ menu or a switch. */
  action?: ReactNode
  /** The title's heading level, the page's own: h2 under the page's h1 by default. */
  titleAs?: 'h2' | 'h3' | 'h4'
  /** Makes the whole card a link to this page (through its title). The action stays clickable on its own. */
  href?: string
  /** An image on top, edge to edge (5:2, cropped to fit). */
  media?: ComponentPropsWithoutRef<'img'>
  /** The content is a table or rows: they run to 4px from the card's edge. */
  rows?: boolean
  /** Cancel and the action, on the right under a line. */
  footer?: ReactNode
  /** A muted note on the footer's left ("Changed 3 days ago"). */
  footerNote?: ReactNode
}

export function Card({ title, description, action, titleAs: Title = 'h2', href, media, rows, footer, footerNote, children, className, ...div }: CardProps) {
  return (
    <div {...div} className={cx('pc-card', className)}>
      {media && <img alt="" {...media} className="pc-card-media" />}
      {(title || description || action) && (
        <div className="pc-card-header">
          {title && (
            <Title className="pc-card-title">
              {href ? <InertiaLink className="pc-card-link" href={href}>{title}</InertiaLink> : title}
            </Title>
          )}
          {description && <p className="pc-card-description">{description}</p>}
          {action && <div className="pc-card-action">{action}</div>}
        </div>
      )}
      {children && <div className={cx('pc-card-content', rows && 'pc-card-rows')}>{children}</div>}
      {(footer || footerNote) && (
        <div className="pc-card-footer">
          {footerNote && <span className="pc-card-footer-note">{footerNote}</span>}
          {footer}
        </div>
      )}
    </div>
  )
}
