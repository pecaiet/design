import { type HTMLAttributes } from 'react';
import type { Labelled } from './Field';
declare const COLOURS: readonly ['gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'purple', 'pink'];
type Colour = (typeof COLOURS)[number] | `#${string}`;
export type ColorPickerProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'children'> & Labelled & {
    /** The radios' name; one is made up without it. */
    name?: string;
    /** A colour from the set ("teal"), the same in light and dark, or any other as a hex ("#c2410c"). */
    value?: Colour;
    defaultValue?: Colour;
    onChange?: (value: Colour) => void;
};
/** A colour from the set, or any colour: the rainbow ring at the end opens the device's own chooser, and the colour picked
 *  there fills its middle. It stays in the ring to go back to when one from the set is chosen. */
export declare function ColorPicker({ label, name, value, defaultValue, onChange, id, className, ...div }: ColorPickerProps): import("react").JSX.Element;
export {};
