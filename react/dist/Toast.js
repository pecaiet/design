import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle, Info, Warning, WarningCircle, X } from '@phosphor-icons/react';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from './Button';
import { leave } from './motion';
const ICONS = { success: _jsx(CheckCircle, {}), warning: _jsx(Warning, {}), error: _jsx(WarningCircle, {}), news: _jsx(Info, {}) };
const Toasts = createContext(null);
/** toast({ text, tone }) from anywhere under the ToastProvider. */
export function useToast() {
    const toast = useContext(Toasts);
    if (!toast)
        throw new Error('useToast needs a ToastProvider around the app.');
    return toast;
}
/** Holds the toasts over the page at the bottom right (across the bottom on phones), the newest at the bottom. Put it once around
 *  the app. Something people must act on before going on is an Alert or a Modal, not a toast. */
export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const elements = useRef(new Map());
    const leaving = useRef(new Set());
    const last = useRef(0);
    const toast = useMemo(() => {
        // It shrinks out while it fades and the toasts above glide down, then it goes. (It grows in by itself: pecaiet.js.)
        const dismiss = async (id) => {
            if (leaving.current.has(id))
                return;
            leaving.current.add(id);
            await leave(elements.current.get(id) ?? null);
            leaving.current.delete(id);
            setToasts(list => list.filter(item => item.id !== id));
        };
        const show = (options) => {
            const id = ++last.current;
            setToasts(list => [...list, { ...options, id }]);
            return id;
        };
        return Object.assign(show, { dismiss });
    }, []);
    return (_jsxs(Toasts, { value: toast, children: [children, _jsx("div", { className: "pc-toasts", children: toasts.map(({ id, ...options }) => (_jsx(Toast, { ...options, ref: element => {
                        if (element)
                            elements.current.set(id, element);
                        else
                            elements.current.delete(id);
                    }, onDismiss: () => toast.dismiss(id) }, id))) })] }));
}
function Toast({ text, tone, action, duration, onDismiss, ref }) {
    const left = useRef(duration ?? (action ? 10000 : 5000));
    const since = useRef(0);
    const timer = useRef(undefined);
    const holds = useRef({ pointer: false, focus: false });
    const run = () => {
        since.current = Date.now();
        timer.current = window.setTimeout(onDismiss, left.current);
    };
    useEffect(() => {
        run();
        return () => window.clearTimeout(timer.current);
    }, []);
    // Under the pointer or with focus, it waits; the time left runs on once both have gone.
    const hold = (kind, on) => {
        const was = holds.current.pointer || holds.current.focus;
        holds.current[kind] = on;
        const is = holds.current.pointer || holds.current.focus;
        if (is && !was) {
            window.clearTimeout(timer.current);
            left.current -= Date.now() - since.current;
        }
        if (was && !is)
            run();
    };
    return (_jsxs("div", { ref: ref, className: "pc-toast", "data-tone": tone, role: tone === 'error' ? 'alert' : 'status', onPointerEnter: () => hold('pointer', true), onPointerLeave: () => hold('pointer', false), onFocus: () => hold('focus', true), onBlur: event => {
            if (!event.currentTarget.contains(event.relatedTarget))
                hold('focus', false);
        }, children: [ICONS[tone ?? 'news'], _jsx("span", { className: "pc-toast-text", children: text }), action && (_jsx(Button, { variant: "ghost", onClick: () => {
                    action.onClick();
                    onDismiss();
                }, children: action.label })), _jsx(Button, { variant: "ghost", icon: _jsx(X, {}), label: "Dismiss", "data-pc-dismiss": "", onClick: event => {
                    // Handled here, so pecaiet.js doesn't remove an element React still owns.
                    event.preventDefault();
                    onDismiss();
                } })] }));
}
