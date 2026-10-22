import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, Copy, Eye, EyeSlash } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { cx } from './cx';
import { FieldMessage, useField } from './Field';
import { Label } from './Label';
/** A text field with something inside it. Without a label, hint or error it's the bare group, ready for an InputRow. */
export function InputGroup({ label, hint, error, optional, mono, icon, end, before, after, id, className, ...input }) {
    const field = useField(id, error || hint, error, input['aria-describedby']);
    const wrapped = Boolean(label || hint || error);
    const group = (_jsxs("div", { className: cx('pc-input-group', !wrapped && className), children: [icon, before && _jsx("span", { className: "pc-input-addon", children: before }), _jsx("input", { ...input, className: cx('pc-input', mono && 'pc-input-mono'), id: field.fieldId, "aria-describedby": field.describedBy, "aria-invalid": field.invalid ?? input['aria-invalid'] }), after && _jsx("span", { className: "pc-input-addon", children: after }), end && _jsx("span", { className: "pc-input-group-end", children: end })] }));
    if (!wrapped)
        return group;
    return (_jsxs("div", { className: cx('pc-field', className), children: [label && _jsx(Label, { htmlFor: field.fieldId, optional: optional, children: label }), group, _jsx(FieldMessage, { id: field.messageId, hint: hint, error: error })] }));
}
/** A password with the eye at its end: it shows the password, and the eye with a slash hides it again. */
export function PasswordInput(props) {
    const [shown, setShown] = useState(false);
    return (_jsx(InputGroup, { ...props, type: shown ? 'text' : 'password', end: _jsx(Button, { variant: "ghost", icon: shown ? _jsx(EyeSlash, {}) : _jsx(Eye, {}), label: shown ? 'Hide password' : 'Show password', onClick: () => setShown(!shown) }) }));
}
/** A read-only value (the muted fill, no border) with a copy button at its end. After a click its icon turns into a tick and
 *  its tooltip says "Copied" for two seconds. No toast. */
export function CopyInput({ copyLabel, value, ...props }) {
    const [copied, setCopied] = useState(false);
    const timer = useRef(undefined);
    useEffect(() => () => window.clearTimeout(timer.current), []);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value);
        }
        catch {
            return;
        }
        setCopied(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), 2000);
    };
    return (_jsx(InputGroup, { ...props, value: value, readOnly: true, end: _jsx(Button, { variant: "ghost", icon: copied ? _jsx(Check, {}) : _jsx(Copy, {}), label: copied ? 'Copied' : copyLabel, onClick: copy }) }));
}
/** A field and its button side by side (Invite, Add), 8px apart, each its own shape. The field takes the room: a bare InputGroup or
 *  SearchInput (no label, hint or error). */
export function InputRow({ className, ...div }) {
    return _jsx("div", { ...div, className: cx('pc-input-row', className) });
}
