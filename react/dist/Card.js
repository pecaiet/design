import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link as InertiaLink } from '@inertiajs/react';
import { cx } from './cx';
export function Card({ title, description, action, titleAs: Title = 'h2', href, media, rows, footer, footerNote, children, className, ...div }) {
    return (_jsxs("div", { ...div, className: cx('pc-card', className), children: [media && _jsx("img", { alt: "", ...media, className: "pc-card-media" }), (title || description || action) && (_jsxs("div", { className: "pc-card-header", children: [title && (_jsx(Title, { className: "pc-card-title", children: href ? _jsx(InertiaLink, { className: "pc-card-link", href: href, children: title }) : title })), description && _jsx("p", { className: "pc-card-description", children: description }), action && _jsx("div", { className: "pc-card-action", children: action })] })), children && _jsx("div", { className: cx('pc-card-content', rows && 'pc-card-rows'), children: children }), (footer || footerNote) && (_jsxs("div", { className: "pc-card-footer", children: [footerNote && _jsx("span", { className: "pc-card-footer-note", children: footerNote }), footer] }))] }));
}
