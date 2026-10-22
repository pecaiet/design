import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cx } from './cx';
export function Label({ optional, children, className, ...label }) {
    return (_jsxs("label", { ...label, className: cx('pc-label', className), children: [children, optional && _jsxs(_Fragment, { children: [" ", _jsx("span", { className: "pc-label-optional", children: "(optional)" })] })] }));
}
