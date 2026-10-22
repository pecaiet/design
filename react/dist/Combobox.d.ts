import { type Labelled } from './Field';
import { type PickerProps } from './Select';
type Value = string | number;
type One<V extends Value> = Labelled & Omit<PickerProps<V>, 'search'> & {
    multiple?: false;
    /** The search first in its list, with these words in it: "Search lists". Typing only filters. */
    search: string;
};
type Several<V extends Value> = Labelled & Omit<PickerProps<V>, 'value' | 'onChange' | 'placeholder' | 'none' | 'search' | 'name'> & {
    /** Several values (labels on a task, people, filters, scopes): chips in the field, each with its x; a checkbox on each row. A click
     *  or Enter picks or unpicks and the list stays open; Backspace in the empty search takes off the last chip. */
    multiple: true;
    value: V[];
    onChange: (value: V[]) => void;
    /** What to do, muted, while none are picked: "Add a label". */
    placeholder: string;
    search: string;
    /** Sends each value with a form, in hidden inputs (name it labels[] for Rails); with none, one empty value, so the server can tell
     *  it was emptied. */
    name?: string;
};
export type ComboboxProps<V extends Value = string> = One<V> | Several<V>;
/** Picking from a long list by typing: the Select with a search at the top of its list. Only values from the list. */
export declare function Combobox<V extends Value = string>(props: ComboboxProps<V>): import("react").JSX.Element;
export {};
