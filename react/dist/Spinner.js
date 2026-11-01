import { jsx as _jsx } from "react/jsx-runtime";
import { CircleNotchIcon } from '@phosphor-icons/react';
import { cx } from './cx';
export function Spinner({ label = 'Loading', size, className }) {
    return (_jsx("span", { className: cx('pc-spinner', size && `pc-spinner-${size}`, className), role: "status", "aria-label": label, children: _jsx(CircleNotchIcon, { "aria-hidden": "true" }) }));
}
