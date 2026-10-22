import type { ComponentPropsWithRef } from 'react';
export type StackProps = ComponentPropsWithRef<'div'> & (
/** One under another. gap from the spacing scale: 1 is 4px (menu rows), 2 is 8px (a title and its line), 3 is 12px (fields,
 *  the default), 4 is 16px (groups in a card), 6 is 24px (cards and sections on a page). */
{
    gap?: 1 | 2 | 3 | 4 | 6;
    row?: false;
}
/** Side by side, 8px apart, wrapping when there's no room. */
 | {
    row: true;
    gap?: never;
});
export declare function Stack({ gap, row, className, ...div }: StackProps): import("react").JSX.Element;
