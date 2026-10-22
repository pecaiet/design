import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link as InertiaLink } from '@inertiajs/react';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import { cx } from './cx';
import { EmptyState } from './EmptyState';
/** Rows of records, usually in a Card's content with rows. Write the thead and tbody; a row's cells are Td, TableCheck first and
 *  TableActions last. A picked row has aria-selected="true". */
export function Table({ className, ...table }) {
    return _jsx("table", { ...table, className: cx('pc-table', className) });
}
export function Th({ num, onSort, sort, children, className, ...th }) {
    return (_jsx("th", { ...th, className: cx(num && 'pc-table-num', className) || undefined, "aria-sort": sort, children: onSort ? (_jsxs("button", { className: "pc-table-sort", type: "button", onClick: onSort, children: [children, sort === 'ascending' && _jsx(CaretUp, {}), sort === 'descending' && _jsx(CaretDown, {})] })) : children }));
}
export function Td({ num, muted, className, ...td }) {
    return _jsx("td", { ...td, className: cx(num && 'pc-table-num', muted && 'pc-muted', className) || undefined });
}
/** On a row's main cell: the whole row opens the record, and keyboard users tab to it. Checkboxes and buttons in the row stay clickable. */
export function RowLink({ className, ...link }) {
    return _jsx(InertiaLink, { ...link, className: cx('pc-row-link', className) });
}
/** The first column, for picking rows: a checkbox in each row and one in the header for all. */
export function TableCheck({ header, indeterminate, className, ref, ...input }) {
    const Cell = header ? 'th' : 'td';
    return (_jsx(Cell, { className: cx('pc-table-check', className), children: _jsx("input", { ...input, ref: element => {
                // Half can only be set from script.
                if (element)
                    element.indeterminate = Boolean(indeterminate);
                if (typeof ref === 'function')
                    ref(element);
                else if (ref)
                    ref.current = element;
            }, className: "pc-checkbox", type: "checkbox" }) }));
}
/** The last column: a row's own actions. */
export function TableActions({ header, children, className, ...cell }) {
    if (header) {
        return (_jsx("th", { ...cell, className: cx('pc-table-actions', className), children: _jsx("span", { className: "pc-visually-hidden", children: "Actions" }) }));
    }
    return _jsx("td", { ...cell, className: cx('pc-table-actions', className), children: children });
}
/** The one row of a table with nothing in it: say what will appear. */
export function TableEmpty({ columns, className, ...empty }) {
    return (_jsx("tr", { className: className, children: _jsx("td", { colSpan: columns, children: _jsx(EmptyState, { ...empty }) }) }));
}
