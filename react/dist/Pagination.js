import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { Fragment } from 'react';
import { Button } from './Button';
import { cx } from './cx';
/** Moving through pages: the first and last pages and the ones either side of the one you're on (seven or fewer: all of them),
 *  "…" for the rest. An end that goes nowhere is turned off. */
export function Pagination({ page, pages, href, compact, arrows, numbers = true, className, ...nav }) {
    const shown = pages <= 7
        ? Array.from({ length: pages }, (_, i) => i + 1)
        : [1, page - 1, page, page + 1, pages].filter((n, i, all) => n >= 1 && n <= pages && all.indexOf(n) === i);
    const end = (next) => {
        const to = next ? page + 1 : page - 1;
        const icon = next ? _jsx(CaretRight, {}) : _jsx(CaretLeft, {});
        const words = next ? 'Next' : 'Previous';
        const off = to < 1 || to > pages;
        if (compact || arrows) {
            const label = `${words} page`;
            if (off)
                return _jsx("a", { className: "pc-btn pc-btn-ghost pc-btn-icon", "aria-disabled": "true", "aria-label": label, "data-pc-tooltip": label, children: icon });
            return _jsx(Button, { variant: "ghost", href: href(to), icon: icon, label: label });
        }
        if (off)
            return _jsx("a", { className: "pc-btn pc-btn-ghost", "aria-disabled": "true", children: next ? _jsxs(_Fragment, { children: [words, icon] }) : _jsxs(_Fragment, { children: [icon, words] }) });
        return next
            ? _jsx(Button, { variant: "ghost", href: href(to), iconAfter: icon, children: words })
            : _jsx(Button, { variant: "ghost", href: href(to), icon: icon, children: words });
    };
    return (_jsxs("nav", { "aria-label": "Pages", ...nav, className: cx('pc-pagination', className), children: [end(false), compact ? (_jsxs("span", { className: "pc-pagination-where", children: ["Page ", page, " of ", pages] })) : numbers && shown.map((n, i) => (_jsxs(Fragment, { children: [i > 0 && n - shown[i - 1] > 1 && _jsx("span", { className: "pc-pagination-gap", "aria-hidden": "true", children: "\u2026" }), _jsx(Button, { variant: "ghost", href: href(n), className: "pc-btn-icon pc-pagination-page", "aria-current": n === page ? 'page' : undefined, children: n })] }, n))), end(true)] }));
}
/** A count and the pages, as under a table in the card's footer. */
export function PaginationBar({ count, size, children, className, ...div }) {
    return (_jsxs("div", { ...div, className: cx('pc-pagination-bar', className), children: [size && _jsxs("span", { className: "pc-pagination-size", children: ["Rows per page", size] }), _jsx("span", { className: "pc-pagination-count", children: count }), children] }));
}
/** Show more instead of pages. */
export function PaginationMore({ children, count, onClick, busy, className, ...div }) {
    return (_jsxs("div", { ...div, className: cx('pc-pagination-more', className), children: [_jsx(Button, { variant: "outline", busy: busy, onClick: onClick, children: children }), _jsx("span", { className: "pc-pagination-count", children: count })] }));
}
