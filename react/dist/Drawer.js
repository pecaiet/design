import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CaretLeft, X } from '@phosphor-icons/react';
import { useId, useLayoutEffect, useRef } from 'react';
import { Button } from './Button';
import { cx } from './cx';
import { Dialog } from './Modal';
import { enter, leave } from './motion';
import { assign } from './popup';
/** A panel from the right with a form or a record's details. A yes/no question stays a Modal. */
export function Drawer({ title, children, footer, ...props }) {
    const id = useId();
    // Beside the page it slides in and out as the sidebar does (pecaiet.js); one that comes with the page itself (a load, a visit) is
    // simply there, like the rest of the page.
    const panel = useRef(null);
    const sideways = props.beside ? props : undefined;
    useLayoutEffect(() => {
        if (sideways && document.documentElement.hasAttribute('data-pc-ready'))
            enter(panel.current);
    }, []);
    const close = sideways ? async () => { await leave(panel.current); sideways.onClose(); } : props.onClose;
    const parts = (_jsxs(_Fragment, { children: [_jsxs("div", { className: "pc-drawer-head", children: [props.back && (_jsx(Button, { variant: "ghost", icon: _jsx(CaretLeft, {}), label: props.back, className: "pc-drawer-back", "data-pc-tooltip-side": "bottom", onClick: close })), _jsx("h2", { className: "pc-drawer-title", id: id, children: title }), _jsx(Button, { variant: "ghost", icon: _jsx(X, {}), label: "Close", className: "pc-drawer-close", "data-pc-tooltip-side": "bottom", onClick: close })] }), _jsx("div", { className: "pc-drawer-body", children: children }), footer && _jsx("div", { className: "pc-drawer-footer", children: footer })] }));
    if (props.beside) {
        const { beside, back, onClose, className, ref, ...aside } = props;
        return (_jsx("aside", { "aria-labelledby": id, ...aside, ref: node => {
                panel.current = node;
                assign(ref, node);
            }, className: cx('pc-drawer', 'pc-drawer-beside', className), children: parts }));
    }
    const { beside, back, ...dialog } = props;
    return _jsx(Dialog, { "aria-labelledby": id, ...dialog, kind: "drawer", children: parts });
}
