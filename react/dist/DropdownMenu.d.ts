import { type InertiaLinkProps } from '@inertiajs/react';
import { type ComponentPropsWithRef, type ReactElement, type ReactNode } from 'react';
import { type TriggerProps } from './popup';
type Placement = 
/** Where it drops: 4px under its button, lined up with the button's start or end; up opens it above. A sheet on phones. */
{
    align?: 'start' | 'end';
    up?: boolean;
    menuClassName?: never;
}
/** Placed by a class of its own instead (pc-sidebar-account-menu, pc-sidebar-apps-menu), with className on the wrapper that
 *  holds it (pc-sidebar-account, pc-sidebar-apps). */
 | {
    menuClassName: string;
    align?: never;
    up?: never;
};
export type DropdownMenuProps = Placement & {
    /** The button that opens it: a Button (a ⋯ icon button), a sidebar row. It gets aria-haspopup, aria-expanded (it keeps its hover
     *  fill while open) and the click; its own ref and handlers stay. */
    trigger: ReactElement<TriggerProps>;
    /** MenuItems, with MenuSeparator and MenuLabel between groups. Delete last, after a separator. */
    children: ReactNode;
    /** Names the thing acted on ("Birthday present"), first in the phone sheet only; also the menu's name. */
    title?: string;
    /** A menu of places (lists, workspaces, apps): link items, the one you're on marked current. */
    places?: boolean;
    /** A sheet at the bottom of the screen at any width, not only on phones. */
    sheet?: boolean;
    /** Leave both out and it opens and closes by itself. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** On the wrapper around the menu and its button. */
    className?: string;
};
/** A short list of actions or choices that opens over the page from a button. It closes on Esc, a click outside (the dimmed page on
 *  phones), Tab or a choice; focus goes back to the button. Arrow keys, Home, End and a letter move through the items. */
export declare function DropdownMenu({ trigger, children, title, places, sheet, open: shown, onOpenChange, align, up, menuClassName, className }: DropdownMenuProps): import("react").JSX.Element;
type ItemLook = {
    /** A verb ("Edit", "Archive"); one that opens another choice ends in "…" ("Move to list…"). */
    children: ReactNode;
    /** 16px, muted, before the words. */
    icon?: ReactNode;
    /** Delete: red, last, after a separator. */
    destructive?: boolean;
    /** A muted icon or words pushed to the end of the row (the app switcher's squares-four). */
    end?: ReactElement<{
        className?: string;
    }>;
};
type ItemTag = 
/** Does something; the menu closes after onClick. */
(Omit<ComponentPropsWithRef<'button'>, 'children'> & {
    href?: never;
    checked?: never;
    current?: never;
})
/** One of several choices (menuitemradio): the current one gets the tick at its end. */
 | (Omit<ComponentPropsWithRef<'button'>, 'children'> & {
    checked: boolean;
    href?: never;
    current?: never;
})
/** Goes to a page of the app (an Inertia link). current: where you are, in a menu of places. */
 | (Omit<InertiaLinkProps, 'children'> & {
    href: string;
    current?: boolean;
    checked?: never;
});
export type MenuItemProps = ItemLook & ItemTag;
export declare function MenuItem({ icon, destructive, end, children, className, ...element }: MenuItemProps): import("react").JSX.Element;
/** A line between groups, from edge to edge. */
export declare function MenuSeparator(): import("react").JSX.Element;
export type MenuLabelProps = {
    children: ReactNode;
};
/** A group's heading, muted and small ("Move to"). */
export declare function MenuLabel({ children }: MenuLabelProps): import("react").JSX.Element;
export {};
