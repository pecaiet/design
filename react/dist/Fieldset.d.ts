import { type ComponentPropsWithRef, type ReactNode } from 'react';
/** A Fieldset with an error: its RadioButtons take aria-invalid, so their circles turn red. */
export declare const FieldsetContext: import("react").Context<{
    invalid?: boolean;
}>;
export type FieldsetProps = Omit<ComponentPropsWithRef<'fieldset'>, 'children'> & {
    /** The caption, like a field's label: "Remind me". */
    legend: ReactNode;
    /** row: two or three short choices side by side. boxes: choices that each have a description (a hint), in boxes; the
     *  chosen one teal, the whole box picks it. Short choices stay plain. */
    layout?: 'row' | 'boxes';
    /** Nothing chosen where a choice is needed: the radios turn red and this, under the group, says what to do. Takes Inertia's
     *  form.errors.field as is. */
    error?: ReactNode;
    /** RadioButtons sharing one name, or Checkboxes that belong together. disabled on the Fieldset turns them all off. */
    children: ReactNode;
};
/** A caption over a group of related choices. Bigger sections of a form are Cards. */
export declare function Fieldset({ legend, layout, error, id, children, className, ...fieldset }: FieldsetProps): import("react").JSX.Element;
