import { type ReactElement, type ReactNode } from 'react';
import { type TriggerProps } from './popup';
type Name = 
/** In its head, as a .pc-dialog-title: the popover is labelled by it, and on phones its x sits beside it. */
{
    title: ReactNode;
    label?: never;
}
/** No title: its name for screen readers. */
 | {
    title?: never;
    label: string;
};
export type PopoverProps = Name & {
    /** The button that opens it, on click: it gets aria-haspopup="dialog", aria-expanded (it keeps its hover fill while open) and the
     *  click; its own ref and handlers stay. */
    trigger: ReactElement<TriggerProps>;
    /** The title's heading level, under the page's own: h3 by default. */
    titleAs?: 'h2' | 'h3' | 'h4';
    /** Muted words under the title. */
    text?: ReactNode;
    /** A link, a field, a Datepicker. */
    children?: ReactNode;
    /** Cancel, then the action, under a line. Their clicks are yours: control open to close it from them. */
    actions?: ReactNode;
    /** Lined up with the button's end instead of its start. */
    align?: 'start' | 'end';
    /** Opens above the button, where there's no room below. */
    up?: boolean;
    /** Leave both out and it opens and closes by itself. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** On the anchor around the button and the popover. */
    className?: string;
};
/** A panel that opens from a button and can hold a link, a field or buttons; anything you can click goes here, not in a Tooltip.
 *  4px under the button, at most 320px wide; a sheet from the bottom over the dimmed page on phones. Opening moves focus to the
 *  first thing in it; Esc, a click outside or Tab out close it, and focus goes back to the button. */
export declare function Popover({ trigger, title, label, titleAs: Title, text, children, actions, align, up, open: shown, onOpenChange, className }: PopoverProps): import("react").JSX.Element;
export {};
