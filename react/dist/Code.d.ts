import type { ComponentPropsWithRef, ReactNode } from 'react';
export type CodeProps = ComponentPropsWithRef<'code'>;
/** A machine value in running text: an ID, an error code. */
export declare function Code({ className, ...code }: CodeProps): import("react").JSX.Element;
export type CodeBlockProps = ComponentPropsWithRef<'pre'>;
/** A block of output (a backtrace): it scrolls inside itself and never widens the page. */
export declare function CodeBlock({ className, ...pre }: CodeBlockProps): import("react").JSX.Element;
export type KbdProps = ComponentPropsWithRef<'span'>;
/** A keyboard key: "/", "Esc", "⌘K". */
export declare function Kbd({ className, ...span }: KbdProps): import("react").JSX.Element;
export type SecretProps = {
    /** The secret: a read-only field in the monospace, with a copy button at its end. */
    value: string;
    /** The warning over it: "Copy the secret now. It won't be shown again." */
    children: ReactNode;
    className?: string;
};
/** A secret shown once: the warning and the value together in one notice, with no separate label. */
export declare function Secret({ value, children, className }: SecretProps): import("react").JSX.Element;
