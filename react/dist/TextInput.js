import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cx } from './cx';
import { FieldMessage, useField } from './Field';
import { Label } from './Label';
export function TextInput({ label, hint, error, optional, id, className, ...input }) {
    const field = useField(id, error || hint, error, input['aria-describedby']);
    return (_jsxs("div", { className: cx('pc-field', className), children: [label && _jsx(Label, { htmlFor: field.fieldId, optional: optional, children: label }), _jsx("input", { ...input, className: "pc-input", id: field.fieldId, "aria-describedby": field.describedBy, "aria-invalid": field.invalid ?? input['aria-invalid'] }), _jsx(FieldMessage, { id: field.messageId, hint: hint, error: error })] }));
}
