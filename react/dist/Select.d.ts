import { type ReactNode, type RefObject } from 'react';
import { type Labelled } from './Field';
type Value = string | number;
export type SelectOption<V extends Value = string> = {
    value: V;
    /** Its words: what the button shows, and what search and typing look for. */
    label: string;
    /** A colour dot before the words. */
    colour?: 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'purple' | 'pink';
    /** A 16px icon before the words. */
    icon?: ReactNode;
    /** Its group's heading ("Food"); keep a group's options together. */
    group?: string;
    /** Can't be picked: half strength, skipped by the arrow keys, and it says why at its end ("Needs a team plan"). */
    disabledReason?: ReactNode;
};
/** What the Select and the Combobox share, besides their label. */
export type PickerProps<V extends Value> = {
    options: SelectOption<V>[];
    /** The chosen value; null while nothing is chosen. */
    value: V | null;
    onChange: (value: V | null) => void;
    /** Muted, while nothing is chosen: "Choose a space". */
    placeholder?: string;
    /** A first, muted option that clears the choice: "No colour". */
    none?: string;
    /** A search first in the list, with these words in it ("Search categories"): typing filters the options. */
    search?: string;
    /** The line when nothing matches the search; “Nothing matches “zzz”.” by default. */
    empty?: (query: string) => ReactNode;
    /** What the phone sheet shows first, where there's no label above it; the label by default. */
    title?: ReactNode;
    /** Sends the value with a form, in a hidden input. */
    name?: string;
    /** Under the field, until there's an error. */
    hint?: ReactNode;
    /** Says what to do; turns the border red. Takes Inertia's form.errors.field as is. */
    error?: ReactNode;
    optional?: boolean;
    disabled?: boolean;
    id?: string;
    className?: string;
};
export type SelectProps<V extends Value = string> = Labelled & PickerProps<V>;
/** Choosing one value from a list: a button that looks like a field and opens our own list (a sheet on phones). Up and Down move,
 *  Enter picks and puts focus back on the button, Esc or the dimmed page close it without a change. Two to five choices that
 *  should all be seen are radios; typing to find in a long list is the Combobox. */
export declare function Select<V extends Value = string>({ label, 'aria-label': ariaLabel, options, value, onChange, placeholder, none, search, empty, title, name, hint, error, optional, disabled, id, className, }: SelectProps<V>): import("react").JSX.Element;
type PickerMenuProps<V extends Value> = {
    menu: RefObject<HTMLDivElement | null>;
    id: string;
    open: boolean;
    /** The list's name: the label's id, or the field's aria-label. */
    labelledBy?: string;
    label?: string;
    title: ReactNode;
    options: SelectOption<V>[];
    picked: (value: V) => boolean;
    onPick: (option: SelectOption<V>) => void;
    none?: {
        label: string;
        picked: boolean;
        onPick: () => void;
    };
    search?: string;
    empty?: (query: string) => ReactNode;
    /** Several values: a checkbox starts each row, and the list stays open. */
    multiple?: boolean;
    /** Backspace in the empty search. */
    onBackspace?: () => void;
};
/** The list a picker opens: the phone sheet's title, the search, the options in their groups, and the keys that move through them.
 *  With a search, focus starts there and Down moves into the list; a letter typed on an option goes on into the search. */
export declare function PickerMenu<V extends Value>({ menu, id, open, labelledBy, label, title, options, picked, onPick, none, search, empty, multiple, onBackspace }: PickerMenuProps<V>): import("react").JSX.Element;
export {};
