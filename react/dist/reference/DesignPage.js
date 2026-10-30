import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Heading, SkipLink, Stack } from '../index';
import { Basics } from './Basics';
import { Content } from './Content';
import { Data } from './Data';
import { Forms } from './Forms';
import { Overlays } from './Overlays';
import { Shell } from './Shell';
const SECTIONS = [
    { id: 'basics', title: 'Basics', body: _jsx(Basics, {}) },
    { id: 'content', title: 'Content', body: _jsx(Content, {}) },
    { id: 'forms', title: 'Forms', body: _jsx(Forms, {}) },
    { id: 'data', title: 'Data', body: _jsx(Data, {}) },
    { id: 'overlays', title: 'Overlays', body: _jsx(Overlays, {}) },
    { id: 'shell', title: 'App shell', body: _jsx(Shell, {}) },
];
// Every component of @pecaiet/design, as a living reference.
export function DesignPage() {
    // Tokens, not Tailwind classes: an app's Tailwind doesn't look in node_modules, so it wouldn't build them.
    return (_jsxs("main", { style: { maxWidth: 'var(--pc-width-960)', marginInline: 'auto', padding: 'var(--pc-space-8)' }, children: [_jsx(SkipLink, { href: "#basics", children: "Skip to the components" }), _jsxs(Stack, { gap: 6, children: [_jsx(Heading, { page: true, children: "Design" }), _jsx(Stack, { row: true, children: SECTIONS.map(section => (_jsx("a", { className: "pc-link", href: `#${section.id}`, children: section.title }, section.id))) }), SECTIONS.map(section => (_jsx("section", { id: section.id, tabIndex: -1, children: _jsxs(Stack, { gap: 6, children: [_jsx(Heading, { children: section.title }), section.body] }) }, section.id)))] })] }));
}
