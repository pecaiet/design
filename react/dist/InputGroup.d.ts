import { type ComponentPropsWithRef, type ReactNode } from 'react';
import { type Labelled } from './Field';
type Field = Omit<ComponentPropsWithRef<'input'>, 'children'> & {
    /** Under the field, until there's an error. */
    hint?: ReactNode;
    /** Says how to fix it; turns the edge red. Takes Inertia's form.errors.field as is. */
    error?: ReactNode;
    optional?: boolean;
    /** A machine value (a secret, a key): the monospace at 12px. */
    mono?: boolean;
};
type Inside = 
/** icon: 16px, first (MagnifyingGlass, Plus for quick add). end: a <Kbd> hint, a ghost icon Button with its tooltip (clear,
 *  copy) or a Spinner while it checks. */
{
    icon?: ReactNode;
    end?: ReactNode;
    before?: never;
    after?: never;
}
/** Words before or after the value, inside the field and muted (https://, kg, @pecaiet.ro): the group then draws the edge,
 *  the focus ring and the error. */
 | {
    before?: ReactNode;
    after?: ReactNode;
    icon?: never;
    end?: never;
};
export type InputGroupProps = Field & Labelled & Inside;
/** A text field with something inside it. Without a label, hint or error it's the bare group, ready for an InputRow. */
export declare function InputGroup({ label, hint, error, optional, mono, icon, end, before, after, id, className, ...input }: InputGroupProps): import("react").JSX.Element;
export type PasswordInputProps = Omit<Field, 'type' | 'mono'> & Labelled & {
    /** current-password to sign in, new-password to set one. */
    autoComplete: 'current-password' | 'new-password';
};
/** A password with the eye at its end: it shows the password, and the eye with a slash hides it again. */
export declare function PasswordInput(props: PasswordInputProps): import("react").JSX.Element;
export type CopyInputProps = Omit<Field, 'value' | 'defaultValue' | 'readOnly'> & Labelled & {
    /** What can be selected and copied but not changed: an ID, a key. */
    value: string;
    /** The copy button's name and tooltip: "Copy client ID". */
    copyLabel: string;
};
/** A read-only value (the muted fill, no border) with a copy button at its end. After a click its icon turns into a tick and
 *  its tooltip says "Copied" for two seconds. No toast. */
export declare function CopyInput({ copyLabel, value, ...props }: CopyInputProps): import("react").JSX.Element;
export type InputRowProps = ComponentPropsWithRef<'div'>;
/** A field and its button side by side (Invite, Add), 8px apart, each its own shape. The field takes the room: a bare InputGroup or
 *  SearchInput (no label, hint or error). */
export declare function InputRow({ className, ...div }: InputRowProps): import("react").JSX.Element;
export {};
