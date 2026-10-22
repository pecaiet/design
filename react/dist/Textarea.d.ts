import { type ComponentPropsWithRef, type ReactNode } from 'react';
import { type Labelled } from './Field';
export type TextareaProps = Omit<ComponentPropsWithRef<'textarea'>, 'children'> & Labelled & {
    hint?: ReactNode;
    error?: ReactNode;
    optional?: boolean;
    /** Shows "13 / 200" under it, red and invalid when it's over. Typing past it is allowed, so nothing is cut off. */
    limit?: number;
};
export declare function Textarea({ label, hint, error, optional, limit, id, className, onChange, ...textarea }: TextareaProps): import("react").JSX.Element;
