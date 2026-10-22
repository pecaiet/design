import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Minus, Plus } from '@phosphor-icons/react';
import { useRef, useState } from 'react';
import { cx } from './cx';
import { FieldMessage, useField } from './Field';
import { Label } from './Label';
/** A number to change a step at a time: "−", the number and "+" in one field. At the lowest value "−" is off; at the highest, "+".
 *  The buttons are for the pointer; with the keyboard the arrow keys change it, and typing a number works too. In a row it sits at
 *  the end, with an aria-label. */
export function Stepper({ label, hint, error, optional, id, className, onChange, ref, ...input }) {
    const own = useRef(null);
    const [typed, setTyped] = useState(() => String(input.defaultValue ?? ''));
    const field = useField(id, error || hint, error, input['aria-describedby']);
    const current = Number(input.value ?? typed);
    const wrapped = Boolean(label || hint || error);
    const step = (up) => {
        const element = own.current;
        if (!element)
            return;
        if (up)
            element.stepUp();
        else
            element.stepDown();
        // stepUp() changes the value without an input event: send one, so onChange runs as if the number was typed.
        element.dispatchEvent(new Event('input', { bubbles: true }));
    };
    const stepper = (_jsxs("div", { className: cx('pc-stepper', !wrapped && className), children: [_jsx("button", { type: "button", tabIndex: -1, "aria-label": "Fewer", disabled: input.disabled || (input.min !== undefined && current <= input.min), onClick: () => step(false), children: _jsx(Minus, {}) }), _jsx("input", { ...input, ref: element => {
                    own.current = element;
                    if (typeof ref === 'function')
                        ref(element);
                    else if (ref)
                        ref.current = element;
                }, type: "number", id: field.fieldId, "aria-describedby": field.describedBy, "aria-invalid": field.invalid ?? input['aria-invalid'], onChange: event => {
                    setTyped(event.target.value);
                    onChange?.(event);
                } }), _jsx("button", { type: "button", tabIndex: -1, "aria-label": "More", disabled: input.disabled || (input.max !== undefined && current >= input.max), onClick: () => step(true), children: _jsx(Plus, {}) })] }));
    if (!wrapped)
        return stepper;
    return (_jsxs("div", { className: cx('pc-field', className), children: [label && _jsx(Label, { htmlFor: field.fieldId, optional: optional, children: label }), stepper, _jsx(FieldMessage, { id: field.messageId, hint: hint, error: error })] }));
}
