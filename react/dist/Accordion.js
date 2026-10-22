import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CaretDown } from '@phosphor-icons/react';
import { createContext, useContext, useId } from 'react';
import { cx } from './cx';
const Name = createContext(undefined);
/** Questions or sections that open to show more, one under another: FAQs and optional detail, never something needed to finish a
 *  task. The browser opens and closes them (Enter and Space too); with pecaiet.js the answer grows open and the rest glide. */
export function Accordion({ single, className, ...div }) {
    const name = useId();
    return (_jsx(Name, { value: single ? name : undefined, children: _jsx("div", { ...div, className: cx('pc-accordion', className) }) }));
}
export function AccordionItem({ summary, children, open, onOpenChange, disabled, className, ...details }) {
    const name = useContext(Name);
    return (_jsxs("details", { name: name, ...details, className: cx('pc-accordion-item', className), open: open, "aria-disabled": disabled || undefined, onToggle: event => onOpenChange?.(event.currentTarget.open), children: [_jsxs("summary", { tabIndex: disabled ? -1 : undefined, onClick: disabled ? event => event.preventDefault() : undefined, children: [summary, _jsx(CaretDown, {})] }), !disabled && _jsx("div", { className: "pc-accordion-content", children: children })] }));
}
