import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cx } from './cx';
// No class in pecaiet.css yet for the label's row with a link at its end.
const ROW = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--pc-space-2)' };
const SMALL = { fontSize: 'var(--pc-text-12)', lineHeight: 'var(--pc-line-16)' };
export function Label({ optional, action, children, className, ...label }) {
    const own = (_jsxs("label", { ...label, className: cx('pc-label', className), children: [children, optional && _jsxs(_Fragment, { children: [" ", _jsx("span", { className: "pc-label-optional", children: "(optional)" })] })] }));
    if (!action)
        return own;
    return (_jsxs("div", { style: ROW, children: [own, _jsx("span", { style: SMALL, children: action })] }));
}
