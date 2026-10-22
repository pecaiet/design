import { type ComponentPropsWithRef, type ReactNode } from 'react';
import { type DialogProps } from './Modal';
type Parts = {
    /** What it's for: "Edit task". The drawer is labelled by it. */
    title: ReactNode;
    /** The fields, 12px apart; it scrolls when they don't fit. */
    children: ReactNode;
    /** Cancel (outline), then the action named for what it does ("Save", "Create list"), under a line. A <form id> in the body is
     *  sent by <Button type="submit" form="its id">. */
    footer?: ReactNode;
};
type Kind = 
/** Over the dimmed page, from the right edge, full height; full screen on phones. For one edit the page waits on: the x, Esc or
 *  the dimmed page close it. */
({
    beside?: false;
    back?: never;
} & Omit<DialogProps, 'kind' | 'title' | 'children'>)
/** Beside the page, the last thing in the page's row (as tall as the page); nothing is dimmed, so the next row can be opened.
 *  Show it or leave it out yourself. On phones it fills the screen and back ("Back to America") shows in place of the x. */
 | ({
    beside: true;
    back: string;
    onClose: () => void;
} & Omit<ComponentPropsWithRef<'aside'>, 'title' | 'children'>);
export type DrawerProps = Parts & Kind;
/** A panel from the right with a form or a record's details. A yes/no question stays a Modal. */
export declare function Drawer({ title, children, footer, ...props }: DrawerProps): import("react").JSX.Element;
export {};
