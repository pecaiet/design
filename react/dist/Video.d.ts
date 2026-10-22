import { type ComponentPropsWithRef, type ReactNode } from 'react';
export type VideoProps = Omit<ComponentPropsWithRef<'video'>, 'title' | 'controls'> & {
    /** What it is: the play button says “Play “How sign-in works”, 2 minutes”. */
    title: string;
    /** Its length in seconds: 2:05 at the bottom right until it plays. */
    duration?: number;
    /** Under it, in a figure. */
    caption?: ReactNode;
};
/** A video in the page (16:9 unless given another aspect-ratio): its first frame, a white play button and its length, then the
 *  browser's own controls once it plays. It never starts on its own; one with speech gets captions (a <track kind="captions">
 *  child). Without a src or sources, or when it can't play, the muted box with a video icon. */
export declare function Video({ title, duration, caption, src, children, className, ref, onError, ...video }: VideoProps): import("react").JSX.Element;
