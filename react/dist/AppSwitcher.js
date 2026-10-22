import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CaretUpDown, SquaresFour } from '@phosphor-icons/react';
import { cx } from './cx';
import { DropdownMenu, MenuLabel, MenuSeparator } from './DropdownMenu';
import { SidebarItem } from './SidebarItem';
/** The sidebar's head: the current app's mark and name, opening the menu of apps below it, as wide as the head (a sheet on phones). */
export function AppSwitcher({ apps, home, current, className }) {
    const here = [...apps, home].find(app => app.name === current) ?? home;
    const row = (app, end) => (_jsxs("a", { className: "pc-menu-item", role: "menuitem", tabIndex: -1, href: app.href, "aria-current": app.name === current ? 'page' : undefined, children: [_jsx("span", { className: "pc-app-logo-mark", children: app.mark }), app.name, end] }, app.name));
    return (_jsx("div", { className: cx('pc-sidebar-head', className), children: _jsxs(DropdownMenu, { className: "pc-sidebar-apps", menuClassName: "pc-sidebar-apps-menu", trigger: _jsx(SidebarItem, { icon: _jsx("span", { className: "pc-app-logo-mark", children: here.mark }), iconAfter: _jsx(CaretUpDown, {}), children: here.name }), children: [_jsx(MenuLabel, { children: "Switch app" }), apps.map(app => row(app)), _jsx(MenuSeparator, {}), row(home, _jsx(SquaresFour, { className: "pc-menu-end" }))] }) }));
}
