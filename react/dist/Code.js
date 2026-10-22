import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Info } from '@phosphor-icons/react';
import { cx } from './cx';
import { CopyInput } from './InputGroup';
/** A machine value in running text: an ID, an error code. */
export function Code({ className, ...code }) {
    return _jsx("code", { ...code, className: cx('pc-code', className) });
}
/** A block of output (a backtrace): it scrolls inside itself and never widens the page. */
export function CodeBlock({ className, ...pre }) {
    return _jsx("pre", { ...pre, className: cx('pc-code-block', className) });
}
/** A keyboard key: "/", "Esc", "⌘K". */
export function Kbd({ className, ...span }) {
    return _jsx("span", { ...span, className: cx('pc-kbd', className) });
}
/** A secret shown once: the warning and the value together in one notice, with no separate label. */
export function Secret({ value, children, className }) {
    return (_jsxs("div", { className: cx('pc-alert', 'pc-alert-notice', className), role: "status", children: [_jsx(Info, {}), _jsxs("div", { style: { display: 'grid', gap: 'var(--pc-space-2)', flex: 1, minWidth: 0 }, children: [_jsx("span", { children: children }), _jsx(CopyInput, { mono: true, value: value, "aria-label": "Secret", copyLabel: "Copy secret" })] })] }));
}
