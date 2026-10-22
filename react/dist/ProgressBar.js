import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cx } from './cx';
import { FieldMessage, useField } from './Field';
/** How far a long task has got. label is what's happening, over the bar: "Uploading Contract draft.pdf". For steps someone goes
 *  through, a ProgressIndicator; for a short wait with nothing to measure, a Spinner. */
export function ProgressBar({ label, value, error, small, id, className, ...div }) {
    const field = useField(id, error, error, div['aria-describedby']);
    const labelId = `${field.fieldId}-label`;
    const known = value !== undefined;
    const bar = (_jsx("div", { ...div, className: cx('pc-progress', error && 'pc-progress-error', small && 'pc-progress-small', !label && !error && className), id: id, role: "progressbar", "aria-valuenow": value, "aria-valuemin": known ? 0 : undefined, "aria-valuemax": known ? 100 : undefined, "aria-labelledby": label ? labelId : undefined, "aria-describedby": field.describedBy, children: _jsx("span", { className: "pc-progress-fill", style: known ? { width: `${value}%` } : undefined }) }));
    if (!label && !error)
        return bar;
    return (_jsxs("div", { className: cx('pc-field', className), children: [label && (_jsxs("div", { className: "pc-progress-head", children: [_jsx("span", { id: labelId, children: label }), known && _jsxs("span", { className: "pc-progress-value", children: [Math.round(value), "%"] })] })), bar, _jsx(FieldMessage, { id: field.messageId, error: error })] }));
}
