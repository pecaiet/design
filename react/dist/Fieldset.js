import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext } from 'react';
import { cx } from './cx';
import { FieldMessage, useField } from './Field';
/** A Fieldset with an error: its RadioButtons take aria-invalid, so their circles turn red. */
export const FieldsetContext = createContext({});
/** A caption over a group of related choices. Bigger sections of a form are Cards. */
export function Fieldset({ legend, layout, error, id, children, className, ...fieldset }) {
    const field = useField(id, error, error, fieldset['aria-describedby']);
    return (_jsxs("fieldset", { ...fieldset, className: cx('pc-fieldset', className), id: id, "aria-describedby": field.describedBy, children: [_jsx("legend", { className: "pc-legend", children: legend }), _jsx("div", { className: cx('pc-fieldset-options', layout === 'row' && 'pc-fieldset-options-row', layout === 'boxes' && 'pc-fieldset-boxes'), children: _jsx(FieldsetContext, { value: { invalid: field.invalid }, children: children }) }), _jsx(FieldMessage, { id: field.messageId, error: error })] }));
}
