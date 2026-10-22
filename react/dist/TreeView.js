import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { router } from '@inertiajs/react';
import { CaretRight } from '@phosphor-icons/react';
import { useRef, useState } from 'react';
import { cx } from './cx';
import { leave } from './motion';
import { assign } from './popup';
/** Things inside things (folders of lists) as sidebar rows that open and close, each level 24px further in. Up and Down move,
 *  Right opens or goes in, Left closes or goes back to its folder, Home and End, Enter chooses. */
export function TreeView({ label, items, expanded, defaultExpanded = [], onExpandedChange, onSelect, className, ref, ...ul }) {
    const [own, setOwn] = useState(defaultExpanded);
    const [focused, setFocused] = useState();
    const list = useRef(null);
    const open = expanded ?? own;
    const rows = [];
    const walk = (level, children) => children.forEach((item, i) => {
        rows.push({ item, level, size: children.length, position: i + 1 });
        if (item.children?.length && open.includes(item.id))
            walk(level + 1, item.children);
    });
    walk(1, items);
    const tabbable = rows.find(row => row.item.id === focused) ?? rows.find(row => row.item.current) ?? rows[0];
    const element = (index) => list.current?.children[index];
    const toggle = async (index) => {
        const { item, level } = rows[index];
        const opening = !open.includes(item.id);
        if (!opening) {
            // Its rows shrink out first, the rows below gliding up; opening, pecaiet.js grows the new rows in by itself.
            const inside = [];
            for (let i = index + 1; i < rows.length && rows[i].level > level; i++)
                inside.push(leave(element(i) ?? null));
            await Promise.all(inside);
        }
        const next = opening ? [...open, item.id] : open.filter(id => id !== item.id);
        if (expanded === undefined)
            setOwn(next);
        onExpandedChange?.(next);
    };
    const choose = (index) => {
        const { item } = rows[index];
        if (item.href)
            router.visit(item.href);
        else if (onSelect)
            onSelect(item);
        else if (item.children?.length)
            toggle(index);
    };
    const keys = (event) => {
        const at = rows.findIndex((_, i) => element(i) === document.activeElement);
        if (at < 0)
            return;
        const { item, level } = rows[at];
        const opens = Boolean(item.children?.length);
        const isOpen = opens && open.includes(item.id);
        if (event.key === 'ArrowDown')
            element(at + 1)?.focus();
        else if (event.key === 'ArrowUp')
            element(at - 1)?.focus();
        else if (event.key === 'Home')
            element(0)?.focus();
        else if (event.key === 'End')
            element(rows.length - 1)?.focus();
        else if (event.key === 'ArrowRight' && opens) {
            if (isOpen)
                element(at + 1)?.focus();
            else
                toggle(at);
        }
        else if (event.key === 'ArrowLeft') {
            if (isOpen)
                toggle(at);
            else
                element(rows.findLastIndex((row, i) => i < at && row.level < level))?.focus();
        }
        else if (event.key === 'Enter')
            choose(at);
        else
            return;
        event.preventDefault();
    };
    return (_jsx("ul", { ...ul, ref: node => {
            list.current = node;
            assign(ref, node);
        }, className: cx('pc-tree', className), role: "tree", "aria-label": label, onKeyDown: keys, children: rows.map((row, index) => {
            const opens = Boolean(row.item.children?.length);
            return (_jsxs("li", { className: "pc-tree-item", role: "treeitem", "aria-level": row.level, "aria-setsize": row.size, "aria-posinset": row.position, "aria-expanded": opens ? open.includes(row.item.id) : undefined, "aria-current": row.item.current ? 'page' : undefined, tabIndex: row === tabbable ? 0 : -1, onFocus: () => setFocused(row.item.id), onClick: event => {
                    if (opens && event.target.closest('.pc-tree-caret'))
                        toggle(index);
                    else
                        choose(index);
                }, children: [opens ? _jsx("span", { className: "pc-tree-caret", children: _jsx(CaretRight, {}) }) : row.level === 1 && _jsx("span", { className: "pc-tree-caret" }), row.item.icon, _jsx("span", { className: "pc-tree-label", children: row.item.label }), row.item.count !== undefined && _jsx("span", { className: "pc-tree-count", children: row.item.count })] }, row.item.id));
        }) }));
}
