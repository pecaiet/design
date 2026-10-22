import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link as InertiaLink } from '@inertiajs/react';
import { Check } from '@phosphor-icons/react';
import { cloneElement, createContext, useContext, useEffect, useId, useRef, useSyncExternalStore, } from 'react';
import { cx } from './cx';
import { moveFocus, typeAhead, useOpen, useOutside, withTrigger } from './popup';
// Below 48rem a popping-up menu is the sheet pecaiet.css draws, so it isn't placed beside its button there.
const PHONE = '(max-width: 47.99rem)';
const watchPhone = (notify) => {
    const query = matchMedia(PHONE);
    query.addEventListener('change', notify);
    return () => query.removeEventListener('change', notify);
};
const items = (menu) => [...(menu?.querySelectorAll('[role^="menuitem"]:not(:disabled):not([aria-disabled="true"])') ?? [])];
/** Closes the menu and puts focus back on its button. */
const CloseMenu = createContext(() => { });
/** A short list of actions or choices that opens over the page from a button. It closes on Esc, a click outside (the dimmed page on
 *  phones), Tab or a choice; focus goes back to the button. Arrow keys, Home, End and a letter move through the items. */
export function DropdownMenu({ trigger, children, title, places, sheet, open: shown, onOpenChange, align, up, menuClassName, className }) {
    const [open, setOpen] = useOpen(shown, onOpenChange);
    const menu = useRef(null);
    const button = useRef(null);
    const last = useRef(false);
    const id = useId();
    const buttonId = trigger.props.id ?? `${id}-button`;
    const phone = useSyncExternalStore(watchPhone, () => matchMedia(PHONE).matches, () => false);
    const close = () => {
        setOpen(false);
        button.current?.focus();
    };
    useOutside(open, menu, button, () => setOpen(false));
    // Opening moves focus to the first item (the last, from the Up arrow).
    useEffect(() => {
        if (!open)
            return;
        const list = items(menu.current);
        const first = last.current ? list.at(-1) : list[0];
        first?.focus();
        last.current = false;
    }, [open]);
    const keys = (event) => {
        const list = items(menu.current);
        if (event.key === 'Tab')
            setOpen(false);
        else if (moveFocus(list, event.key, true) || typeAhead(list, event))
            event.preventDefault();
    };
    const placed = menuClassName || sheet || phone ? undefined : {
        position: 'absolute',
        zIndex: 'var(--pc-layer-menu)',
        [up ? 'bottom' : 'top']: 'calc(100% + var(--pc-space-1))',
        [align === 'end' ? 'right' : 'left']: 0,
    };
    return (_jsx(CloseMenu, { value: close, children: _jsxs("div", { className: className, style: menuClassName ? undefined : { position: 'relative', display: 'inline-block' }, onKeyDown: event => {
                if (event.key !== 'Escape' || !open)
                    return;
                // Prevented, so a dialog around it stays open.
                event.preventDefault();
                event.stopPropagation();
                close();
            }, children: [_jsx("div", { className: "pc-menu-backdrop" }), _jsxs("div", { ref: menu, id: `${id}-menu`, className: cx('pc-menu', sheet ? 'pc-menu-sheet' : 'pc-menu-pop', places && 'pc-menu-places', menuClassName), role: "menu", "aria-label": title, "aria-labelledby": title ? undefined : buttonId, hidden: !open, style: placed, onKeyDown: keys, children: [title && _jsx("div", { className: "pc-menu-label pc-menu-title", children: title }), children] }), withTrigger(trigger, {
                    ref: button,
                    id: buttonId,
                    'aria-haspopup': 'menu',
                    'aria-expanded': open,
                    'aria-controls': `${id}-menu`,
                    onClick: () => setOpen(!open),
                    onKeyDown: event => {
                        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')
                            return;
                        event.preventDefault();
                        const list = items(menu.current);
                        if (open)
                            return (event.key === 'ArrowUp' ? list.at(-1) : list[0])?.focus();
                        last.current = event.key === 'ArrowUp';
                        setOpen(true);
                    },
                })] }) }));
}
export function MenuItem({ icon, destructive, end, children, className, ...element }) {
    const close = useContext(CloseMenu);
    const look = cx('pc-menu-item', destructive && 'pc-menu-item-destructive', className);
    const after = end && cloneElement(end, { className: cx('pc-menu-end', end.props.className) });
    if (element.href !== undefined) {
        const { current, checked, onClick, ...link } = element;
        return (_jsxs(InertiaLink, { ...link, className: look, role: "menuitem", tabIndex: -1, "aria-current": current ? 'page' : undefined, onClick: event => {
                onClick?.(event);
                close();
            }, children: [icon, children, after] }));
    }
    const { checked, current, href, type = 'button', onClick, ...button } = element;
    return (_jsxs("button", { ...button, type: type, className: look, role: checked === undefined ? 'menuitem' : 'menuitemradio', "aria-checked": checked, tabIndex: -1, onClick: event => {
            onClick?.(event);
            close();
        }, children: [icon, children, after, checked && _jsx(Check, { className: "pc-menu-check" })] }));
}
/** A line between groups, from edge to edge. */
export function MenuSeparator() {
    return _jsx("div", { className: "pc-menu-separator", role: "separator" });
}
/** A group's heading, muted and small ("Move to"). */
export function MenuLabel({ children }) {
    return _jsx("div", { className: "pc-menu-label", children: children });
}
