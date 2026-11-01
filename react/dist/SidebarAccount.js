import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowLeftIcon, CaretDownIcon, GearIcon, ShieldIcon, SignOutIcon } from '@phosphor-icons/react';
import { Avatar } from './Avatar';
import { cx } from './cx';
import { DropdownMenu, MenuItem, MenuSeparator } from './DropdownMenu';
import { external } from './shell';
import { SidebarItem } from './SidebarItem';
/** The account menu's items, in the sidebar and in the Header: Settings, Admin panel, then Sign out in red. Nothing else. */
export function AccountItems({ settingsHref, signOutHref, adminHref, backHref }) {
    return (_jsxs(_Fragment, { children: [_jsx(MenuItem, { href: settingsHref, icon: _jsx(GearIcon, {}), children: "Settings" }), adminHref && _jsx(MenuItem, { href: adminHref, icon: _jsx(ShieldIcon, {}), children: "Admin panel" }), backHref && (external(backHref)
                ? _jsxs("a", { className: "pc-menu-item", role: "menuitem", tabIndex: -1, href: backHref, children: [_jsx(ArrowLeftIcon, {}), "Back to pe caiet"] })
                : _jsx(MenuItem, { href: backHref, icon: _jsx(ArrowLeftIcon, {}), children: "Back to pe caiet" })), _jsx(MenuSeparator, {}), _jsx(MenuItem, { href: signOutHref, method: "delete", as: "button", destructive: true, icon: _jsx(SignOutIcon, {}), children: "Sign out" })] }));
}
/** The account row, last in the sidebar's footer: the avatar, the email and a caret. Its menu rises from it, the sidebar's width (a
 *  sheet on phones), and closes on a click outside, Escape or a choice. */
export function SidebarAccount({ className, ...account }) {
    return (_jsx(DropdownMenu, { className: cx('pc-sidebar-account', className), menuClassName: "pc-sidebar-account-menu", trigger: _jsx(SidebarItem, { icon: _jsx(Avatar, { initials: account.email.charAt(0).toUpperCase() }), iconAfter: _jsx(CaretDownIcon, {}), children: account.email }), children: _jsx(AccountItems, { ...account }) }));
}
