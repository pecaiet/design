import { type HTMLAttributes, type ReactNode } from 'react';
type Option<T> = {
    value: T;
    label: ReactNode;
    icon?: ReactNode;
    disabled?: boolean;
};
export type SegmentedControlProps<T extends string> = Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'children'> & {
    /** What's being chosen: "Theme", "View". */
    'aria-label': string;
    /** The radios' name; one is made up without it. */
    name?: string;
    /** The chosen one; one is always chosen (the first, to start with, when neither is given). */
    value?: T;
    defaultValue?: T;
    onChange?: (value: T) => void;
    /** Turns every option off: the words go grey; the chosen one keeps its pill. */
    disabled?: boolean;
} & (
/** Two to five, in short words, each with an optional 16px icon before them. Six or more, or long words, are a Select.
 *  full stretches it to its container: in a card, on a phone. */
{
    iconsOnly?: false;
    full?: boolean;
    options: Option<T>[];
}
/** Icons only: label is the radio's name and the tooltip. They keep their square, so it doesn't stretch. */
 | {
    iconsOnly: true;
    full?: never;
    options: (Omit<Option<T>, 'label' | 'icon'> & {
        label: string;
        icon: ReactNode;
    })[];
});
/** Choosing exactly one of two to five options that are always in view: Dark, Light or System; List, Board or Calendar. The
 *  chosen one lifts as a raised pill that slides to the next. Separate tools that each do their own thing are a Toolbar. */
export declare function SegmentedControl<T extends string>({ name, value, defaultValue, onChange, full, disabled, iconsOnly, options, className, ...div }: SegmentedControlProps<T>): import("react").JSX.Element;
export {};
