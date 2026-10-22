import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CaretDown, Check, MagnifyingGlass } from '@phosphor-icons/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { cx } from './cx';
import { FieldMessage, useField } from './Field';
import { InputGroup } from './InputGroup';
import { moveFocus, typeAhead, useOutside } from './popup';
/** Choosing one value from a list: a button that looks like a field and opens our own list (a sheet on phones). Up and Down move,
 *  Enter picks and puts focus back on the button, Esc or the dimmed page close it without a change. Two to five choices that
 *  should all be seen are radios; typing to find in a long list is the Combobox. */
export function Select({ label, 'aria-label': ariaLabel, options, value, onChange, placeholder, none, search, empty, title, name, hint, error, optional, disabled, id, className, }) {
    const field = useField(id, error || hint, error);
    const [open, setOpen] = useState(false);
    const button = useRef(null);
    const menu = useRef(null);
    const chosen = options.find(option => option.value === value);
    const labelId = `${field.fieldId}-label`;
    const close = () => {
        setOpen(false);
        button.current?.focus();
    };
    useOutside(open, menu, button, () => setOpen(false));
    return (_jsxs("div", { className: cx('pc-field', className), children: [label && (_jsxs("span", { className: "pc-label", id: labelId, children: [label, optional && _jsxs(_Fragment, { children: [" ", _jsx("span", { className: "pc-label-optional", children: "(optional)" })] })] })), _jsxs("div", { className: "pc-picker", onKeyDown: event => {
                    if (event.key !== 'Escape' || !open)
                        return;
                    // Prevented, so a dialog around it stays open.
                    event.preventDefault();
                    event.stopPropagation();
                    close();
                }, children: [_jsxs("button", { ref: button, id: field.fieldId, className: "pc-picker-button", type: "button", "aria-haspopup": "listbox", "aria-expanded": open, "aria-controls": `${field.fieldId}-menu`, "aria-labelledby": label ? `${labelId} ${field.fieldId}` : undefined, "aria-label": ariaLabel && (chosen ? `${ariaLabel}: ${chosen.label}` : ariaLabel), "aria-describedby": field.describedBy, "aria-invalid": field.invalid, disabled: disabled, onClick: () => setOpen(!open), onKeyDown: event => {
                            if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && !open) {
                                event.preventDefault();
                                setOpen(true);
                            }
                        }, children: [chosen ? _jsx("span", { children: chosen.label }) : _jsx("span", { className: "pc-picker-placeholder", children: placeholder ?? none }), _jsx(CaretDown, {})] }), _jsx(PickerMenu, { menu: menu, id: `${field.fieldId}-menu`, open: open, labelledBy: label ? labelId : undefined, label: ariaLabel, title: title ?? label ?? ariaLabel, options: options, picked: candidate => candidate === value, onPick: option => {
                            onChange(option.value);
                            close();
                        }, none: none === undefined ? undefined : {
                            label: none,
                            picked: value === null,
                            onPick: () => {
                                onChange(null);
                                close();
                            },
                        }, search: search, empty: empty }), name && _jsx("input", { type: "hidden", name: name, value: value ?? '' })] }), _jsx(FieldMessage, { id: field.messageId, hint: hint, error: error })] }));
}
const choices = (menu) => [...(menu?.querySelectorAll('[role="option"]:not([aria-disabled="true"])') ?? [])];
/** The list a picker opens: the phone sheet's title, the search, the options in their groups, and the keys that move through them.
 *  With a search, focus starts there and Down moves into the list; a letter typed on an option goes on into the search. */
export function PickerMenu({ menu, id, open, labelledBy, label, title, options, picked, onPick, none, search, empty, multiple, onBackspace }) {
    const [query, setQuery] = useState('');
    const [wasOpen, setWasOpen] = useState(open);
    if (open !== wasOpen) {
        setWasOpen(open);
        if (open)
            setQuery('');
    }
    const field = useRef(null);
    const typed = query.trim();
    const words = typed.toLocaleLowerCase();
    const shown = words ? options.filter(option => option.label.toLocaleLowerCase().includes(words)) : options;
    // Opening moves focus to the search, else to the chosen option (or the first).
    useEffect(() => {
        if (!open)
            return;
        if (search) {
            field.current?.focus();
            return;
        }
        const rows = choices(menu.current);
        const first = rows.find(row => row.getAttribute('aria-selected') === 'true') ?? rows[0];
        first?.focus();
    }, [open]);
    const keys = (event) => {
        const rows = choices(menu.current);
        if (event.target === field.current) {
            if (event.key === 'Backspace' && !query)
                onBackspace?.();
            if (event.key === 'ArrowDown')
                rows[0]?.focus();
            // Enter picks the first match, and never sends a form around it.
            else if (event.key === 'Enter') {
                if (typed)
                    rows[0]?.click();
            }
            else
                return;
            event.preventDefault();
            return;
        }
        if (!search) {
            if (moveFocus(rows, event.key, false) || typeAhead(rows, event))
                event.preventDefault();
        }
        else if (event.key === 'ArrowUp' && rows.indexOf(document.activeElement) === 0) {
            event.preventDefault();
            field.current?.focus();
        }
        else if (moveFocus(rows, event.key, false)) {
            event.preventDefault();
        }
        else if (!event.ctrlKey && !event.metaKey && !event.altKey && ((event.key.length === 1 && event.key !== ' ') || event.key === 'Backspace')) {
            // Left to go on, a letter (or Backspace) lands in the search.
            field.current?.focus();
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "pc-menu-backdrop" }), _jsxs("div", { ref: menu, id: id, className: "pc-menu pc-picker-menu pc-menu-pop", role: "listbox", "aria-labelledby": labelledBy, "aria-label": label, "aria-multiselectable": multiple || undefined, hidden: !open, onKeyDown: keys, children: [_jsx("div", { className: "pc-menu-label pc-menu-title", children: title }), search && (_jsx(InputGroup, { ref: field, icon: _jsx(MagnifyingGlass, {}), type: "search", placeholder: search, "aria-label": search, value: query, onChange: event => setQuery(event.target.value) })), none && !words && (_jsxs("button", { className: "pc-menu-item pc-menu-none", type: "button", role: "option", "aria-selected": none.picked, tabIndex: -1, onClick: none.onPick, children: [none.label, none.picked && _jsx(Check, { className: "pc-menu-check" })] })), shown.map((option, i) => {
                        const on = picked(option.value);
                        return (_jsxs(Fragment, { children: [option.group && option.group !== shown[i - 1]?.group && _jsx("div", { className: "pc-menu-label", children: option.group }), _jsxs("button", { className: "pc-menu-item", type: "button", role: "option", "aria-selected": on, "aria-disabled": option.disabledReason ? true : undefined, tabIndex: -1, onClick: () => {
                                        if (!option.disabledReason)
                                            onPick(option);
                                    }, children: [multiple && _jsx("input", { className: "pc-checkbox", type: "checkbox", tabIndex: -1, "aria-hidden": "true", checked: on, readOnly: true }), option.colour && _jsx("span", { className: cx('pc-menu-dot', `pc-colour-${option.colour}`) }), option.icon, option.label, option.disabledReason && _jsx("span", { className: "pc-menu-note", children: option.disabledReason }), !multiple && on && _jsx(Check, { className: "pc-menu-check" })] })] }, option.value));
                    }), words && !shown.length && _jsx("p", { className: "pc-menu-empty", children: empty ? empty(typed) : `Nothing matches “${typed}”.` })] })] }));
}
