import { CaretUpDown } from '@phosphor-icons/react'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import { AppLogo, PeCaietMark } from './AppLogo'
import { Avatar } from './Avatar'
import { DropdownMenu } from './DropdownMenu'
import { usePhone } from './shell'
import { AccountItems, type Account } from './SidebarAccount'
import { SidebarItem } from './SidebarItem'

export type HeaderProps = Omit<ComponentPropsWithRef<'header'>, 'children'> & {
  /** On the left, where it sits on the sign-in page: pe caiet's logo unless you pass another AppLogo. */
  logo?: ReactNode
  /** Who is signed in, on the right: the account row with an up-down caret, as wide as its content. */
  account: Account
}

/** The bar across the top of a page without a sidebar (only pe caiet's root page): the logo, and the account row whose menu opens
 *  down from it, aligned to its right edge (a sheet on phones). 72px tall and 28px from the edges; on phones 52px and 20px, in the
 *  sidebar colour. */
export function Header({ logo, account, style, ...header }: HeaderProps) {
  const phone = usePhone()
  return (
    <header
      {...header}
      style={{
        // The account column is at most as wide as the row, and narrower when the email doesn't fit (it ends in an ellipsis).
        display: 'grid',
        gridTemplateColumns: 'auto minmax(0, max-content)',
        justifyContent: 'space-between',
        alignItems: 'center',
        columnGap: 'var(--pc-space-2-5)',
        ...(phone ? { height: '52px', padding: '0 20px', background: 'var(--sidebar)' } : { height: '72px', padding: '0 28px' }),
        ...style,
      }}
    >
      {logo ?? <AppLogo mark={<PeCaietMark />}>pe caiet</AppLogo>}
      <DropdownMenu
        align="end"
        trigger={
          <SidebarItem icon={<Avatar initials={account.email.charAt(0).toUpperCase()} />} iconAfter={<CaretUpDown />}>
            {account.email}
          </SidebarItem>
        }
      >
        <AccountItems {...account} />
      </DropdownMenu>
    </header>
  )
}
