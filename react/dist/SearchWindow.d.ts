import { type ReactNode } from 'react';
export type SearchResult = {
    id: string;
    /** Its name. As words, the ones that match the search turn semibold. */
    title: ReactNode;
    /** The mark before it: open, done or a note; clock-counter-clockwise for a recent search. */
    icon?: ReactNode;
    /** Where it lives, on the right: "Work › America" (hidden on phones). */
    place?: ReactNode;
    /** 16px, before the place. */
    placeIcon?: ReactNode;
    /** Done: the title muted and struck through. */
    done?: boolean;
    /** Opens this page (Enter or a click); without it, onSelect. */
    href?: string;
};
export type SearchGroup = {
    /** "Tasks", "Recent searches". */
    label: ReactNode;
    /** After the name: how many. */
    count?: number;
    /** At the end of the heading: Clear, for recent searches. */
    action?: {
        label: ReactNode;
        onClick: () => void;
    };
    results: SearchResult[];
};
export type SearchWindowProps = {
    /** Open while true; Esc, Cancel (phones), a click on the dimmed page or a choice ask to close it through onClose. */
    open: boolean;
    onClose: () => void;
    query: string;
    onQueryChange: (query: string) => void;
    /** The field's words and name: "Search tasks". */
    placeholder: string;
    /** Grouped results; before typing, the recent searches. */
    groups: SearchGroup[];
    /** Looking: a spinner at the end of the field. */
    busy?: boolean;
    /** Nothing found: words that repeat the search ("No tasks match “passport”") and say what search looks at. */
    empty?: {
        title: ReactNode;
        description?: ReactNode;
    };
    /** The keys under the results: ↑ ↓ to move, Enter to open, Esc to close. On by default. */
    keys?: boolean;
    /** A result was chosen (after its href, if it has one). */
    onSelect?: (result: SearchResult) => void;
    className?: string;
};
/** The search window over everything (⌘K): the field on top, the results grouped under it, the highlighted one opened by Enter.
 *  Focus stays in the field; Up and Down move the highlight. On phones it fills the screen, with Cancel at the field's end. */
export declare function SearchWindow({ open, onClose, query, onQueryChange, placeholder, groups, busy, empty, keys, onSelect, className }: SearchWindowProps): import("react").JSX.Element;
