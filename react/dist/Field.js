import { jsx as _jsx } from "react/jsx-runtime";
import { useId, useLayoutEffect, useRef, useState } from 'react';
import { leave } from './motion';
/** Ids that tie a field to its label and to its hint or error (aria-describedby), and aria-invalid when there's an error. */
export function useField(id, message, error, ...describedBy) {
    const auto = useId();
    const fieldId = id ?? auto;
    const messageId = `${fieldId}-message`;
    return {
        fieldId,
        messageId,
        describedBy: [message ? messageId : undefined, ...describedBy].filter(Boolean).join(' ') || undefined,
        invalid: error ? true : undefined,
    };
}
/** The error under a field, or its hint when there's no error. An error takes the hint's line, turning red; with no hint it's new,
 *  and pecaiet.js grows it in. Gone with no hint to take its line, it shrinks out while what's below glides up. */
export function FieldMessage({ id, hint, error }) {
    // The error that just went, kept on screen while it shrinks (worked out while rendering, so it never blinks out first).
    const [last, setLast] = useState(error);
    const [leaving, setLeaving] = useState();
    if (error !== last) {
        setLast(error);
        setLeaving(error || hint ? undefined : last);
    }
    const own = useRef(null);
    useLayoutEffect(() => {
        const el = own.current;
        if (!leaving || !el)
            return;
        let live = true;
        leave(el).then(() => (live ? setLeaving(undefined) : el.style.removeProperty('display')));
        // An error that comes back before it's gone stays.
        return () => {
            live = false;
            el.getAnimations().forEach(a => a.cancel());
        };
    }, [leaving]);
    if (error)
        return _jsx("p", { ref: own, className: "pc-field-error", id: id, children: error });
    if (hint)
        return _jsx("p", { ref: own, className: "pc-field-hint", id: id, children: hint });
    if (leaving)
        return _jsx("p", { ref: own, className: "pc-field-error", id: id, children: leaving });
    return null;
}
