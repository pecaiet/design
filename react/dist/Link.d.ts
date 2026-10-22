import { type InertiaLinkProps } from '@inertiajs/react';
import { type ComponentPropsWithRef, type ReactElement, type ReactNode } from 'react';
type Look = {
    children: ReactNode;
    /** Stands alone in a muted place (a footer, breadcrumbs): muted, no underline until the pointer is on it. */
    quiet?: boolean;
    /** A 16px icon before the words (a file, a download). */
    icon?: ReactElement<{
        className?: string;
    }>;
    /** After the words: CaretRight for "View all" on its own line. */
    iconAfter?: ReactNode;
};
type Tag = 
/** A page of the app: an Inertia link. */
(Omit<InertiaLinkProps, 'children'> & {
    href: string;
    external?: false;
})
/** Another site: opens in a new tab, with an arrow, and says so to screen readers. */
 | (Omit<ComponentPropsWithRef<'a'>, 'children'> & {
    href: string;
    external: true;
})
/** Does something here instead of going somewhere ("Send it again"): a button with the same look. */
 | (Omit<ComponentPropsWithRef<'button'>, 'children'> & {
    href?: never;
    external?: never;
});
export type LinkProps = Look & Tag;
export declare function Link({ quiet, icon, iconAfter, children, className, ...element }: LinkProps): import("react").JSX.Element;
export {};
