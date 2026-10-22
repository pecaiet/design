import { type RefObject } from 'react';
/** True below 48rem, where the layouts pecaiet.css leaves to the app change shape. */
export declare const usePhone: () => boolean;
/** True while <html> has .dark. */
export declare const useDark: () => boolean;
/** Another site (another pe caiet app): a plain link that loads it, since an Inertia visit can't cross origins. */
export declare const external: (href: string) => boolean;
/** A sidebar shown as a sheet over the page: opening moves focus to its first row, closing (the backdrop, Escape, a visit) puts it
 *  back on the toggle that opens it (aria-controls). */
export declare function useSheet(open: boolean, close: () => void, frame: RefObject<HTMLElement | null>, nav: string): void;
