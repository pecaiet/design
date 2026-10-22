import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link as InertiaLink } from '@inertiajs/react';
import { useId } from 'react';
import { Kbd } from './Code';
import { cx } from './cx';
/** One row of the sidebar: a link when it opens a page, a button when it does something. */
export function SidebarItem({ icon, mark, detail, alert, shortcut, iconAfter, children, className, ...element }) {
    const look = cx('pc-sidebar-item', className);
    const inner = (_jsxs(_Fragment, { children: [mark ? _jsx("span", { className: "pc-sidebar-mark", children: mark }) : icon, _jsx("span", { className: "pc-sidebar-label", children: children }), detail != null && _jsx("span", { className: cx('pc-sidebar-detail', alert && 'pc-sidebar-detail-alert'), children: detail }), shortcut && _jsx(Kbd, { children: shortcut }), iconAfter] }));
    if (element.href !== undefined) {
        const { current, ...link } = element;
        return _jsx(InertiaLink, { ...link, className: look, "aria-current": current ? 'page' : undefined, children: inner });
    }
    const { current, href, type = 'button', ...button } = element;
    return _jsx("button", { ...button, type: type, className: look, children: inner });
}
/** A heading with the rows nested under it (a space and its lists). */
export function SidebarSection({ heading, icon, mark, children, className, ...div }) {
    const id = useId();
    return (_jsxs("div", { role: "group", "aria-labelledby": id, ...div, className: cx('pc-sidebar-section', className), children: [_jsxs("div", { className: "pc-sidebar-item pc-sidebar-heading", children: [mark ? _jsx("span", { className: "pc-sidebar-mark", children: mark }) : icon, _jsx("span", { className: "pc-sidebar-label", id: id, children: heading })] }), _jsx("div", { className: "pc-sidebar-sub", children: children })] }));
}
