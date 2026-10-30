import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppLogo, Card, Footer, Header, Link, PeCaietMark, PeCaietWord, Stack, ThemeSwitch, TodoMark, TodoWord } from '../index';
import { CaretRight } from '@phosphor-icons/react';
const ACCOUNT = { email: 'ana@example.com', settingsHref: '/design/app', signOutHref: '/design' };
export function Shell() {
    return (_jsxs(_Fragment, { children: [_jsx(Card, { title: "Whole pages", description: "They take the whole window, so each has its own address.", children: _jsxs(Stack, { children: [_jsx(Link, { href: "/design/app", iconAfter: _jsx(CaretRight, {}), children: "The app shell: sidebar, page header, settings window" }), _jsx(Link, { href: "/design/sign-in", iconAfter: _jsx(CaretRight, {}), children: "Sign in" }), _jsx(Link, { href: "/design/error", iconAfter: _jsx(CaretRight, {}), children: "Error page" })] }) }), _jsx(Card, { title: "App logo", children: _jsxs(Stack, { row: true, children: [_jsx(AppLogo, { mark: _jsx(PeCaietMark, {}), children: "pe caiet" }), _jsx(AppLogo, { mark: _jsx(TodoMark, {}), children: "todo" })] }) }), _jsx(Card, { title: "Header", rows: true, children: _jsx(Header, { account: ACCOUNT }) }), _jsx(Card, { title: "Theme switch", children: _jsx(ThemeSwitch, {}) }), _jsx(Card, { title: "Footer", rows: true, children: _jsxs(Stack, { gap: 6, children: [_jsx(Footer, { word: _jsx(PeCaietWord, {}), copyright: "\u00A9 2026 pe caiet", language: "English", groups: [
                                {
                                    heading: 'Apps',
                                    links: [
                                        { label: 'todo', href: '/design' },
                                        { label: 'idp', href: '/design' },
                                    ],
                                },
                                {
                                    heading: 'About',
                                    links: [
                                        { label: 'Privacy', href: '/design' },
                                        { label: 'Terms', href: '/design' },
                                    ],
                                },
                            ] }), _jsx(Footer, { word: _jsx(TodoWord, {}), copyright: "\u00A9 2026 todo", links: [
                                { label: 'Privacy', href: '/design' },
                                { label: 'Help', href: '/design' },
                            ] })] }) })] }));
}
