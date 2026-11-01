import { Link as InertiaLink, type InertiaLinkProps } from '@inertiajs/react'
import { useId, type ComponentPropsWithRef, type ReactNode } from 'react'
import { Kbd } from './Code'
import { cx } from './cx'

type Lead =
  /** 16px, before the label (an Avatar or an app's .pc-app-logo-mark also goes here). */
  | { icon?: ReactNode; mark?: never }
  /** A letter tile instead of an icon ("W"). */
  | { mark: string; icon?: never }

type Detail =
  /** On the right: a number or a word (where it belongs: "Work"). */
  | { detail?: ReactNode; alert?: never; shortcut?: never; iconAfter?: never }
  /** A number that needs attention: red and bold. */
  | { detail: number; alert: true; shortcut?: never; iconAfter?: never }
  /** A key that does the same ("/"). */
  | { shortcut: string; detail?: never; alert?: never; iconAfter?: never }
  /** An icon at the end: the caret of a row that opens a menu. */
  | { iconAfter: ReactNode; detail?: never; alert?: never; shortcut?: never }

type Tag =
  /** Opens a page of the app (an Inertia link). current: the page you are on, the flat pill; the app knows which one it is. */
  | (Omit<InertiaLinkProps, 'children'> & { href: string; current?: boolean })
  /** Does something (Search, New list). Buttons are never the page you're on. */
  | (Omit<ComponentPropsWithRef<'button'>, 'children'> & { href?: never; current?: never })

export type SidebarItemProps = Lead & Detail & Tag & {
  /** The label, in the text colour; a long one is cut with an ellipsis and the detail stays. */
  children: ReactNode
}

/** One row of the sidebar: a link when it opens a page, a button when it does something. */
export function SidebarItem({ icon, mark, detail, alert, shortcut, iconAfter, children, className, ...element }: SidebarItemProps) {
  const look = cx('pc-sidebar-item', className)
  const inner = (
    <>
      {mark ? <span className="pc-sidebar-mark">{mark}</span> : icon}
      <span className="pc-sidebar-label">{children}</span>
      {detail != null && <span className={cx('pc-sidebar-detail', alert && 'pc-sidebar-detail-alert')}>{detail}</span>}
      {shortcut && <Kbd>{shortcut}</Kbd>}
      {iconAfter}
    </>
  )

  if (element.href !== undefined) {
    const { current, ...link } = element
    return <InertiaLink {...link} className={look} aria-current={current ? 'page' : undefined}>{inner}</InertiaLink>
  }
  const { current, href, type = 'button', ...button } = element
  return <button {...button} type={type} className={look}>{inner}</button>
}

type Kind =
  /** A folder (the default): the heading row-sized and bold, with an optional icon or letter tile; its rows a step to the right. */
  | (Lead & { kind?: 'folder' })
  /** A group: a small grey label naming a set of pages ("Account"); its rows in line with the rows above. No icon. */
  | { kind: 'group'; icon?: never; mark?: never }

export type SidebarSectionProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & Kind & {
  /** Names the rows under it. Not clickable. */
  heading: ReactNode
  /** Its rows (SidebarItems). */
  children: ReactNode
}

/** A heading with rows under it: a folder (a space and its lists) or a group (a set of pages). */
export function SidebarSection({ heading, kind, icon, mark, children, className, ...div }: SidebarSectionProps) {
  const id = useId()
  return (
    <div role="group" aria-labelledby={id} {...div} className={cx('pc-sidebar-section', kind === 'group' && 'pc-sidebar-group', className)}>
      <div className="pc-sidebar-item pc-sidebar-heading">
        {mark ? <span className="pc-sidebar-mark">{mark}</span> : icon}
        <span className="pc-sidebar-label" id={id}>{heading}</span>
      </div>
      <div className="pc-sidebar-sub">{children}</div>
    </div>
  )
}
