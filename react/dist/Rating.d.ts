import { type HTMLAttributes, type ReactNode } from 'react';
import type { Labelled } from './Field';
export type RatingProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
    /** The average out of 5: 4.2 fills the fifth star a fifth of the way. */
    value: number;
} & (
/** How many rated, or what the number means: "128 ratings", "Not rated yet". */
{
    compact?: false;
    count?: ReactNode;
}
/** In a row: one star and the number. */
 | {
    compact: true;
    count?: never;
});
/** How something was rated: teal stars, empty ones outlined, and the number. */
export declare function Rating({ value, count, compact, className, ...span }: RatingProps): import("react").JSX.Element;
export type RatingInputProps = Omit<HTMLAttributes<HTMLSpanElement>, 'onChange' | 'defaultValue' | 'children'> & Labelled & {
    /** The radios' name; one is made up without it. */
    name?: string;
    /** 1 to 5 stars; nothing chosen when it's left out. */
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    /** What the chosen number means, beside the stars: "Good", "Not rated yet". */
    description?: ReactNode;
    disabled?: boolean;
};
/** Setting a rating: five stars, each a radio. The chosen star and those before it fill; under the pointer they fill lighter
 *  until clicked; the arrow keys move it, as in any radio group. */
export declare function RatingInput({ label, name, value, defaultValue, onChange, description, disabled, id, className, ...span }: RatingInputProps): import("react").JSX.Element;
