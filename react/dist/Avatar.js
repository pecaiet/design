import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { User } from '@phosphor-icons/react';
import { useState } from 'react';
import { cx } from './cx';
/** With onClick it's a button (an assignee you can change): a ring in the input colour under the pointer, the blue one on focus. */
export function Avatar({ initials, src, size, square, online, badge, label, className, ...element }) {
    const [broken, setBroken] = useState();
    const photo = src && broken !== src;
    const nobody = !photo && !initials;
    const look = cx('pc-avatar', size && `pc-avatar-${size}`, nobody && 'pc-avatar-none', square && 'pc-avatar-square', className);
    const inside = (_jsxs(_Fragment, { children: [photo ? _jsx("img", { src: src, alt: "", onError: () => setBroken(src) }) : nobody ? _jsx(User, {}) : initials, online && _jsx("span", { className: "pc-avatar-status" }), badge] }));
    if (element.onClick)
        return _jsx("button", { ...element, type: "button", className: look, "aria-label": label, children: inside });
    const named = label ? { role: 'img', 'aria-label': label, 'data-pc-tooltip': label } : { 'aria-hidden': true };
    return _jsx("span", { ...element, ...named, className: look, children: inside });
}
/** Several people, overlapping, each ringed in the colour behind it. */
export function Avatars({ label, more, size, children, className, ...span }) {
    return (_jsxs("span", { ...span, className: cx('pc-avatars', className), role: "group", "aria-label": label, children: [children, more ? _jsxs("span", { className: cx('pc-avatar', size && `pc-avatar-${size}`, 'pc-avatar-more'), role: "img", "aria-label": `${more} more`, children: ["+", more] }) : null] }));
}
