import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X } from '@phosphor-icons/react';
import { useEffect, useId, useRef } from 'react';
import { Button } from './Button';
import { cx } from './cx';
import { useOpen, useOutside, withTrigger } from './popup';
const FOCUSABLE = 'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';
/** A panel that opens from a button and can hold a link, a field or buttons; anything you can click goes here, not in a Tooltip.
 *  4px under the button, at most 320px wide; a sheet from the bottom over the dimmed page on phones. Opening moves focus to the
 *  first thing in it; Esc, a click outside or Tab out close it, and focus goes back to the button. */
export function Popover({ trigger, title, label, titleAs: Title = 'h3', text, children, actions, align, up, open: shown, onOpenChange, className }) {
    const [open, setOpen] = useOpen(shown, onOpenChange);
    const panel = useRef(null);
    const button = useRef(null);
    const id = useId();
    const close = () => {
        setOpen(false);
        button.current?.focus();
    };
    useOutside(open, panel, button, () => setOpen(false));
    useEffect(() => {
        if (!open)
            return;
        // The x only shows on phones: the first thing that can take focus and is drawn.
        const first = [...(panel.current?.querySelectorAll(FOCUSABLE) ?? [])].find(element => element.checkVisibility());
        first?.focus();
    }, [open]);
    return (_jsxs("div", { className: cx('pc-popover-anchor', className), onKeyDown: event => {
            if (event.key !== 'Escape' || !open)
                return;
            // Prevented, so a dialog around it stays open.
            event.preventDefault();
            event.stopPropagation();
            close();
        }, children: [withTrigger(trigger, {
                ref: button,
                'aria-haspopup': 'dialog',
                'aria-expanded': open,
                'aria-controls': `${id}-popover`,
                onClick: () => setOpen(!open),
            }), _jsx("div", { className: "pc-popover-backdrop" }), _jsxs("div", { ref: panel, id: `${id}-popover`, className: cx('pc-popover', align === 'end' && 'pc-popover-end', up && 'pc-popover-up'), role: "dialog", "aria-labelledby": title ? `${id}-title` : undefined, "aria-label": label, hidden: !open, children: [title && (_jsxs("div", { className: "pc-popover-head", children: [_jsx(Title, { className: "pc-dialog-title", id: `${id}-title`, children: title }), _jsx(Button, { variant: "ghost", icon: _jsx(X, {}), label: "Close", className: "pc-popover-close", onClick: close })] })), text && _jsx("p", { className: "pc-popover-text", children: text }), children, actions && _jsx("div", { className: "pc-dialog-actions", children: actions })] })] }));
}
