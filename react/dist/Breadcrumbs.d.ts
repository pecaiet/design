import { type ComponentPropsWithRef, type ReactNode } from 'react';
export type BreadcrumbsProps = Omit<ComponentPropsWithRef<'nav'>, 'children'> & {
    /** The pages above this one, the top one first. */
    parents: {
        label: ReactNode;
        href: string;
    }[];
    /** The page you are on, last. */
    current: ReactNode;
};
/** Above the page header, only on pages below another page (a user under Users), never on a top-level page. */
export declare function Breadcrumbs({ parents, current, className, ...nav }: BreadcrumbsProps): import("react").JSX.Element;
