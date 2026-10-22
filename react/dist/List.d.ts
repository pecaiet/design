import { type ComponentPropsWithRef, type HTMLAttributes, type ReactNode } from 'react';
export type ListProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    /** A few short points in running text. Anything people act on is rows instead: tasks, menu items, files, a Table. */
    items: ReactNode[];
    /** Numbers instead of bullets, only when the order matters (steps). */
    numbered?: boolean;
};
export declare function List({ items, numbered, className, ...list }: ListProps): import("react").JSX.Element;
export type DetailsProps = Omit<ComponentPropsWithRef<'dl'>, 'children'> & {
    /** Labels and values describing one thing (a client, a user, a job). A value can hold Code, a Badge or a small button; an
     *  empty one says "Not set" rather than staying blank. */
    items: {
        label: ReactNode;
        value?: ReactNode;
    }[];
};
export declare function Details({ items, className, ...dl }: DetailsProps): import("react").JSX.Element;
