import type { ComponentPropsWithRef } from 'react';
export type LabelProps = ComponentPropsWithRef<'label'> & {
    /** Marks the few fields that don't have to be filled in; required ones have no mark. */
    optional?: boolean;
};
export declare function Label({ optional, children, className, ...label }: LabelProps): import("react").JSX.Element;
