import { jsx as _jsx } from "react/jsx-runtime";
import { CircleNotch } from '@phosphor-icons/react';
import { cx } from './cx';
export function Spinner({ label = 'Loading', size, className }) {
    return (_jsx("span", { className: cx('pc-spinner', size && `pc-spinner-${size}`, className), role: "status", "aria-label": label, children: _jsx(CircleNotch, { "aria-hidden": "true" }) }));
}
