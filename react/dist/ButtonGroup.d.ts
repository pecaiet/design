import type { ComponentPropsWithRef } from 'react';
export type ButtonGroupProps = ComponentPropsWithRef<'div'>;
/** Buttons side by side, 8px apart, each its own shape, wrapping when there's no room: page and dialog actions. At most one
 *  primary; a delete goes last. */
export declare function ButtonGroup({ className, ...div }: ButtonGroupProps): import("react").JSX.Element;
export type ToolbarProps = ComponentPropsWithRef<'div'>;
/** Tools on a list or an editor (search, sort, view, more): ghost buttons, usually icon only, in a quiet tray. A tool that stays
 *  on is pressed. Choosing one of a few options is a SegmentedControl. */
export declare function Toolbar({ className, ...div }: ToolbarProps): import("react").JSX.Element;
/** Between groups of tools in a Toolbar. */
export declare function ToolbarDivider({ className }: {
    className?: string;
}): import("react").JSX.Element;
