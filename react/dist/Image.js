import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ImageIcon } from '@phosphor-icons/react';
import { useLayoutEffect, useRef, useState } from 'react';
import { cx } from './cx';
import { enter } from './motion';
import { assign } from './popup';
/** Give it a size or an aspect ratio (width and height, or aspect-ratio) so the page doesn't jump; the picture fills that box.
 *  While it loads, without a src yet, or when it can't load, a muted box with an image icon takes its place, the same size. */
export function Image({ alt, caption, src, width, height, style, onLoad, onError, className, ref, ...img }) {
    const [broken, setBroken] = useState();
    const [loaded, setLoaded] = useState();
    const empty = !src || broken === src;
    const named = alt ? { role: 'img', 'aria-label': alt } : { 'aria-hidden': true };
    // Loaded, it takes the muted box's place and fades in, like content after a skeleton.
    const own = useRef(null);
    useLayoutEffect(() => {
        if (loaded && loaded === src)
            enter(own.current);
    }, [loaded]);
    const photo = (waiting) => (_jsx("img", { ...img, ref: node => {
            if (!waiting)
                own.current = node;
            assign(ref, node);
        }, className: waiting ? undefined : cx('pc-image', !caption && className), src: src, alt: waiting ? '' : alt, width: width, height: height, 
        // While it loads it sits unseen over the muted box, so it still loads when it's lazy.
        style: waiting ? { position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0 } : style, onLoad: event => {
            setLoaded(src);
            onLoad?.(event);
        }, onError: event => {
            setBroken(src);
            onError?.(event);
        } }));
    const picture = empty || loaded !== src ? (_jsxs("div", { ...named, className: cx('pc-image', 'pc-image-empty', !caption && className), style: { position: 'relative', width, height, ...style }, children: [_jsx(ImageIcon, {}), !empty && photo(true)] })) : photo(false);
    if (!caption)
        return picture;
    return (_jsxs("figure", { className: cx('pc-figure', className), children: [picture, _jsx("figcaption", { children: caption })] }));
}
