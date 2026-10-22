import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link as InertiaLink } from '@inertiajs/react';
import { ArrowSquareOut } from '@phosphor-icons/react';
import { cloneElement, isValidElement } from 'react';
import { cx } from './cx';
export function Link({ quiet, icon, iconAfter, children, className, ...element }) {
    const look = cx(quiet ? 'pc-link-quiet' : 'pc-link', className);
    const lead = isValidElement(icon) ? cloneElement(icon, { className: cx('pc-link-lead', icon.props.className) }) : icon;
    if (element.external) {
        const { external, ...link } = element;
        return (_jsxs("a", { ...link, className: look, target: "_blank", rel: "noopener", children: [lead, children, iconAfter ?? _jsx(ArrowSquareOut, {}), _jsx("span", { className: "pc-visually-hidden", children: " (opens in a new tab)" })] }));
    }
    if (element.href !== undefined) {
        const { external, ...link } = element;
        return _jsxs(InertiaLink, { ...link, className: look, children: [lead, children, iconAfter] });
    }
    const { external, type = 'button', ...button } = element;
    return _jsxs("button", { ...button, type: type, className: look, children: [lead, children, iconAfter] });
}
