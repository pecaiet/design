import type { ReactNode } from 'react';
import { type SignedOutProps } from './SignIn';
type ErrorCode = 
/** The machine's code ("invalid_redirect_uri"), with its description muted under it. */
{
    code: string;
    codeDescription?: ReactNode;
} | {
    code?: never;
    codeDescription?: never;
};
export type ErrorPageProps = Omit<SignedOutProps, 'paused' | 'onSubmit' | 'children' | 'title'> & ErrorCode & {
    /** What went wrong: "Can't sign in to this app". */
    title: ReactNode;
    /** What happened and what to do, in one or two sentences. */
    description: ReactNode;
    /** The one way back: <Button variant="outline" href="/">Back to your account</Button>. */
    action: ReactNode;
};
/** A signed-out page that says something went wrong and what to do: the sign-in layout with one card. */
export declare function ErrorPage({ title, description, code, codeDescription, action, ...layout }: ErrorPageProps): import("react").JSX.Element;
export {};
