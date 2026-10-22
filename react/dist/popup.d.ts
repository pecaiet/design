import { type KeyboardEvent, type MouseEvent, type ReactElement, type Ref, type RefObject } from 'react';
/** Sets a ref the way React would: a callback or an object. */
export declare function assign<T>(ref: Ref<T> | undefined, node: T): void;
/** Open or not: the app's when it passes open (with onOpenChange), else the component keeps it. */
export declare function useOpen(open: boolean | undefined, onOpenChange: ((open: boolean) => void) | undefined): readonly [boolean, (next: boolean) => void];
/** While it's open, a press outside the panel and its button closes it, and so does focus moving on to something outside them (Tab).
 *  After a press on nothing that takes focus, focus goes back to the button. */
export declare function useOutside(open: boolean, panel: RefObject<HTMLElement | null>, button: RefObject<HTMLElement | null>, close: () => void): void;
export type TriggerProps = {
    id?: string;
    ref?: Ref<HTMLElement>;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
};
/** The button a menu or popover opens from, given what it needs. Its own id, ref and handlers stay; a handler of its own that calls
 *  preventDefault() stops ours. */
export declare function withTrigger(element: ReactElement<TriggerProps>, props: TriggerProps & Record<string, unknown>): ReactElement<TriggerProps, string | import("react").JSXElementConstructor<any>>;
/** Up and Down, Home and End move focus through the rows; wrap goes round from the last to the first. True when it was one of them. */
export declare function moveFocus(rows: HTMLElement[], key: string, wrap: boolean): boolean;
/** A letter typed on a row moves focus to the next row whose words start with it. True when one did. */
export declare function typeAhead(rows: HTMLElement[], event: KeyboardEvent): boolean;
