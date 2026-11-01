import { ArrowLeftIcon, CaretDownIcon, GearIcon, ShieldIcon, SignOutIcon } from '@phosphor-icons/react'
import { Avatar } from './Avatar'
import { cx } from './cx'
import { DropdownMenu, MenuItem, MenuSeparator } from './DropdownMenu'
import { external } from './shell'
import { SidebarItem } from './SidebarItem'

export type Account = {
  /** Who is signed in. People have an email, not a name: it's the row's label, and its first letter the avatar. */
  email: string
  /** Settings: the settings window's first section (/settings/account), opened over the page you are on. Leave it out for no Settings. */
  settingsHref?: string
  /** Sign out, last and in red: an Inertia DELETE to this address (/session). */
  signOutHref: string
} & (
  /** Admins only: "Admin panel". Leave it out for everyone else. */
  | { adminHref?: string; backHref?: never }
  /** Inside the admin panel, in its place: "Back to pe caiet", to pe caiet's home page. */
  | { backHref: string; adminHref?: never }
)

/** The account menu's items, in the sidebar and in the Header: Settings, Admin panel, then Sign out in red. Nothing else; the line
 *  above Sign out only when something is above it. */
export function AccountItems({ settingsHref, signOutHref, adminHref, backHref }: Account) {
  return (
    <>
      {settingsHref && <MenuItem href={settingsHref} icon={<GearIcon />}>Settings</MenuItem>}
      {adminHref && <MenuItem href={adminHref} icon={<ShieldIcon />}>Admin panel</MenuItem>}
      {backHref && (external(backHref)
        ? <a className="pc-menu-item" role="menuitem" tabIndex={-1} href={backHref}><ArrowLeftIcon />Back to pe caiet</a>
        : <MenuItem href={backHref} icon={<ArrowLeftIcon />}>Back to pe caiet</MenuItem>)}
      {(settingsHref || adminHref || backHref) && <MenuSeparator />}
      <MenuItem href={signOutHref} method="delete" as="button" destructive icon={<SignOutIcon />}>Sign out</MenuItem>
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
        <SidebarItem icon={<Avatar initials={account.email.charAt(0).toUpperCase()} />} iconAfter={<CaretDownIcon />}>
          {account.email}
        </SidebarItem>
      }
    >
      <AccountItems {...account} />
    </DropdownMenu>
  )
}
