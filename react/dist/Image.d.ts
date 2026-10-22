import { type ComponentPropsWithRef, type ReactNode } from 'react';
export type ImageProps = Omit<ComponentPropsWithRef<'img'>, 'alt' | 'children'> & {
    /** What's in the picture; "" for a picture that's only decoration. */
    alt: string;
    /** 12px muted words under it: it goes in a figure. */
    caption?: ReactNode;
};
/** Give it a size or an aspect ratio (width and height, or aspect-ratio) so the page doesn't jump; the picture fills that box.
 *  Without a src yet, or when it can't load, a muted box with an image icon takes its place, the same size. */
export declare function Image({ alt, caption, src, width, height, style, onError, className, ...img }: ImageProps): import("react").JSX.Element;
