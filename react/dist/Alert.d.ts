import { type HTMLAttributes, type ReactNode } from 'react';
export type AlertProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
    /** notice: something worked, or what happens next. warning: needs attention soon, nothing is wrong yet. error: something went wrong. */
    kind: 'notice' | 'warning' | 'error';
    /** Replaces the kind's icon with one that says more (Info, Archive). An alert always has one. */
    icon?: ReactNode;
    /** A title in the kind's colour, the words (children) under it in the text colour. */
    title?: ReactNode;
    /** A form's errors: children is the lead line ("Fix these 2 fields…"), these are listed under it. */
    items?: ReactNode[];
    /** An outline button at the end (Unarchive). */
    action?: {
        label: ReactNode;
        onClick?: () => void;
        href?: string;
    };
    /** Shows the x. Called once the alert has shrunk out; then drop it from state. */
    onDismiss?: () => void;
    /** Across the top of a page: no corners, edge to edge, one line. */
    banner?: boolean;
    /** Something the person just caused: it grows in when it appears. Leave it off for what was already on the page. */
    enter?: boolean;
};
export declare function Alert({ kind, icon, title, items, action, onDismiss, banner, enter, children, className, ...element }: AlertProps): import("react").JSX.Element;
