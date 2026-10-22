import { type ComponentPropsWithRef, type ReactNode } from 'react';
import { type Labelled } from './Field';
export type StepperProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'children' | 'min' | 'max'> & Labelled & {
    min?: number;
    max?: number;
    /** The limits: "Up to 5 for each task." */
    hint?: ReactNode;
    error?: ReactNode;
    optional?: boolean;
};
/** A number to change a step at a time: "−", the number and "+" in one field. At the lowest value "−" is off; at the highest, "+".
 *  The buttons are for the pointer; with the keyboard the arrow keys change it, and typing a number works too. In a row it sits at
 *  the end, with an aria-label. */
export declare function Stepper({ label, hint, error, optional, id, className, onChange, ref, ...input }: StepperProps): import("react").JSX.Element;
