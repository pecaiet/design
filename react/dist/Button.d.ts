import { type InertiaLinkProps } from '@inertiajs/react';
import type { ComponentPropsWithRef, ReactNode } from 'react';
type Look = {
    /** primary: the one main action of a view. outline: secondary actions, Cancel. ghost: quiet actions in rows, menus and
     *  toolbars. destructive: a red outline that opens the dialog confirming something that can't be undone. */
    variant: 'primary' | 'outline' | 'ghost' | 'destructive';
    /** With variant="primary": solid red, the confirming dialog's Delete. */
    destructive?: boolean;
    size?: 'small' | 'large';
    /** Stretches it to its container: forms on phones, the sign-in page. */
    full?: boolean;
    /** A button that stays on (a filter, a view, Bold). */
    pressed?: boolean;
    /** Working: the spinner takes the icon's place and it can't be pressed twice. Change the words too ("Saving…"). */
    busy?: boolean;
    /** Can't be used, and says why in its tooltip. It stays focusable and ignores clicks. Use plain `disabled` without a reason. */
    disabledReason?: string;
};
type Content = 
/** icon before the words when it adds or does something, iconAfter when it opens a menu or goes to the next step. */
{
    children: ReactNode;
    icon?: ReactNode;
    iconAfter?: ReactNode;
    label?: never;
}
/** Icon only: label is its aria-label and its tooltip. */
 | {
    children?: never;
    icon: ReactNode;
    iconAfter?: never;
    label: string;
};
type Tag = (Omit<ComponentPropsWithRef<'button'>, 'children'> & {
    href?: never;
})
/** Goes to another page of the app: an Inertia link with the same look. */
 | (Omit<InertiaLinkProps, 'children'> & {
    href: string;
});
export type ButtonProps = Look & Content & Tag;
export declare function Button({ variant, destructive, size, full, pressed, busy, disabledReason, icon, iconAfter, label, children, className, ...element }: ButtonProps): import("react").JSX.Element;
export {};
