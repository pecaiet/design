import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ImageIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { cx } from './cx';
/** Give it a size or an aspect ratio (width and height, or aspect-ratio) so the page doesn't jump; the picture fills that box.
 *  Without a src yet, or when it can't load, a muted box with an image icon takes its place, the same size. */
export function Image({ alt, caption, src, width, height, style, onError, className, ...img }) {
    const [broken, setBroken] = useState();
    const empty = !src || broken === src;
    const named = alt ? { role: 'img', 'aria-label': alt } : { 'aria-hidden': true };
    const picture = empty ? (_jsx("div", { ...named, className: cx('pc-image', 'pc-image-empty', !caption && className), style: { width, height, ...style }, children: _jsx(ImageIcon, {}) })) : (_jsx("img", { ...img, className: cx('pc-image', !caption && className), src: src, alt: alt, width: width, height: height, style: style, onError: event => {
            setBroken(src);
            onError?.(event);
        } }));
    if (!caption)
        return picture;
    return (_jsxs("figure", { className: cx('pc-figure', className), children: [picture, _jsx("figcaption", { children: caption })] }));
}
