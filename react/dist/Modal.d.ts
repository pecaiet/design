import { type ComponentPropsWithRef, type FormEventHandler, type ReactNode } from 'react';
export type DialogProps = Omit<ComponentPropsWithRef<'dialog'>, 'open' | 'onClose' | 'onCancel'> & {
    /** dialog: a small window over the page (Modal, the search window). modal: the settings window. drawer: the panel from the
     *  right. The settings window and the drawer take focus themselves when they open (no row lights up); Tab moves in. */
    kind: 'dialog' | 'modal' | 'drawer';
    /** Open while true (showModal(): the page dims and focus stays inside); turning false plays the closing, then closes. */
    open: boolean;
    /** Esc or a click on the dimmed page asked to close (the click counts only when the press started there too): set open to
     *  false. Also called if the browser closed it by itself. Focus goes back to what opened it. */
    onClose: () => void;
    /** Working: Esc and a click on the dimmed page wait until it's done. */
    busy?: boolean;
    /** A form with unsaved changes: a click on the dimmed page doesn't close it. */
    unsaved?: boolean;
};
/** The <dialog> under the Modal, the Drawer, the search window and the settings window: opening, closing and its motion. */
export declare function Dialog({ kind, open, onClose, busy, unsaved, className, ref, onPointerDown, onClick, ...dialog }: DialogProps): import("react").JSX.Element;
export type ModalProps = Omit<DialogProps, 'kind' | 'title' | 'children' | 'onSubmit'> & {
    /** The question, or the task: "Sign out everywhere?", "New list". The window is labelled by it. */
    title: ReactNode;
    /** What happens, in muted words under the title. */
    description?: ReactNode;
    /** Fields (choices use the Select), an error Alert first, longer text. It scrolls when it doesn't fit; the title and the actions
     *  stay where they are. */
    children?: ReactNode;
    /** Cancel (outline), then the action named for what it does ("Sign out", "Delete user"; never "OK"), primary, or solid red for a
     *  delete that can't be undone. Working: the action busy, Cancel disabled, and busy on the Modal. */
    actions: ReactNode;
    /** Makes it a form, so Enter in a field sends it: give the action type="submit". */
    onSubmit?: FormEventHandler<HTMLFormElement>;
};
/** A small window over the page that asks one thing: a yes or no, or a few fields. No x: Cancel, Esc or the dimmed page close it.
 *  Opening focuses the first field, or Cancel (put it first) for a confirmation. A sheet from the bottom on phones. */
export declare function Modal({ title, description, children, actions, onSubmit, ...dialog }: ModalProps): import("react").JSX.Element;
