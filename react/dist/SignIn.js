import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cloneElement, useEffect, useRef, useState } from 'react';
import { Alert } from './Alert';
import { AppLogo, PeCaietMark, TodoMark } from './AppLogo';
import { cx } from './cx';
import { FieldMessage, useField } from './Field';
import { Label } from './Label';
import { Link } from './Link';
import { enter } from './motion';
import { useDark, usePhone } from './shell';
import { ThemeSwitch } from './ThemeSwitch';
const APPS = [
    { name: 'todo', word: 'lists', mark: _jsx(TodoMark, {}), colour: '#ffd54a' },
    { name: 'pe caiet', word: 'account', mark: _jsx(PeCaietMark, {}), colour: '#0b7a75' },
];
const SMALL = { fontSize: 'var(--pc-text-12)', lineHeight: 'var(--pc-line-16)' };
const COLUMN = { display: 'grid', alignContent: 'start', gap: 'var(--pc-space-4)', width: '100%', maxWidth: 'var(--pc-width-400)' };
/** The signed-out layout under SignIn and ErrorPage: the two halves, the light/dark switch, the phone bar. Not exported from the package. */
export function SignedOut({ apps = APPS, onSubmit, paused, children, style, ...div }) {
    const phone = usePhone();
    const dark = useDark();
    const aside = useRef(null);
    const fade = useRef(false);
    const [shown, setShown] = useState(0);
    const [picked, setPicked] = useState(false);
    const current = shown % apps.length;
    const app = apps[current];
    useEffect(() => {
        if (paused)
            setShown(0);
    }, [paused]);
    // Every 2.8 seconds the next app, until a dot is picked; never while an error shows or with motion off.
    useEffect(() => {
        const still = window.Pecaiet ? window.Pecaiet.motion() === 'off' : matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (paused || picked || still || apps.length < 2)
            return;
        const timer = window.setInterval(() => {
            fade.current = true;
            setShown(i => (i + 1) % apps.length);
        }, 2800);
        return () => window.clearInterval(timer);
    }, [paused, picked, apps.length]);
    // The app shown fades in where it is (its wash, marks and word: every part marked data-app); nothing slides.
    useEffect(() => {
        if (!fade.current)
            return;
        fade.current = false;
        aside.current?.querySelectorAll(`[data-app="${current}"]`).forEach(part => enter(part));
    }, [current]);
    const pick = (i) => {
        fade.current = i !== current;
        setShown(i);
        setPicked(true);
    };
    const fill = (mark) => cloneElement(mark, { style: { display: 'block', width: '100%', height: '100%', ...mark.props.style } });
    // The words share one spot, the others only invisible, so the line keeps the longest one's width.
    const words = (_jsx("span", { style: { display: 'inline-grid', textAlign: 'left' }, children: apps.map((each, i) => (_jsx("span", { "data-app": i, style: { gridArea: '1 / 1', visibility: i === current ? undefined : 'hidden' }, children: each.word }, each.name))) }));
    return (_jsxs("div", { ...div, style: { position: 'relative', display: 'grid', minHeight: '100dvh', ...(phone ? { gridTemplateRows: 'auto 1fr auto' } : { gridTemplateColumns: '1fr 1fr' }), ...style }, children: [_jsxs("aside", { ref: aside, style: {
                    position: 'relative',
                    isolation: 'isolate',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    background: 'var(--sidebar)',
                    // Desktop: the hero ends 7% of the window (40–120px) before the divider, as far as the form starts after it.
                    padding: phone ? '14px 20px' : '24px clamp(40px, 7vw, 120px) 24px 28px',
                }, children: [_jsx("div", { "data-app": current, style: { position: 'absolute', inset: 0, zIndex: -10, background: `color-mix(in srgb, ${app.colour} ${dark ? 16 : 22}%, transparent)` } }, current), !phone && (_jsx("div", { "aria-hidden": "true", style: { position: 'absolute', right: '-300px', bottom: '-320px', zIndex: -5, width: '900px', height: '900px', opacity: dark ? 0.1 : 0.14 }, children: _jsx("div", { "data-app": current, style: { width: '100%', height: '100%', rotate: '-14deg' }, children: fill(app.mark) }, current) })), _jsxs("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--pc-space-3)' }, children: [_jsx(AppLogo, { mark: _jsx(PeCaietMark, {}), children: "pe caiet" }), phone && (_jsxs("span", { "aria-hidden": "true", style: { display: 'flex', alignItems: 'center', gap: 'var(--pc-space-2)', minWidth: 0, fontSize: 'var(--pc-text-16)', lineHeight: 'var(--pc-line-24)', fontWeight: 'var(--pc-weight-semibold)', whiteSpace: 'nowrap' }, children: [_jsx("span", { "data-app": current, className: "pc-app-logo-mark", children: app.mark }, current), _jsxs("span", { children: [_jsx("span", { className: "pc-muted", style: { fontWeight: 'var(--pc-weight-regular)' }, children: "for your" }), " ", words] })] }))] }), !phone && (_jsxs("div", { style: { display: 'grid', justifyItems: 'center', gap: 'var(--pc-space-4)', width: '100%', maxWidth: 'var(--pc-width-400)', margin: 'auto 0', alignSelf: 'flex-end', textAlign: 'center' }, children: [_jsx("div", { "data-app": current, "aria-hidden": "true", style: { width: 'var(--pc-width-160)', height: 'var(--pc-width-160)', borderRadius: '23.4%', boxShadow: 'var(--pc-raise-lg)' }, children: fill(app.mark) }, current), _jsx("h2", { className: "pc-visually-hidden", children: "One space for everything in pe caiet." }), _jsxs("div", { className: "pc-page-title", "aria-hidden": "true", children: [_jsx("p", { children: "One space for" }), _jsxs("p", { children: ["your ", words] })] }), _jsx("p", { className: "pc-muted", children: "Sign in once and move between every pe caiet app." }), _jsx("div", { className: "pc-carousel-dots", children: apps.map((each, i) => (_jsx("button", { className: "pc-carousel-dot", type: "button", "aria-label": `Show ${each.name}`, "aria-current": i === current, onClick: () => pick(i) }, each.name))) })] })), !phone && _jsx("p", { className: "pc-muted", style: SMALL, children: "\u00A9 pe caiet" })] }), _jsx(ThemeSwitch, { style: { position: 'absolute', ...(phone ? { top: '60px', right: '12px' } : { top: '20px', right: '28px' }) } }), _jsx("main", { style: phone ? { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 20px' } : { display: 'flex', alignItems: 'center', padding: '96px 40px 96px clamp(40px, 7vw, 120px)' }, children: onSubmit ? _jsx("form", { style: COLUMN, onSubmit: onSubmit, children: children }) : _jsx("div", { style: COLUMN, children: children }) }), phone && _jsx("p", { className: "pc-muted", style: { ...SMALL, padding: '0 20px 20px' }, children: "\u00A9 pe caiet" })] }));
}
/** A signed-out page (sign in, create an account, reset or choose a password): the left half shows one pe caiet app at a time, the
 *  right half the form; on phones the left half is a bar with the logo and the form fills the width. */
export function SignIn({ title, description, error, notice, children, ...layout }) {
    return (_jsxs(SignedOut, { ...layout, paused: Boolean(error), children: [_jsxs("div", { style: { display: 'grid', gap: 'var(--pc-space-1)' }, children: [_jsx("h1", { className: "pc-page-title", children: title }), description && _jsx("p", { className: "pc-muted", children: description })] }), error && _jsx(Alert, { kind: "error", children: error }), notice && _jsx(Alert, { kind: "notice", children: notice }), children] }));
}
/** The sign-in form's password: its label row ends in "Forgot password?". */
export function SignInPassword({ label = 'Password', forgotHref, hint, error, id, className, autoComplete = 'current-password', ...input }) {
    const field = useField(id, error || hint, error, input['aria-describedby']);
    return (_jsxs("div", { className: cx('pc-field', className), children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--pc-space-2)' }, children: [_jsx(Label, { htmlFor: field.fieldId, children: label }), _jsx(Link, { href: forgotHref, style: SMALL, children: "Forgot password?" })] }), _jsx("input", { ...input, type: "password", autoComplete: autoComplete, className: "pc-input", id: field.fieldId, "aria-describedby": field.describedBy, "aria-invalid": field.invalid ?? input['aria-invalid'] }), _jsx(FieldMessage, { id: field.messageId, hint: hint, error: error })] }));
}
