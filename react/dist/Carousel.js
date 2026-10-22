import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
/** One item at a time, with dots under it to pick one: the current dot long and strong. The slide shown fades in. */
export function Carousel({ label, slides, interval, paused, onPointerEnter, onPointerLeave, onFocus, onBlur, ...div }) {
    const [shown, setShown] = useState(0);
    const [picked, setPicked] = useState(false);
    const [pointer, setPointer] = useState(false);
    const [focus, setFocus] = useState(false);
    useEffect(() => {
        const still = window.Pecaiet ? window.Pecaiet.motion() === 'off' : matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!interval || picked || paused || pointer || focus || still || slides.length < 2)
            return;
        const timer = window.setInterval(() => setShown(i => (i + 1) % slides.length), interval);
        return () => window.clearInterval(timer);
    }, [interval, picked, paused, pointer, focus, slides.length]);
    return (_jsxs("div", { ...div, role: "region", "aria-roledescription": "carousel", "aria-label": label, onPointerEnter: event => {
            setPointer(true);
            onPointerEnter?.(event);
        }, onPointerLeave: event => {
            setPointer(false);
            onPointerLeave?.(event);
        }, onFocus: event => {
            setFocus(true);
            onFocus?.(event);
        }, onBlur: event => {
            if (!event.currentTarget.contains(event.relatedTarget))
                setFocus(false);
            onBlur?.(event);
        }, children: [slides.map((slide, i) => (_jsx("div", { className: "pc-carousel-slide", role: "group", "aria-roledescription": "slide", "aria-label": slide.label, hidden: i !== shown % slides.length, children: slide.content }, i))), _jsx("div", { className: "pc-carousel-dots", children: slides.map((slide, i) => (_jsx("button", { className: "pc-carousel-dot", type: "button", "aria-label": `Show ${slide.label}`, "aria-current": i === shown % slides.length, onClick: () => {
                        setShown(i);
                        setPicked(true);
                    } }, i))) })] }));
}
