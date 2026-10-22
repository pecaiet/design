import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { useRef, useState } from 'react';
import { Button } from './Button';
import { cx } from './cx';
import { Spinner } from './Spinner';
/** Filtering a table or a list on a page, as people type. Once there's text an x clears it (onChange gets the empty value, as
 *  when they delete it). Say how many match near it; nothing matches is an EmptyState that repeats the words. */
export function SearchInput({ busy, placeholder, onChange, className, ref, ...input }) {
    const own = useRef(null);
    const [typed, setTyped] = useState(() => String(input.defaultValue ?? ''));
    const text = input.value === undefined ? typed : String(input.value);
    const clear = () => {
        const element = own.current;
        if (!element)
            return;
        // As the browser's own x does: empty it, then an input event, so React calls onChange whether the field is controlled or not.
        Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(element, '');
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.focus();
    };
    return (_jsxs("div", { className: cx('pc-input-group', className), role: "search", children: [_jsx(MagnifyingGlass, {}), _jsx("input", { ...input, ref: element => {
                    own.current = element;
                    if (typeof ref === 'function')
                        ref(element);
                    else if (ref)
                        ref.current = element;
                }, className: "pc-input", type: "search", placeholder: placeholder ?? input['aria-label'], onChange: event => {
                    setTyped(event.target.value);
                    onChange?.(event);
                } }), (busy || text) && (_jsx("span", { className: "pc-input-group-end", children: busy ? _jsx(Spinner, { label: "Searching" }) : _jsx(Button, { variant: "ghost", icon: _jsx(X, {}), label: "Clear search", onClick: clear }) }))] }));
}
