import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { User } from '@phosphor-icons/react';
import { useState } from 'react';
import { cx } from './cx';
export function Avatar({ initials, src, size, square, online, badge, label, className, ...span }) {
    const [broken, setBroken] = useState();
    const photo = src && broken !== src;
    const nobody = !photo && !initials;
    const named = label ? { role: 'img', 'aria-label': label, 'data-pc-tooltip': label } : { 'aria-hidden': true };
    return (_jsxs("span", { ...span, ...named, className: cx('pc-avatar', size && `pc-avatar-${size}`, nobody && 'pc-avatar-none', square && 'pc-avatar-square', className), children: [photo ? _jsx("img", { src: src, alt: "", onError: () => setBroken(src) }) : nobody ? _jsx(User, {}) : initials, online && _jsx("span", { className: "pc-avatar-status" }), badge] }));
}
/** Several people, overlapping, each ringed in the colour behind it. */
export function Avatars({ label, more, children, className, ...span }) {
    return (_jsxs("span", { ...span, className: cx('pc-avatars', className), role: "group", "aria-label": label, children: [children, more ? _jsxs("span", { className: "pc-avatar pc-avatar-more", role: "img", "aria-label": `${more} more`, children: ["+", more] }) : null] }));
}
