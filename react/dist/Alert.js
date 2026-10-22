import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle, Warning, WarningCircle, X } from '@phosphor-icons/react';
import { useEffect, useRef } from 'react';
import { Button } from './Button';
import { cx } from './cx';
import { enter as grow, leave } from './motion';
const ICONS = { notice: _jsx(CheckCircle, {}), warning: _jsx(Warning, {}), error: _jsx(WarningCircle, {}) };
export function Alert({ kind, icon, title, items, action, onDismiss, banner, enter, children, className, ...element }) {
    const ref = useRef(null);
    useEffect(() => {
        if (enter)
            grow(ref.current);
    }, []);
    const dismiss = async (event) => {
        // Handled here, so pecaiet.js doesn't remove an element React still owns.
        event.preventDefault();
        await leave(ref.current);
        onDismiss?.();
    };
    const attributes = {
        ...element,
        className: cx('pc-alert', `pc-alert-${kind}`, banner && 'pc-alert-banner', className),
        role: kind === 'error' ? 'alert' : 'status',
    };
    const end = (_jsxs(_Fragment, { children: [action && (action.href
                ? _jsx(Button, { variant: "outline", className: "pc-alert-action", href: action.href, children: action.label })
                : _jsx(Button, { variant: "outline", className: "pc-alert-action", onClick: action.onClick, children: action.label })), onDismiss && _jsx(Button, { variant: "ghost", icon: _jsx(X, {}), label: "Dismiss", className: "pc-alert-close", onClick: dismiss })] }));
    if (!title && !items && !action && !onDismiss) {
        return (_jsxs("p", { ...attributes, ref: ref, children: [icon ?? ICONS[kind], _jsx("span", { children: children })] }));
    }
    const oneLine = !title && !items;
    return (_jsxs("div", { ...attributes, ref: ref, children: [icon ?? ICONS[kind], oneLine ? (_jsx("span", { children: children })) : (_jsxs("div", { className: "pc-alert-body", children: [title && _jsx("p", { className: "pc-alert-title", children: title }), children && _jsx("p", { children: children }), items && _jsx("ul", { children: items.map((item, i) => _jsx("li", { children: item }, i)) })] })), end] }));
}
