import { type ComponentPropsWithRef, type ReactNode } from 'react';
export type TreeItem = {
    id: string;
    label: ReactNode;
    /** 16px, after the caret: a folder, a list. */
    icon?: ReactNode;
    /** At the end: 12. */
    count?: ReactNode;
    /** Goes there on a click or Enter (an Inertia visit). */
    href?: string;
    /** The page you're on: the active sidebar pill. */
    current?: boolean;
    /** What's inside: the row opens and closes. */
    children?: TreeItem[];
};
export type TreeViewProps = Omit<ComponentPropsWithRef<'ul'>, 'children' | 'onSelect'> & {
    /** What it holds, for screen readers: "Lists". */
    label: string;
    items: TreeItem[];
    /** The ids of the open rows. Leave it out and the tree keeps them, starting from defaultExpanded. */
    expanded?: string[];
    defaultExpanded?: string[];
    onExpandedChange?: (expanded: string[]) => void;
    /** A row without an href was chosen (a click or Enter). Without it, a click on a row that opens opens or closes it. */
    onSelect?: (item: TreeItem) => void;
};
/** Things inside things (folders of lists) as sidebar rows that open and close, each level 24px further in. Up and Down move,
 *  Right opens or goes in, Left closes or goes back to its folder, Home and End, Enter chooses. */
export declare function TreeView({ label, items, expanded, defaultExpanded, onExpandedChange, onSelect, className, ref, ...ul }: TreeViewProps): import("react").JSX.Element;
