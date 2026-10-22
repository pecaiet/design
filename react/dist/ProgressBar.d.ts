import type { ComponentPropsWithRef, ReactNode } from 'react';
import { type Labelled } from './Field';
export type ProgressBarProps = Omit<ComponentPropsWithRef<'div'>, 'children'> & Labelled & {
    /** How much is done, 0–100, shown as "64%" beside the label. Leave it out when it can't tell how long: a third of the bar slides
     *  along it. Done is 100, and the label says so ("Uploaded"). */
    value?: number;
    /** Stopped by an error: the fill turns red where it stopped and this says what to do. */
    error?: ReactNode;
    /** 4px, inside a row (a file uploading), with an aria-label. */
    small?: boolean;
};
/** How far a long task has got. label is what's happening, over the bar: "Uploading Contract draft.pdf". For steps someone goes
 *  through, a ProgressIndicator; for a short wait with nothing to measure, a Spinner. */
export declare function ProgressBar({ label, value, error, small, id, className, ...div }: ProgressBarProps): import("react").JSX.Element;
