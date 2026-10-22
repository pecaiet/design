import { Link as InertiaLink, type InertiaLinkProps } from '@inertiajs/react'
import { ArrowSquareOut } from '@phosphor-icons/react'
import { cloneElement, isValidElement, type ComponentPropsWithRef, type ReactElement, type ReactNode } from 'react'
import { cx } from './cx'

type Look = {
  children: ReactNode
  /** Stands alone in a muted place (a footer, breadcrumbs): muted, no underline until the pointer is on it. */
  quiet?: boolean
  /** A 16px icon before the words (a file, a download). */
  icon?: ReactElement<{ className?: string }>
  /** After the words: CaretRight for "View all" on its own line. */
  iconAfter?: ReactNode
}

type Tag =
  /** A page of the app: an Inertia link. */
  | (Omit<InertiaLinkProps, 'children'> & { href: string; external?: false })
  /** Another site: opens in a new tab, with an arrow, and says so to screen readers. */
  | (Omit<ComponentPropsWithRef<'a'>, 'children'> & { href: string; external: true })
  /** Does something here instead of going somewhere ("Send it again"): a button with the same look. */
  | (Omit<ComponentPropsWithRef<'button'>, 'children'> & { href?: never; external?: never })

export type LinkProps = Look & Tag

export function Link({ quiet, icon, iconAfter, children, className, ...element }: LinkProps) {
  const look = cx(quiet ? 'pc-link-quiet' : 'pc-link', className)
  const lead = isValidElement(icon) ? cloneElement(icon, { className: cx('pc-link-lead', icon.props.className) }) : icon

  if (element.external) {
    const { external, ...link } = element
    return (
      <a {...link} className={look} target="_blank" rel="noopener">
        {lead}
        {children}
        {iconAfter ?? <ArrowSquareOut />}
        <span className="pc-visually-hidden"> (opens in a new tab)</span>
      </a>
    )
  }
  if (element.href !== undefined) {
    const { external, ...link } = element
    return <InertiaLink {...link} className={look}>{lead}{children}{iconAfter}</InertiaLink>
  }
  const { external, type = 'button', ...button } = element
  return <button {...button} type={type} className={look}>{lead}{children}{iconAfter}</button>
}
