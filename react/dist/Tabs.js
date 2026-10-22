import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link as InertiaLink } from '@inertiajs/react';
import { createContext, useContext, useEffect, useId, useRef } from 'react';
import { cx } from './cx';
// When the tabs don't fit (a phone) the row scrolls sideways: keep the current one in view, without scrolling the page.
const keepInView = (row) => {
    const tab = row?.querySelector(':scope > [aria-selected="true"], :scope > [aria-current="page"]');
    if (!row || !tab)
        return;
    if (tab.offsetLeft < row.scrollLeft)
        row.scrollLeft = tab.offsetLeft;
    else if (tab.offsetLeft + tab.offsetWidth > row.scrollLeft + row.clientWidth)
        row.scrollLeft = tab.offsetLeft + tab.offsetWidth - row.clientWidth;
};
const Chosen = createContext(null);
/** Switching between parts of one page: words over a line, the current one with a teal line under it (it slides there with
 *  pecaiet.js). Only the current tab is in the Tab order; the arrow keys, Home and End move between tabs and show their part. */
export function Tabs({ label, tabs, value, onChange, children, className, ...div }) {
    const id = useId();
    const row = useRef(null);
    useEffect(() => keepInView(row.current), [value]);
    const keys = (event) => {
        const open = tabs.filter(tab => !tab.disabled);
        const at = open.findIndex(tab => tab.value === value);
        const to = event.key === 'ArrowRight' ? at + 1 : event.key === 'ArrowLeft' ? at - 1 : event.key === 'Home' ? 0 : event.key === 'End' ? open.length - 1 : undefined;
        if (to === undefined || !open.length)
            return;
        event.preventDefault();
        const next = open[(to + open.length) % open.length];
        row.current?.querySelectorAll('[role="tab"]')[tabs.indexOf(next)]?.focus();
        onChange(next.value);
    };
    return (_jsxs(Chosen, { value: { id, value, values: tabs.map(tab => tab.value) }, children: [_jsx("div", { ...div, ref: row, className: cx('pc-tabs', className), role: "tablist", "aria-label": label, onKeyDown: keys, children: tabs.map((tab, i) => {
                    const selected = tab.value === value;
                    return (_jsxs("button", { id: `${id}-tab-${i}`, className: "pc-tab", role: "tab", type: "button", "aria-selected": selected, "aria-controls": `${id}-panel-${i}`, tabIndex: selected ? 0 : -1, disabled: tab.disabled, onClick: () => onChange(tab.value), children: [tab.icon, tab.label, tab.count !== undefined && _jsx("span", { className: "pc-tab-count", children: tab.count })] }, tab.value));
                }) }), children] }));
}
/** One tab's part: shown while its tab is the current one (it fades in), hidden otherwise. */
export function TabPanel({ value, className, ...div }) {
    const chosen = useContext(Chosen);
    const i = chosen?.values.indexOf(value) ?? -1;
    return (_jsx("div", { tabIndex: 0, ...div, className: cx('pc-tab-panel', className), role: "tabpanel", id: `${chosen?.id}-panel-${i}`, "aria-labelledby": `${chosen?.id}-tab-${i}`, hidden: chosen?.value !== value }));
}
/** Tabs whose parts each have their own address: Inertia links, the page you're on marked current. */
export function TabLinks({ label, tabs, className, ...nav }) {
    const row = useRef(null);
    useEffect(() => keepInView(row.current), [tabs.findIndex(tab => tab.current)]);
    return (_jsx("nav", { ...nav, ref: row, className: cx('pc-tabs', className), "aria-label": label, children: tabs.map(tab => (_jsxs(InertiaLink, { href: tab.href, className: "pc-tab", "aria-current": tab.current ? 'page' : undefined, children: [tab.icon, tab.label, tab.count !== undefined && _jsx("span", { className: "pc-tab-count", children: tab.count })] }, tab.href))) }));
}
