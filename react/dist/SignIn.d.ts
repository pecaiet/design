import { type ComponentPropsWithRef, type CSSProperties, type FormEventHandler, type ReactElement, type ReactNode } from 'react';
export type SignInApp = {
    /** Its name, for its dot: "Show todo". */
    name: string;
    /** The word in "One space for your …": lists, account. */
    word: string;
    /** Its square mark: <TodoMark />. */
    mark: ReactElement<{
        style?: CSSProperties;
    }>;
    /** Its colour, washed over the left half: "#ffd54a". */
    colour: string;
};
export type SignedOutProps = Omit<ComponentPropsWithRef<'div'>, 'children' | 'onSubmit'> & {
    /** The apps the left half shows in turn, every 2.8 seconds: todo, then pe caiet. */
    apps?: SignInApp[];
    /** Makes the right half's column a form (Inertia's form.submit). */
    onSubmit?: FormEventHandler<HTMLFormElement>;
    /** Keeps the left half on the first app: while an error shows. */
    paused?: boolean;
    /** The right half's column, 400px at most, 16px apart. */
    children: ReactNode;
};
/** The signed-out layout: the left half shows one pe caiet app at a time, the right half the app's column (a form, a card); on
 *  phones the left half is a bar with the logo. Also the light/dark switch. Use it as the Inertia layout of every signed-out page,
 *  so the left half stays as it is while the right half changes. */
export declare function SignedOut({ apps, onSubmit, paused, children, style, ...div }: SignedOutProps): import("react").JSX.Element;
export type SignInPasswordProps = Omit<ComponentPropsWithRef<'input'>, 'children' | 'type'> & {
    /** "Password" unless you say otherwise. */
    label?: ReactNode;
    /** "Forgot password?", at the right end of the label's row: the reset page. */
    forgotHref: string;
    /** Under the field, until there's an error. */
    hint?: ReactNode;
    /** Says how to fix it; turns the border red. */
    error?: ReactNode;
};
/** The sign-in form's password: its label row ends in "Forgot password?". */
export declare function SignInPassword({ label, forgotHref, hint, error, id, className, autoComplete, ...input }: SignInPasswordProps): import("react").JSX.Element;
