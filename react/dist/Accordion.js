import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CaretDownIcon } from '@phosphor-icons/react';
import { createContext, useContext, useEffect, useId, useRef, useState } from 'react';
import { cx } from './cx';
import { assign } from './popup';
const Name = createContext(undefined);
/** Questions or sections that open to show more, one under another: FAQs and optional detail, never something needed to finish a
 *  task. The browser opens and closes them (Enter and Space too); with pecaiet.js the answer grows open and the rest glide. */
export function Accordion({ single, className, ...div }) {
    const name = useId();
    return (_jsx(Name, { value: single ? name : undefined, children: _jsx("div", { ...div, className: cx('pc-accordion', className) }) }));
}
export function AccordionItem({ summary, children, open, onOpenChange, disabled, className, ref, ...details }) {
    const name = useContext(Name);
    // React sets open only at first; a later change from the app plays as a press on the question, so pecaiet.js grows or shrinks it.
    const [first] = useState(open);
    const own = useRef(null);
    useEffect(() => {
        if (open !== undefined && own.current && own.current.open !== open)
            own.current.querySelector('summary')?.click();
    }, [open]);
    return (_jsxs("details", { name: name, ...details, ref: node => {
            own.current = node;
            assign(ref, node);
        }, className: cx('pc-accordion-item', className), open: first, "aria-disabled": disabled || undefined, onToggle: event => onOpenChange?.(event.currentTarget.open), children: [_jsxs("summary", { tabIndex: disabled ? -1 : undefined, onClick: disabled ? event => event.preventDefault() : undefined, children: [summary, _jsx(CaretDownIcon, {})] }), !disabled && _jsx("div", { className: "pc-accordion-content", children: children })] }));
}
