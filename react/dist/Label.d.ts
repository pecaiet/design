import type { ComponentPropsWithRef, ReactNode } from 'react';
export type LabelProps = ComponentPropsWithRef<'label'> & {
    /** Marks the few fields that don't have to be filled in; required ones have no mark. */
    optional?: boolean;
    /** A link about the field at the right end of the label's row, in 12px: <Link href="/password/new">Forgot password?</Link>. */
    action?: ReactNode;
};
export declare function Label({ optional, action, children, className, ...label }: LabelProps): import("react").JSX.Element;
