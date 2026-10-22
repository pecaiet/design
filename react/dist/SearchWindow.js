import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link as InertiaLink, router } from '@inertiajs/react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { Fragment, useEffect, useId, useState } from 'react';
import { Button } from './Button';
import { cx } from './cx';
import { EmptyState } from './EmptyState';
import { Dialog } from './Modal';
import { Spinner } from './Spinner';
// The words that match, in semibold.
function highlight(text, query) {
    const words = query.trim().toLocaleLowerCase();
    if (!words)
        return text;
    const lower = text.toLocaleLowerCase();
    const parts = [];
    let from = 0;
    for (let at = lower.indexOf(words); at >= 0; at = lower.indexOf(words, from)) {
        parts.push(text.slice(from, at), _jsx("mark", { className: "pc-search-match", children: text.slice(at, at + words.length) }, at));
        from = at + words.length;
    }
    parts.push(text.slice(from));
    return parts;
}
/** The search window over everything (⌘K): the field on top, the results grouped under it, the highlighted one opened by Enter.
 *  Focus stays in the field; Up and Down move the highlight. On phones it fills the screen, with Cancel at the field's end. */
export function SearchWindow({ open, onClose, query, onQueryChange, placeholder, groups, busy, empty, keys = true, onSelect, className }) {
    const id = useId();
    const [active, setActive] = useState(0);
    const results = groups.flatMap(group => group.results);
    const current = results[Math.min(active, results.length - 1)];
    useEffect(() => {
        if (current)
            document.getElementById(`${id}-${current.id}`)?.scrollIntoView({ block: 'nearest' });
    }, [current?.id]);
    const choose = (result) => {
        if (result.href)
            router.visit(result.href);
        onSelect?.(result);
        onClose();
    };
    return (_jsxs(Dialog, { kind: "dialog", open: open, onClose: onClose, className: cx('pc-search', className), "aria-label": "Search", children: [_jsxs("div", { className: "pc-search-field", children: [_jsx(MagnifyingGlass, {}), _jsx("input", { type: "search", value: query, placeholder: placeholder, "aria-label": placeholder, role: "combobox", "aria-expanded": results.length > 0, "aria-controls": `${id}-results`, "aria-autocomplete": "list", "aria-activedescendant": current ? `${id}-${current.id}` : undefined, onChange: event => {
                            setActive(0);
                            onQueryChange(event.target.value);
                        }, onKeyDown: event => {
                            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                                event.preventDefault();
                                const at = results.indexOf(current);
                                setActive(Math.max(0, Math.min(results.length - 1, at + (event.key === 'ArrowDown' ? 1 : -1))));
                            }
                            else if (event.key === 'Enter' && current) {
                                event.preventDefault();
                                choose(current);
                            }
                        } }), busy && _jsx(Spinner, { label: "Searching" }), _jsx(Button, { variant: "ghost", className: "pc-search-cancel", onClick: onClose, children: "Cancel" })] }), results.length > 0 && (_jsx("div", { className: "pc-search-results", role: "listbox", id: `${id}-results`, "aria-label": placeholder, children: groups.map((group, g) => group.results.length > 0 && (_jsxs(Fragment, { children: [_jsxs("div", { className: "pc-search-group", children: [group.label, group.count !== undefined && _jsx("span", { className: "pc-search-count", children: group.count }), group.action && _jsx("button", { className: "pc-search-group-action", type: "button", onClick: group.action.onClick, children: group.action.label })] }), group.results.map(result => {
                            const row = {
                                id: `${id}-${result.id}`,
                                className: 'pc-search-result',
                                role: 'option',
                                tabIndex: -1,
                                'aria-selected': result === current || undefined,
                                'data-done': result.done ? '' : undefined,
                                onMouseMove: () => setActive(results.indexOf(result)),
                            };
                            const inside = (_jsxs(_Fragment, { children: [result.icon, _jsx("span", { className: "pc-search-title", children: typeof result.title === 'string' ? highlight(result.title, query) : result.title }), result.place && _jsxs("span", { className: "pc-search-place", children: [result.placeIcon, _jsx("span", { children: result.place })] })] }));
                            return result.href ? (_jsx(InertiaLink, { ...row, href: result.href, onClick: () => {
                                    onSelect?.(result);
                                    onClose();
                                }, children: inside }, result.id)) : (_jsx("div", { ...row, onClick: () => choose(result), children: inside }, result.id));
                        })] }, g))) })), !results.length && query.trim() && !busy && empty && _jsx(EmptyState, { title: empty.title, description: empty.description }), keys && results.length > 0 && (_jsxs("div", { className: "pc-search-footer", children: [_jsxs("span", { children: [_jsx("span", { className: "pc-kbd", children: "\u2191" }), " ", _jsx("span", { className: "pc-kbd", children: "\u2193" }), " to move"] }), _jsxs("span", { children: [_jsx("span", { className: "pc-kbd", children: "Enter" }), " to open"] }), _jsxs("span", { children: [_jsx("span", { className: "pc-kbd", children: "Esc" }), " to close"] })] }))] }));
}
