import type { ComponentPropsWithRef, ReactNode } from 'react';
import { type BreadcrumbsProps } from './Breadcrumbs';
export type PageHeaderProps = Omit<ComponentPropsWithRef<'div'>, 'title' | 'children'> & {
    /** The page's title, its h1. */
    title: ReactNode;
    /** An optional line about the page, muted, lined up with the title (not the toggle). */
    description?: ReactNode;
    /** On the right: at most one primary button, or the ⋯ menu of the thing the page is about. When it doesn't fit beside the title
     *  it moves under it. */
    actions?: ReactNode;
    /** Only on a page below another page (a user under Users): the trail above, lined up with the title. */
    breadcrumbs?: Pick<BreadcrumbsProps, 'parents' | 'current'>;
};
/** The top of a page: the sidebar toggle (inside a Navigation), the title, an optional line, and the page's action on the right. */
export declare function PageHeader({ title, description, actions, breadcrumbs, className, ...div }: PageHeaderProps): import("react").JSX.Element;
