import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Play, Video as VideoMark } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import { cx } from './cx';
import { assign } from './popup';
const clock = (seconds) => {
    const s = Math.round(seconds);
    const mm = String(Math.floor((s % 3600) / 60));
    const ss = String(s % 60).padStart(2, '0');
    return s >= 3600 ? `${Math.floor(s / 3600)}:${mm.padStart(2, '0')}:${ss}` : `${mm}:${ss}`;
};
/** A video in the page (16:9 unless given another aspect-ratio): its first frame, a white play button and its length, then the
 *  browser's own controls once it plays. It never starts on its own; one with speech gets captions (a <track kind="captions">
 *  child). Without a src or sources, or when it can't play, the muted box with a video icon. */
export function Video({ title, duration, caption, src, children, className, ref, onError, ...video }) {
    const [playing, setPlaying] = useState(false);
    const [broken, setBroken] = useState(false);
    const own = useRef(null);
    const whole = Math.round(duration === undefined || duration < 60 ? duration ?? 0 : duration / 60);
    const play = `Play “${title}”${duration ? `, ${whole} ${duration < 60 ? 'seconds' : whole === 1 ? 'minute' : 'minutes'}` : ''}`;
    // The button goes once it plays, so focus moves on to the video and its controls.
    useEffect(() => {
        if (playing)
            own.current?.focus();
    }, [playing]);
    const box = broken || (!src && !children) ? (_jsx("div", { className: cx('pc-video', 'pc-video-empty', !caption && className), role: "img", "aria-label": `“${title}” can’t play`, children: _jsx(VideoMark, {}) })) : (_jsxs("div", { className: cx('pc-video', !caption && className), "data-state": playing ? 'playing' : undefined, children: [_jsx("video", { preload: "none", playsInline: true, ...video, ref: node => {
                    own.current = node;
                    assign(ref, node);
                }, src: src, controls: playing, "aria-label": playing ? title : undefined, onError: event => {
                    setBroken(true);
                    onError?.(event);
                }, children: children }), _jsx("button", { className: "pc-video-play", type: "button", "aria-label": play, "data-pc-tooltip": play, onClick: () => {
                    setPlaying(true);
                    own.current?.play().catch(() => { });
                }, children: _jsx(Play, { weight: "fill" }) }), duration !== undefined && _jsx("span", { className: "pc-video-length", "aria-hidden": "true", children: clock(duration) })] }));
    if (!caption)
        return box;
    return (_jsxs("figure", { className: cx('pc-figure', className), children: [box, _jsx("figcaption", { children: caption })] }));
}
