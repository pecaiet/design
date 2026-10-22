import { cloneElement, useEffect } from 'react';
/** A short hint on hover (after 360ms) and at once on keyboard focus, drawn by pecaiet.css from data-pc-tooltip. */
export function Tooltip({ text, side, children }) {
    return cloneElement(children, { 'data-pc-tooltip': text, 'data-pc-tooltip-side': side });
}
/** Esc hides the tooltip under the pointer or on the focused element (data-pc-tooltip-hidden) until the pointer or focus leaves it.
 *  Call it once, in the app's layout: it covers every data-pc-tooltip on the page, Buttons' too. */
export function useTooltipEscape() {
    useEffect(() => {
        const hide = (event) => {
            if (event.key !== 'Escape')
                return;
            document
                .querySelectorAll('[data-pc-tooltip]:hover, [data-pc-tooltip]:focus-visible, [data-pc-tooltip]:has(:focus-visible)')
                .forEach(element => element.setAttribute('data-pc-tooltip-hidden', ''));
        };
        const back = (event) => {
            const element = event.target instanceof Element ? event.target.closest('[data-pc-tooltip-hidden]') : null;
            const to = event.relatedTarget;
            if (element && !(to instanceof Node && element.contains(to)))
                element.removeAttribute('data-pc-tooltip-hidden');
        };
        document.addEventListener('keydown', hide);
        document.addEventListener('pointerout', back);
        document.addEventListener('focusout', back);
        return () => {
            document.removeEventListener('keydown', hide);
            document.removeEventListener('pointerout', back);
            document.removeEventListener('focusout', back);
        };
    }, []);
}
