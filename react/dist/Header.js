import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CaretUpDown } from '@phosphor-icons/react';
import { AppLogo, PeCaietMark } from './AppLogo';
import { Avatar } from './Avatar';
import { DropdownMenu } from './DropdownMenu';
import { usePhone } from './shell';
import { AccountItems } from './SidebarAccount';
import { SidebarItem } from './SidebarItem';
/** The bar across the top of a page without a sidebar (only pe caiet's root page): the logo, and the account row whose menu opens
 *  down from it, aligned to its right edge (a sheet on phones). 72px tall and 28px from the edges; on phones 52px and 20px, in the
 *  sidebar colour. */
export function Header({ logo, account, style, ...header }) {
    const phone = usePhone();
    return (_jsxs("header", { ...header, style: {
            // The account column is at most as wide as the row, and narrower when the email doesn't fit (it ends in an ellipsis).
            display: 'grid',
            gridTemplateColumns: 'auto minmax(0, max-content)',
            justifyContent: 'space-between',
            alignItems: 'center',
            columnGap: 'var(--pc-space-2-5)',
            ...(phone ? { height: '52px', padding: '0 20px', background: 'var(--sidebar)' } : { height: '72px', padding: '0 28px' }),
            ...style,
        }, children: [logo ?? _jsx(AppLogo, { mark: _jsx(PeCaietMark, {}), children: "pe caiet" }), _jsx(DropdownMenu, { align: "end", trigger: _jsx(SidebarItem, { icon: _jsx(Avatar, { initials: account.email.charAt(0).toUpperCase() }), iconAfter: _jsx(CaretUpDown, {}), children: account.email }), children: _jsx(AccountItems, { ...account }) })] }));
}
