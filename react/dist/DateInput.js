import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CalendarDots, X } from '@phosphor-icons/react';
import { useRef, useState } from 'react';
import { Button } from './Button';
import { cx } from './cx';
import { Datepicker } from './Datepicker';
import { FieldMessage, useField } from './Field';
import { useOutside } from './popup';
/** A date in a form: a button that looks like a field and opens the Datepicker under it (a sheet on phones). No typing. Picking a
 *  day fills it, closes it and puts focus back on the button; Esc closes it without a change; the x clears it. */
export function DateInput({ label, 'aria-label': ariaLabel, value, onChange, placeholder = 'No date', done, quickPicks, children, min, max, disabledDays, format, locale, name, hint, error, optional, disabled, id, className, }) {
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
    const shown = value && (format ? format(value) : `${new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(value)}, ${new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'short',
        year: value.getFullYear() === new Date().getFullYear() ? undefined : 'numeric',
    }).format(value)}`);
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
                        }, children: [_jsx(CalendarDots, {}), shown ? _jsx("span", { children: shown }) : _jsx("span", { className: "pc-picker-placeholder", children: placeholder })] }), value && !disabled && (_jsx(Button, { variant: "ghost", icon: _jsx(X, {}), label: "Clear date", className: "pc-date-clear", onClick: () => {
                            onChange(null);
                            button.current?.focus();
                        } })), _jsx("div", { className: "pc-popover-backdrop" }), _jsxs("div", { ref: panel, id: `${field.fieldId}-popover`, className: "pc-popover", role: "dialog", "aria-labelledby": label ? labelId : undefined, "aria-label": ariaLabel, hidden: !open, children: [_jsx(Datepicker, { value: value, onChange: date => {
                                    onChange(date);
                                    if (!done)
                                        close();
                                }, quickPicks: quickPicks, min: min, max: max, disabledDays: disabledDays, locale: locale, autoFocus: open, children: children }, opened), done && (_jsxs("div", { className: "pc-dialog-actions", children: [_jsx(Button, { variant: "outline", onClick: () => {
                                            onChange(null);
                                            close();
                                        }, children: "Clear date" }), _jsx(Button, { variant: "primary", onClick: close, children: "Done" })] }))] }), name && (_jsx("input", { type: "hidden", name: name, value: value ? `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}` : '' }))] }), _jsx(FieldMessage, { id: field.messageId, hint: hint, error: error })] }));
}
