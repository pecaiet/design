import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { cx } from './cx';
import { FieldMessage, useField } from './Field';
import { Label } from './Label';
export function Textarea({ label, hint, error, optional, limit, id, className, onChange, ...textarea }) {
    const [typed, setTyped] = useState(() => String(textarea.defaultValue ?? '').length);
    const length = textarea.value === undefined ? typed : String(textarea.value).length;
    const over = limit !== undefined && length > limit;
    const field = useField(id, error || hint, error || over, textarea['aria-describedby']);
    const countId = `${field.fieldId}-count`;
    return (_jsxs("div", { className: cx('pc-field', className), children: [label && _jsx(Label, { htmlFor: field.fieldId, optional: optional, children: label }), _jsx("textarea", { ...textarea, className: "pc-textarea", id: field.fieldId, "aria-describedby": cx(field.describedBy, limit !== undefined && countId) || undefined, "aria-invalid": field.invalid ?? textarea['aria-invalid'], onChange: event => {
                    setTyped(event.target.value.length);
                    onChange?.(event);
                } }), limit !== undefined && (_jsxs("span", { className: "pc-field-count", id: countId, "data-state": over ? 'over' : undefined, children: [length, " / ", limit] })), _jsx(FieldMessage, { id: field.messageId, hint: hint, error: error })] }));
}
