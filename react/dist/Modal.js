import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useEffectEvent, useId, useRef } from 'react';
import { cx } from './cx';
import { close } from './motion';
import { assign } from './popup';
/** The <dialog> under the Modal, the Drawer, the search window and the settings window: opening, closing and its motion. */
export function Dialog({ kind, open, onClose, busy, unsaved, className, ref, onPointerDown, onClick, ...dialog }) {
    const own = useRef(null);
    const pressed = useRef(false);
    useEffect(() => {
        const element = own.current;
        if (!element)
            return;
        if (open && !element.open) {
            element.showModal();
            if (kind !== 'dialog')
                element.focus();
        }
        if (!open && element.open)
            close(element);
    }, [open]);
    // Esc is handled here, before pecaiet.js would close it on its own, so closing always goes through the app (and waits while busy).
    const cancel = useEffectEvent((event) => {
        if (event.target !== own.current)
            return;
        event.stopPropagation();
        event.preventDefault();
        if (!busy)
            onClose();
    });
    useEffect(() => {
        if (!open)
            return;
        const listener = (event) => cancel(event);
        window.addEventListener('cancel', listener, true);
        return () => window.removeEventListener('cancel', listener, true);
    }, [open]);
    // On the dimmed page: the press lands on the dialog itself, outside its box.
    const outside = (event) => {
        const box = event.currentTarget.getBoundingClientRect();
        return event.target === event.currentTarget
            && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom);
    };
    return (_jsx("dialog", { tabIndex: kind === 'dialog' ? undefined : -1, ...dialog, ref: node => {
            own.current = node;
            assign(ref, node);
        }, className: cx(`pc-${kind}`, className), onClose: () => {
            if (open)
                onClose();
        }, onPointerDown: event => {
            pressed.current = outside(event);
            onPointerDown?.(event);
        }, onClick: event => {
            if (pressed.current && outside(event) && !busy && !unsaved)
                onClose();
            pressed.current = false;
            onClick?.(event);
        } }));
}
/** A small window over the page that asks one thing: a yes or no, or a few fields. No x: Cancel, Esc or the dimmed page close it.
 *  Opening focuses the first field, or Cancel (put it first) for a confirmation. A sheet from the bottom on phones. */
export function Modal({ title, description, children, actions, onSubmit, ...dialog }) {
    const id = useId();
    const parts = (_jsxs(_Fragment, { children: [_jsxs("div", { children: [_jsx("h2", { className: "pc-dialog-title", id: id, children: title }), description && _jsx("p", { className: "pc-dialog-description", children: description })] }), children && _jsx("div", { className: "pc-dialog-content", children: children }), _jsx("div", { className: "pc-dialog-actions", children: actions })] }));
    return (_jsx(Dialog, { "aria-labelledby": id, ...dialog, kind: "dialog", children: onSubmit ? _jsx("form", { className: "pc-dialog-body", onSubmit: onSubmit, children: parts }) : _jsx("div", { className: "pc-dialog-body", children: parts }) }));
}
