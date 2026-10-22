import { type InertiaLinkProps } from '@inertiajs/react';
import type { ComponentPropsWithRef, HTMLAttributes, ReactNode } from 'react';
import { type EmptyStateProps } from './EmptyState';
export type TableProps = ComponentPropsWithRef<'table'>;
/** Rows of records, usually in a Card's content with rows. Write the thead and tbody; a row's cells are Td, TableCheck first and
 *  TableActions last. A picked row has aria-selected="true". */
export declare function Table({ className, ...table }: TableProps): import("react").JSX.Element;
export type ThProps = Omit<ComponentPropsWithRef<'th'>, 'aria-sort'> & {
    /** A column of numbers: its header on the right too. */
    num?: boolean;
} & ({
    onSort?: never;
    sort?: never;
}
/** A column people can sort: its name is a button. sort is how it's sorted now, one column at a time: ascending A to Z
 *  (caret up), descending Z to A (caret down). */
 | {
    onSort: () => void;
    sort?: 'ascending' | 'descending';
});
export declare function Th({ num, onSort, sort, children, className, ...th }: ThProps): import("react").JSX.Element;
export type TdProps = ComponentPropsWithRef<'td'> & {
    /** Numbers: on the right, in even-width figures. */
    num?: boolean;
    /** Dates and other quiet values. */
    muted?: boolean;
};
export declare function Td({ num, muted, className, ...td }: TdProps): import("react").JSX.Element;
export type RowLinkProps = Omit<InertiaLinkProps, 'children'> & {
    href: string;
    children: ReactNode;
};
/** On a row's main cell: the whole row opens the record, and keyboard users tab to it. Checkboxes and buttons in the row stay clickable. */
export declare function RowLink({ className, ...link }: RowLinkProps): import("react").JSX.Element;
export type TableCheckProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'children'> & {
    /** Which row: "Select ana@example.com"; in the header, "Select all". */
    'aria-label': string;
    /** In the header row: picks every row. */
    header?: boolean;
    /** Half, in the header, when only some rows are picked. */
    indeterminate?: boolean;
};
/** The first column, for picking rows: a checkbox in each row and one in the header for all. */
export declare function TableCheck({ header, indeterminate, className, ref, ...input }: TableCheckProps): import("react").JSX.Element;
export type TableActionsProps = Omit<HTMLAttributes<HTMLTableCellElement>, 'children'> & (
/** The row's ⋯ menu: a ghost icon button with an aria-label ("More for ana@example.com") and aria-haspopup="menu". */
{
    children: ReactNode;
    header?: never;
}
/** The header cell over them, named for screen readers only. */
 | {
    header: true;
    children?: never;
});
/** The last column: a row's own actions. */
export declare function TableActions({ header, children, className, ...cell }: TableActionsProps): import("react").JSX.Element;
export type TableEmptyProps = EmptyStateProps & {
    /** How many columns the table has: the one cell spans them all. */
    columns: number;
};
/** The one row of a table with nothing in it: say what will appear. */
export declare function TableEmpty({ columns, className, ...empty }: TableEmptyProps): import("react").JSX.Element;
