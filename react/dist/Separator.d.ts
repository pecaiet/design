import type { ReactNode } from 'react';
export type SeparatorProps = {
    className?: string;
} & (
/** Between sections. bleed runs it to a card's or panel's edges. */
{
    bleed?: boolean;
    vertical?: never;
    children?: never;
}
/** Between items in a row (a date, a count), 16px tall. */
 | {
    vertical: true;
    bleed?: never;
    children?: never;
}
/** A word in the middle: "or" between two ways to sign in. */
 | {
    children: ReactNode;
    bleed?: never;
    vertical?: never;
});
export declare function Separator({ bleed, vertical, children, className }: SeparatorProps): import("react").JSX.Element;
