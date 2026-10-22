import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Paperclip } from '@phosphor-icons/react';
import { Children } from 'react';
import { cx } from './cx';
import { FieldMessage, useField } from './Field';
/** An outline button that opens the device's file picker: add multiple for more than one file and accept for the kinds allowed.
 *  The chosen files come in onChange (event.target.files). No drop area for now. */
export function FileUpload({ label, hint, error, optional, buttonLabel, children, id, className, ...input }) {
    const field = useField(id, error || hint, error, input['aria-describedby']);
    return (_jsxs("div", { className: cx('pc-field', className), children: [label && (_jsxs("span", { className: "pc-label", children: [label, optional && _jsxs(_Fragment, { children: [" ", _jsx("span", { className: "pc-label-optional", children: "(optional)" })] })] })), _jsxs("label", { className: "pc-btn pc-btn-outline pc-file-upload", htmlFor: field.fieldId, children: [_jsx(Paperclip, {}), buttonLabel ?? (input.multiple ? 'Attach files' : 'Attach file'), _jsx("input", { ...input, type: "file", id: field.fieldId, "aria-describedby": field.describedBy, "aria-invalid": field.invalid ?? input['aria-invalid'] })] }), _jsx(FieldMessage, { id: field.messageId, hint: hint, error: error }), Children.toArray(children).length > 0 && _jsx("div", { className: "pc-files", children: children })] }));
}
