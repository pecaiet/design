import type { ComponentPropsWithRef, ReactNode } from 'react';
export type EmptyStateProps = Omit<ComponentPropsWithRef<'div'>, 'title' | 'children'> & {
    /** What isn't there: "No failed jobs", "No tasks yet", "No tasks match “zzz”". No icon and no button: the page's own action
     *  stays where it always is. */
    title: ReactNode;
    /** One line: what will show up here, or why nothing does. */
    description?: ReactNode;
};
export declare function EmptyState({ title, description, className, ...div }: EmptyStateProps): import("react").JSX.Element;
