import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CaretDown, X } from '@phosphor-icons/react';
import { useRef, useState } from 'react';
import { cx } from './cx';
import { FieldMessage, useField } from './Field';
import { enter, leave } from './motion';
import { useOutside } from './popup';
import { PickerMenu, Select } from './Select';
/** Picking from a long list by typing: the Select with a search at the top of its list. Only values from the list. */
export function Combobox(props) {
    if (!props.multiple)
        return _jsx(Select, { ...props });
    return _jsx(Chips, { ...props });
}
function Chips({ label, 'aria-label': ariaLabel, options, value, onChange, placeholder, search, empty, title, name, hint, error, optional, disabled, id, className, }) {
    const field = useField(id, error || hint, error);
    const [open, setOpen] = useState(false);
    const box = useRef(null);
    const menu = useRef(null);
    const chips = useRef(new Map());
    const added = useRef(new Set());
    const picked = value.map(one => options.find(option => option.value === one)).filter(option => option !== undefined);
    const labelId = `${field.fieldId}-label`;
    useOutside(open, menu, box, () => setOpen(false));
    // A chip just picked fades in where it lands; one taken off fades out where it is, then goes.
    const add = (one) => {
        added.current.add(one);
        onChange([...value, one]);
    };
    const remove = async (one) => {
        await leave(chips.current.get(one) ?? null);
        onChange(value.filter(other => other !== one));
    };
    return (_jsxs("div", { className: cx('pc-field', className), children: [label && (_jsxs("span", { className: "pc-label", id: labelId, children: [label, optional && _jsxs(_Fragment, { children: [" ", _jsx("span", { className: "pc-label-optional", children: "(optional)" })] })] })), _jsxs("div", { className: "pc-picker", onKeyDown: event => {
                    if (event.key !== 'Escape' || !open)
                        return;
                    // Prevented, so a dialog around it stays open.
                    event.preventDefault();
                    event.stopPropagation();
                    setOpen(false);
                    box.current?.focus();
                }, children: [_jsxs("div", { ref: box, id: field.fieldId, className: "pc-picker-field", role: "combobox", tabIndex: 0, "aria-haspopup": "listbox", "aria-expanded": open, "aria-controls": `${field.fieldId}-menu`, "aria-labelledby": label ? labelId : undefined, "aria-label": ariaLabel, "aria-describedby": field.describedBy, "aria-invalid": field.invalid, "aria-disabled": disabled || undefined, onClick: () => {
                            if (!disabled)
                                setOpen(!open);
                        }, onKeyDown: event => {
                            if (event.target !== event.currentTarget || disabled)
                                return;
                            if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
                                event.preventDefault();
                                setOpen(true);
                            }
                            else if (event.key === 'Backspace' && picked.length)
                                remove(picked[picked.length - 1].value);
                        }, children: [picked.map(option => (_jsxs("span", { ref: element => {
                                    if (!element)
                                        return;
                                    chips.current.set(option.value, element);
                                    if (added.current.delete(option.value))
                                        enter(element);
                                    return () => {
                                        chips.current.delete(option.value);
                                    };
                                }, className: "pc-chip", children: [option.label, _jsx("button", { className: "pc-chip-remove", type: "button", "aria-label": `Remove ${option.label}`, "data-pc-tooltip": `Remove ${option.label}`, tabIndex: disabled ? -1 : undefined, onClick: event => {
                                            // Not a click on the field: it doesn't open the list.
                                            event.stopPropagation();
                                            if (disabled)
                                                return;
                                            remove(option.value);
                                            box.current?.focus();
                                        }, children: _jsx(X, {}) })] }, option.value))), _jsx("span", { className: "pc-picker-placeholder", children: placeholder }), _jsx(CaretDown, {})] }), _jsx(PickerMenu, { menu: menu, id: `${field.fieldId}-menu`, open: open, labelledBy: label ? labelId : undefined, label: ariaLabel, title: title ?? label ?? ariaLabel, options: options, picked: one => value.includes(one), onPick: option => (value.includes(option.value) ? remove(option.value) : add(option.value)), search: search, empty: empty, multiple: true, onBackspace: () => {
                            if (picked.length)
                                remove(picked[picked.length - 1].value);
                        } }), name && (value.length
                        ? value.map(one => _jsx("input", { type: "hidden", name: name, value: one }, one))
                        : _jsx("input", { type: "hidden", name: name, value: "" }))] }), _jsx(FieldMessage, { id: field.messageId, hint: hint, error: error })] }));
}
