import { type ComponentPropsWithRef, type ReactNode } from 'react';
export type FileUploadProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'children'> & {
    /** Over the button, in a form: "Attachments". */
    label?: ReactNode;
    /** What's allowed: "PDF or image, up to 10 MB each." */
    hint?: ReactNode;
    /** A file that isn't allowed. Takes Inertia's form.errors.field as is. */
    error?: ReactNode;
    optional?: boolean;
    /** The button's words: "Attach files", or "Attach file" without multiple. */
    buttonLabel?: ReactNode;
    /** The chosen files, under it: FileRows with onRemove. The button stays, to add more. */
    children?: ReactNode;
};
/** An outline button that opens the device's file picker: add multiple for more than one file and accept for the kinds allowed.
 *  The chosen files come in onChange (event.target.files). No drop area for now. */
export declare function FileUpload({ label, hint, error, optional, buttonLabel, children, id, className, ...input }: FileUploadProps): import("react").JSX.Element;
