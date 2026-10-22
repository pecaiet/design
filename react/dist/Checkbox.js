import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cx } from './cx';
import { FieldMessage, useField } from './Field';
export function Checkbox({ label, hint, error, indeterminate, id, className, ref, ...input }) {
    const field = useField(id, error || hint, error, input['aria-describedby']);
    return (_jsxs("div", { className: cx('pc-field', className), children: [_jsxs("label", { className: "pc-check", htmlFor: field.fieldId, children: [_jsx("input", { ...input, ref: element => {
                            // Half can only be set from script.
                            if (element)
                                element.indeterminate = Boolean(indeterminate);
                            if (typeof ref === 'function')
                                ref(element);
                            else if (ref)
                                ref.current = element;
                        }, className: "pc-checkbox", type: "checkbox", id: field.fieldId, "aria-describedby": field.describedBy, "aria-invalid": field.invalid ?? input['aria-invalid'] }), _jsx("span", { children: label })] }), _jsx(FieldMessage, { id: field.messageId, hint: hint, error: error })] }));
}
