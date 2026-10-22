import { type ReactNode } from 'react';
/** Ids that tie a field to its label and to its hint or error (aria-describedby), and aria-invalid when there's an error. */
export declare function useField(id: string | undefined, message: ReactNode, error: ReactNode, ...describedBy: (string | undefined)[]): {
    fieldId: string;
    messageId: string;
    describedBy: string | undefined;
    invalid: boolean | undefined;
};
/** The error under a field, or its hint when there's no error. */
export declare function FieldMessage({ id, hint, error }: {
    id: string;
    hint?: ReactNode;
    error?: ReactNode;
}): import("react").JSX.Element | null;
/** A field shows either its visible label or, without one (quick add), an aria-label. */
export type Labelled = {
    label: ReactNode;
    'aria-label'?: never;
} | {
    label?: never;
    'aria-label': string;
};
