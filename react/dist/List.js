import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from 'react';
import { cx } from './cx';
export function List({ items, numbered, className, ...list }) {
    const Tag = numbered ? 'ol' : 'ul';
    return (_jsx(Tag, { ...list, className: cx('pc-list', className), children: items.map((item, i) => _jsx("li", { children: item }, i)) }));
}
export function Details({ items, className, ...dl }) {
    return (_jsx("dl", { ...dl, className: cx('pc-details', className), children: items.map(({ label, value }, i) => (_jsxs(Fragment, { children: [_jsx("dt", { children: label }), _jsx("dd", { children: value || value === 0 ? value : _jsx("span", { className: "pc-muted", children: "Not set" }) })] }, i))) }));
}
