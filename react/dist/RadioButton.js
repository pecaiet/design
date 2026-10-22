import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import { cx } from './cx';
import { FieldMessage, useField } from './Field';
import { FieldsetContext } from './Fieldset';
/** One of two to five choices that are all in view, in a Fieldset, every radio of the group with the same name. One is chosen
 *  to start with, unless the choice has to be made on purpose. More choices go in a Select; a view chosen right away is a
 *  SegmentedControl. */
export function RadioButton({ label, hint, id, className, ...input }) {
    const group = useContext(FieldsetContext);
    const field = useField(id, hint, undefined, input['aria-describedby']);
    return (_jsxs("div", { className: cx('pc-field', className), children: [_jsxs("label", { className: "pc-check", htmlFor: field.fieldId, children: [_jsx("input", { ...input, className: "pc-radio", type: "radio", id: field.fieldId, "aria-describedby": field.describedBy, "aria-invalid": group.invalid ?? input['aria-invalid'] }), _jsx("span", { children: label })] }), _jsx(FieldMessage, { id: field.messageId, hint: hint })] }));
}
