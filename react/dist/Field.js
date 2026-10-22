import { jsx as _jsx } from "react/jsx-runtime";
import { useId } from 'react';
/** Ids that tie a field to its label and to its hint or error (aria-describedby), and aria-invalid when there's an error. */
export function useField(id, message, error, ...describedBy) {
    const auto = useId();
    const fieldId = id ?? auto;
    const messageId = `${fieldId}-message`;
    return {
        fieldId,
        messageId,
        describedBy: [message ? messageId : undefined, ...describedBy].filter(Boolean).join(' ') || undefined,
        invalid: error ? true : undefined,
    };
}
/** The error under a field, or its hint when there's no error. */
export function FieldMessage({ id, hint, error }) {
    if (error)
        return _jsx("p", { className: "pc-field-error", id: id, children: error });
    if (hint)
        return _jsx("p", { className: "pc-field-hint", id: id, children: hint });
    return null;
}
