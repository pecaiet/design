import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link as InertiaLink } from '@inertiajs/react';
import { cx } from './cx';
import { Spinner } from './Spinner';
export function Button({ variant, destructive, size, full, pressed, busy, disabledReason, icon, iconAfter, label, children, className, ...element }) {
    const shared = {
        className: cx('pc-btn', `pc-btn-${variant}`, destructive && 'pc-btn-destructive', size && `pc-btn-${size}`, label && 'pc-btn-icon', full && 'pc-btn-full', className),
        'aria-label': label,
        'aria-pressed': pressed,
        'aria-busy': busy || undefined,
        'aria-disabled': disabledReason ? true : undefined,
        'data-pc-tooltip': disabledReason ?? label,
    };
    const inner = (_jsxs(_Fragment, { children: [busy ? _jsx(Spinner, { label: "Working" }) : icon, children, iconAfter] }));
    // aria-disabled keeps it focusable, so the click has to be ignored here.
    const ignore = (event) => event.preventDefault();
    if (element.href !== undefined) {
        // A link that goes nowhere has no href.
        if (disabledReason)
            return _jsx("a", { ...shared, onClick: ignore, children: inner });
        return _jsx(InertiaLink, { ...element, ...shared, children: inner });
    }
    const { type = 'button', onClick, ...button } = element;
    return (_jsx("button", { ...button, ...shared, type: type, onClick: disabledReason ? ignore : onClick, children: inner }));
}
