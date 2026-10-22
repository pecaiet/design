import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link as InertiaLink } from '@inertiajs/react';
import { CaretRight } from '@phosphor-icons/react';
import { Fragment } from 'react';
import { cx } from './cx';
/** Above the page header, only on pages below another page (a user under Users), never on a top-level page. */
export function Breadcrumbs({ parents, current, className, ...nav }) {
    return (_jsxs("nav", { ...nav, className: cx('pc-breadcrumbs', className), "aria-label": "Breadcrumb", children: [parents.map(({ label, href }) => (_jsxs(Fragment, { children: [_jsx(InertiaLink, { href: href, children: label }), _jsx(CaretRight, {})] }, href))), _jsx("span", { "aria-current": "page", children: current })] }));
}
