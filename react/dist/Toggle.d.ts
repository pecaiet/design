import type { ComponentPropsWithRef, ReactNode } from 'react';
export type ToggleProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'role' | 'children'> & (
/** Its words beside it, with an optional hint under them. */
{
    label: ReactNode;
    hint?: ReactNode;
    error?: ReactNode;
    'aria-label'?: never;
}
/** At the end of a settings row: the row is the app's <label>, with the words at its start. */
 | {
    label?: never;
    hint?: never;
    error?: never;
    'aria-label': string;
});
/** A switch for a setting that takes effect straight away, with no Save button. Something saved with the form's Save is a
 *  Checkbox. */
export declare function Toggle({ label, hint, error, id, className, ...input }: ToggleProps): import("react").JSX.Element;
