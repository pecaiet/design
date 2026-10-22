import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cx } from './cx';
import { FieldMessage, useField } from './Field';
/** A switch for a setting that takes effect straight away, with no Save button. Something saved with the form's Save is a
 *  Checkbox. */
export function Toggle({ label, hint, error, id, className, ...input }) {
    const field = useField(id, error || hint, error, input['aria-describedby']);
    const toggle = (_jsx("input", { ...input, className: cx('pc-switch', !label && className), type: "checkbox", role: "switch", id: field.fieldId, "aria-describedby": field.describedBy, "aria-invalid": field.invalid ?? input['aria-invalid'] }));
    if (!label)
        return toggle;
    return (_jsxs("div", { className: cx('pc-field', className), children: [_jsxs("label", { className: "pc-check", htmlFor: field.fieldId, children: [toggle, _jsx("span", { children: label })] }), _jsx(FieldMessage, { id: field.messageId, hint: hint, error: error })] }));
}
