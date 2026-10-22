import { type ReactNode } from 'react';
export type ToastOptions = {
    /** One short sentence: "Task deleted", "Couldn't save". */
    text: ReactNode;
    /** success: a teal tick. warning: amber (offline, about to run out). error: red. News, muted, by default. */
    tone?: 'success' | 'warning' | 'error';
    /** A ghost button before the x ("Undo", "Retry"); it closes the toast too. */
    action?: {
        label: ReactNode;
        onClick: () => void;
    };
    /** How long it stays, in ms: about five seconds, ten with an action. Never while it's under the pointer or has focus. */
    duration?: number;
};
/** Shows a toast and gives back its id; toast.dismiss(id) takes it away early. */
export type Toaster = ((toast: ToastOptions) => number) & {
    dismiss: (id: number) => void;
};
/** toast({ text, tone }) from anywhere under the ToastProvider. */
export declare function useToast(): Toaster;
export type ToastProviderProps = {
    children: ReactNode;
};
/** Holds the toasts over the page at the bottom right (across the bottom on phones), the newest at the bottom. Put it once around
 *  the app. Something people must act on before going on is an Alert or a Modal, not a toast. */
export declare function ToastProvider({ children }: ToastProviderProps): import("react").JSX.Element;
