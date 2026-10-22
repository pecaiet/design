import type { ComponentPropsWithRef, ReactNode } from 'react';
import { type Labelled } from './Field';
export type TextInputProps = Omit<ComponentPropsWithRef<'input'>, 'children'> & Labelled & {
    /** Under the field, until there's an error. */
    hint?: ReactNode;
    /** Says how to fix it; turns the border red. Takes Inertia's form.errors.field as is. */
    error?: ReactNode;
    optional?: boolean;
};
export declare function TextInput({ label, hint, error, optional, id, className, ...input }: TextInputProps): import("react").JSX.Element;
