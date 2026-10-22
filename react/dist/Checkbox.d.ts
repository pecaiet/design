import type { ComponentPropsWithRef, ReactNode } from 'react';
export type CheckboxProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'children'> & {
    /** What turning it on means: "Admin", "Confidential client". */
    label: ReactNode;
    hint?: ReactNode;
    error?: ReactNode;
    /** Half: a "pick all" box over a group when only some are ticked. */
    indeterminate?: boolean;
};
export declare function Checkbox({ label, hint, error, indeterminate, id, className, ref, ...input }: CheckboxProps): import("react").JSX.Element;
