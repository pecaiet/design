import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CalendarDotsIcon, XIcon } from '@phosphor-icons/react';
import { useRef, useState } from 'react';
import { Button } from './Button';
import { cx } from './cx';
import { Datepicker } from './Datepicker';
import { FieldMessage, useField } from './Field';
import { useOutside } from './popup';
const iso = (date) => date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : '';
/** A date in a form: a button that looks like a field and opens the Datepicker under it (a sheet on phones). No typing. Picking a
 *  day fills it, closes it and puts focus back on the button; Esc closes it without a change; the x clears it. */
export function DateInput({ label, 'aria-label': ariaLabel, placeholder, children, min, max, disabledDays, format, locale, name, hint, error, optional, disabled, id, className, ...choice }) {
    const field = useField(id, error || hint, error);
    const [open, setOpen] = useState(false);
    // Each opening starts the calendar afresh, on the chosen month.
    const [opened, setOpened] = useState(0);
    const button = useRef(null);
    const panel = useRef(null);
    const labelId = `${field.fieldId}-label`;
    const close = () => {
        setOpen(false);
        button.current?.focus();
    };
    useOutside(open, panel, button, () => setOpen(false));
    const short = (date) => format ? format(date) : `${new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date)}, ${new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'short',
        year: date.getFullYear() === new Date().getFullYear() ? undefined : 'numeric',
    }).format(date)}`;
    // A range on its way shows its start and a dash.
    const shown = choice.range
        ? choice.value.start && `${short(choice.value.start)} – ${choice.value.end ? short(choice.value.end) : '…'}`
        : choice.value && short(choice.value);
    const clear = () => (choice.range ? choice.onChange({ start: null, end: null }) : choice.onChange(null));
    const calendar = { min, max, disabledDays, locale, autoFocus: open, children };
    return (_jsxs("div", { className: cx('pc-field', className), children: [label && (_jsxs("span", { className: "pc-label", id: labelId, children: [label, optional && _jsxs(_Fragment, { children: [" ", _jsx("span", { className: "pc-label-optional", children: "(optional)" })] })] })), _jsxs("div", { className: "pc-picker pc-date", onKeyDown: event => {
                    if (event.key !== 'Escape' || !open)
                        return;
                    // Prevented, so a dialog around it stays open.
                    event.preventDefault();
                    event.stopPropagation();
                    close();
                }, children: [_jsxs("button", { ref: button, id: field.fieldId, className: "pc-picker-button", type: "button", "aria-haspopup": "dialog", "aria-expanded": open, "aria-controls": `${field.fieldId}-popover`, "aria-labelledby": label ? `${labelId} ${field.fieldId}` : undefined, "aria-label": ariaLabel && (shown ? `${ariaLabel}: ${shown}` : ariaLabel), "aria-describedby": field.describedBy, "aria-invalid": field.invalid, disabled: disabled, onClick: () => {
                            if (!open)
                                setOpened(opened + 1);
                            setOpen(!open);
                        }, children: [_jsx(CalendarDotsIcon, {}), shown ? _jsx("span", { children: shown }) : _jsx("span", { className: "pc-picker-placeholder", children: placeholder ?? (choice.range ? 'No dates' : 'No date') })] }), shown && !disabled && (_jsx(Button, { variant: "ghost", icon: _jsx(XIcon, {}), label: choice.range ? 'Clear dates' : 'Clear date', "data-pc-tooltip-side": "left", className: "pc-date-clear", onClick: () => {
                            clear();
                            button.current?.focus();
                        } })), _jsx("div", { className: "pc-popover-backdrop" }), _jsxs("div", { ref: panel, id: `${field.fieldId}-popover`, className: "pc-popover", role: "dialog", "aria-labelledby": label ? labelId : undefined, "aria-label": ariaLabel, hidden: !open, children: [choice.range ? (_jsx(Datepicker, { ...calendar, range: true, value: choice.value, onChange: choice.onChange }, opened)) : (_jsx(Datepicker, { ...calendar, value: choice.value, onChange: date => {
                                    choice.onChange(date);
                                    if (!choice.done)
                                        close();
                                }, quickPicks: choice.quickPicks }, opened)), (choice.range || choice.done) && (_jsxs("div", { className: "pc-dialog-actions", children: [_jsx(Button, { variant: "outline", onClick: () => {
                                            clear();
                                            // A range stays open to be picked again; one date is done.
                                            if (!choice.range)
                                                close();
                                        }, children: choice.range ? 'Clear' : 'Clear date' }), _jsx(Button, { variant: "primary", onClick: close, children: "Done" })] }))] }), name && (choice.range ? (_jsxs(_Fragment, { children: [_jsx("input", { type: "hidden", name: `${name}[start]`, value: iso(choice.value.start) }), _jsx("input", { type: "hidden", name: `${name}[end]`, value: iso(choice.value.end) })] })) : _jsx("input", { type: "hidden", name: name, value: iso(choice.value) }))] }), _jsx(FieldMessage, { id: field.messageId, hint: hint, error: error })] }));
}
