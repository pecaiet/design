import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Breadcrumbs } from './Breadcrumbs';
import { cx } from './cx';
import { SidebarToggle } from './Navigation';
/** The top of a page: the sidebar toggle (inside a Navigation), the title, an optional line, and the page's action on the right. */
export function PageHeader({ title, description, actions, breadcrumbs, className, ...div }) {
    const header = (_jsxs("div", { ...div, className: cx('pc-page-header', className), children: [_jsxs("div", { className: "pc-page-header-text", children: [_jsxs("div", { className: "pc-page-title-row", children: [_jsx(SidebarToggle, {}), _jsx("h1", { className: "pc-page-title", children: title })] }), description && _jsx("p", { className: "pc-page-description", children: description })] }), actions && _jsx("div", { className: "pc-page-header-actions", children: actions })] }));
    if (!breadcrumbs)
        return header;
    return (_jsxs(_Fragment, { children: [_jsx(Breadcrumbs, { ...breadcrumbs, style: { marginBottom: 'var(--pc-space-1-5)' } }), header] }));
}
