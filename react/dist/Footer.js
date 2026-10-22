import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link as InertiaLink } from '@inertiajs/react';
import { cloneElement } from 'react';
import { cx } from './cx';
import { external } from './shell';
/** The bottom of a signed-out or landing page (apps with a sidebar have none): links, then the app's word, big and faint. */
export function Footer({ groups, links, copyright, language, word, className, ...footer }) {
    const link = ({ label, href }) => external(href)
        ? _jsx("a", { className: "pc-footer-link", href: href, children: label }, href)
        : _jsx(InertiaLink, { className: "pc-footer-link", href: href, children: label }, href);
    return (_jsxs("footer", { ...footer, className: cx('pc-footer', className), children: [groups ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "pc-footer-groups", children: groups.map(group => (_jsxs("nav", { className: "pc-footer-group", "aria-label": group.heading, children: [_jsx("h2", { className: "pc-footer-heading", children: group.heading }), group.links.map(link)] }, group.heading))) }), _jsxs("div", { className: "pc-footer-bottom", children: [_jsx("span", { children: copyright }), language && _jsx("span", { children: language })] })] })) : (_jsxs("div", { className: "pc-footer-line", children: [_jsx("span", { children: copyright }), links.map(link)] })), cloneElement(word, { className: cx('pc-footer-word', word.props.className), 'aria-hidden': true, focusable: 'false' })] }));
}
