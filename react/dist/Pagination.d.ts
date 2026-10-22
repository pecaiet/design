import { type ComponentPropsWithRef, type HTMLAttributes, type ReactNode } from 'react';
export type PaginationProps = Omit<ComponentPropsWithRef<'nav'>, 'children'> & {
    /** The page you're on, from 1. */
    page: number;
    pages: number;
    /** Each page's address, so every page has one: page => `/users?page=${page}`. */
    href: (page: number) => string;
} & (
/** Previous, the page numbers and Next. arrows: Previous and Next as arrows alone, where room is short. numbers={false}:
 *  only the two ends, when the page number doesn't matter (a log, search results; in a PaginationBar). */
{
    compact?: false;
    arrows?: boolean;
    numbers?: boolean;
}
/** For a narrow card, and below 48rem: "Page 5 of 20" between two arrows. */
 | {
    compact: true;
    arrows?: never;
    numbers?: never;
});
/** Moving through pages: the first and last pages and the ones either side of the one you're on (seven or fewer: all of them),
 *  "…" for the rest. An end that goes nowhere is turned off. */
export declare function Pagination({ page, pages, href, compact, arrows, numbers, className, ...nav }: PaginationProps): import("react").JSX.Element;
export type PaginationBarProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & {
    /** Where you are, first: "81–100 of 394". */
    count: ReactNode;
    /** Rows per page, before the count, for a big table: the Select's button. */
    size?: ReactNode;
    /** The Pagination, at the end. */
    children: ReactNode;
};
/** A count and the pages, as under a table in the card's footer. */
export declare function PaginationBar({ count, size, children, className, ...div }: PaginationBarProps): import("react").JSX.Element;
export type PaginationMoreProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onClick'> & {
    /** The button's words: "Show 20 more". */
    children: ReactNode;
    /** How many are shown: "40 of 134". */
    count: ReactNode;
    /** Adds the next rows to the ones already shown. */
    onClick: () => void;
    /** While the next rows load. */
    busy?: boolean;
};
/** Show more instead of pages. */
export declare function PaginationMore({ children, count, onClick, busy, className, ...div }: PaginationMoreProps): import("react").JSX.Element;
