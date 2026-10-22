import { jsx as _jsx } from "react/jsx-runtime";
import { cx } from './cx';
export function Separator({ bleed, vertical, children, className }) {
    if (children)
        return _jsx("div", { className: cx('pc-separator-text', className), role: "separator", children: children });
    if (vertical)
        return _jsx("span", { className: cx('pc-separator', 'pc-separator-vertical', className), "aria-hidden": "true" });
    return _jsx("hr", { className: cx('pc-separator', bleed && 'pc-separator-bleed', className) });
}
