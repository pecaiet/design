import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { XIcon } from '@phosphor-icons/react';
import { useLayoutEffect, useRef } from 'react';
import { cx } from './cx';
import { enter as fadeIn, leave } from './motion';
export function Chip({ icon, enter, onRemove, removeLabel, children, className, ...span }) {
    const ref = useRef(null);
    // Before the first paint, so it never shows at full size first.
    useLayoutEffect(() => {
        if (enter)
            fadeIn(ref.current);
    }, []);
    const remove = async (event) => {
        // Handled here, so pecaiet.js doesn't remove an element React still owns.
        event.preventDefault();
        await leave(ref.current);
        onRemove?.();
    };
    return (_jsxs("span", { ...span, ref: ref, className: cx('pc-chip', className), children: [icon, children, onRemove && (_jsx("button", { className: "pc-chip-remove", type: "button", "aria-label": removeLabel, "data-pc-tooltip": removeLabel, onClick: remove, children: _jsx(XIcon, {}) }))] }));
}
