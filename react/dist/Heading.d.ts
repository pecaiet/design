import type { ComponentPropsWithRef, ReactNode } from 'react';
export type HeadingProps = ComponentPropsWithRef<'h2'> & (
/** The page's title, an h1: one per page (each Settings section's title is one too). */
{
    page: true;
    as?: never;
    description?: never;
}
/** A section on a page that isn't in a card, as big as a card's title. as: its level, in order (h2 by default); the look stays. */
 | {
    page?: false;
    as?: 'h2' | 'h3' | 'h4';
    description?: ReactNode;
});
export declare function Heading({ page, as: Tag, description, className, ...heading }: HeadingProps): import("react").JSX.Element;
