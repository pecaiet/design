import { ArrowLeft, CaretDown, Gear, Shield, SignOut } from '@phosphor-icons/react'
import { Avatar } from './Avatar'
import { cx } from './cx'
import { DropdownMenu, MenuItem, MenuSeparator } from './DropdownMenu'
import { external } from './shell'
import { SidebarItem } from './SidebarItem'

export type Account = {
  /** Who is signed in. People have an email, not a name: it's the row's label, and its first letter the avatar. */
  email: string
  /** Settings: the settings window's first section (/settings/account), opened over the page you are on. */
  settingsHref: string
  /** Sign out, last and in red: an Inertia DELETE to this address (/session). */
  signOutHref: string
} & (
  /** Admins only: "Admin panel". Leave it out for everyone else. */
  | { adminHref?: string; backHref?: never }
  /** Inside the admin panel, in its place: "Back to pe caiet", to pe caiet's home page. */
  | { backHref: string; adminHref?: never }
)

/** The account menu's items, in the sidebar and in the Header: Settings, Admin panel, then Sign out in red. Nothing else. */
export function AccountItems({ settingsHref, signOutHref, adminHref, backHref }: Account) {
  return (
    <>
      <MenuItem href={settingsHref} icon={<Gear />}>Settings</MenuItem>
      {adminHref && <MenuItem href={adminHref} icon={<Shield />}>Admin panel</MenuItem>}
      {backHref && (external(backHref)
        ? <a className="pc-menu-item" role="menuitem" tabIndex={-1} href={backHref}><ArrowLeft />Back to pe caiet</a>
        : <MenuItem href={backHref} icon={<ArrowLeft />}>Back to pe caiet</MenuItem>)}
      <MenuSeparator />
      <MenuItem href={signOutHref} method="delete" as="button" destructive icon={<SignOut />}>Sign out</MenuItem>
    </>
  )
}

export type SidebarAccountProps = Account & {
  /** On the wrapper around the row and its menu. */
  className?: string
}

/** The account row, last in the sidebar's footer: the avatar, the email and a caret. Its menu rises from it, the sidebar's width (a
 *  sheet on phones), and closes on a click outside, Escape or a choice. */
export function SidebarAccount({ className, ...account }: SidebarAccountProps) {
  return (
    <DropdownMenu
      className={cx('pc-sidebar-account', className)}
      menuClassName="pc-sidebar-account-menu"
      trigger={
        <SidebarItem icon={<Avatar initials={account.email.charAt(0).toUpperCase()} />} iconAfter={<CaretDown />}>
          {account.email}
        </SidebarItem>
      }
    >
      <AccountItems {...account} />
    </DropdownMenu>
  )
}
