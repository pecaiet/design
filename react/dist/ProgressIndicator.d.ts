import type { ComponentPropsWithRef, ReactNode } from 'react';
export type ProgressIndicatorProps = Omit<ComponentPropsWithRef<'ol'>, 'children'> & {
    /** Three to five, named with a noun or a short verb ("Account", "Add your profile"). current: the one they're on (teal, its
     *  name bold). done: behind them (teal). error: a step with a problem (red, a ! before its name). The rest stay grey. */
    steps: {
        label: ReactNode;
        state?: 'current' | 'done' | 'error';
    }[];
} & (
/** vertical: down the page, for a checklist, the bar beside each name. */
{
    compact?: false;
    vertical?: boolean;
}
/** On phones and in narrow places: the step's name and "Step 2 of 4" over the bars; the names are kept for screen readers. */
 | {
    compact: true;
    vertical?: never;
});
/** Where someone is in a few steps. It only shows where they are: moving between steps is the page's own buttons. */
export declare function ProgressIndicator({ steps, compact, vertical, className, ...ol }: ProgressIndicatorProps): import("react").JSX.Element;
