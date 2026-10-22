import { type InertiaLinkProps } from '@inertiajs/react';
import { type ComponentPropsWithRef, type ReactNode } from 'react';
type Lead = 
/** 16px, before the label (an Avatar or an app's .pc-app-logo-mark also goes here). */
{
    icon?: ReactNode;
    mark?: never;
}
/** A letter tile instead of an icon ("W"). */
 | {
    mark: string;
    icon?: never;
};
type Detail = 
/** On the right: a number or a word (where it belongs: "Work"). */
{
    detail?: ReactNode;
    alert?: never;
    shortcut?: never;
    iconAfter?: never;
}
/** A number that needs attention: red and bold. */
 | {
    detail: number;
    alert: true;
    shortcut?: never;
    iconAfter?: never;
}
/** A key that does the same ("/"). */
 | {
    shortcut: string;
    detail?: never;
    alert?: never;
    iconAfter?: never;
}
/** An icon at the end: the caret of a row that opens a menu. */
 | {
    iconAfter: ReactNode;
    detail?: never;
    alert?: never;
    shortcut?: never;
};
type Tag = 
/** Opens a page of the app (an Inertia link). current: the page you are on, the flat pill; the app knows which one it is. */
(Omit<InertiaLinkProps, 'children'> & {
    href: string;
    current?: boolean;
})
/** Does something (Search, New list). Buttons are never the page you're on. */
 | (Omit<ComponentPropsWithRef<'button'>, 'children'> & {
    href?: never;
    current?: never;
});
export type SidebarItemProps = Lead & Detail & Tag & {
    /** The label, in the text colour; a long one is cut with an ellipsis and the detail stays. */
    children: ReactNode;
};
/** One row of the sidebar: a link when it opens a page, a button when it does something. */
export declare function SidebarItem({ icon, mark, detail, alert, shortcut, iconAfter, children, className, ...element }: SidebarItemProps): import("react").JSX.Element;
export type SidebarSectionProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & Lead & {
    /** Names the rows under it: bold, not clickable. */
    heading: ReactNode;
    /** Its rows (SidebarItems), a step to the right. */
    children: ReactNode;
};
/** A heading with the rows nested under it (a space and its lists). */
export declare function SidebarSection({ heading, icon, mark, children, className, ...div }: SidebarSectionProps): import("react").JSX.Element;
export {};
