import { type ComponentPropsWithoutRef, type ComponentPropsWithRef, type HTMLAttributes, type ReactNode } from 'react';
export type FilesProps = ComponentPropsWithRef<'div'>;
/** FileRows, 2px apart. */
export declare function Files({ className, ...div }: FilesProps): import("react").JSX.Element;
type Kind = 
/** To download: the whole row is the link, and the download icon shows in place of the size under the pointer and on focus. */
(Omit<ComponentPropsWithoutRef<'a'>, 'children'> & {
    href: string;
    onRemove?: never;
})
/** While editing (attachments in a form): an x at the end, always shown. Called once the row has shrunk out; then drop it from state. */
 | (Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    onRemove: () => void;
    href?: never;
});
export type FileRowProps = Kind & {
    /** Cut off with "…" when long. */
    name: string;
    /** "240 KB". */
    size: ReactNode;
    /** The file's icon: by default from the name's ending (FilePdf, FileXls, FileImage, FileText, FileIcon). */
    icon?: ReactNode;
    /** A file the person just added: it grows in, the rows below gliding. Leave it off for what was already on the page. */
    enter?: boolean;
};
/** A file as a row, like a task or menu row: its icon, its name and its size. */
export declare function FileRow({ name, size, icon, enter, className, ...element }: FileRowProps): import("react").JSX.Element;
export {};
