import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Card, IdpMark, Navigation, PageHeader, PeCaietMark, SettingsModal, SidebarItem, SidebarSection, Stack, TextInput, TodoMark, } from '../index';
import { usePhone } from '../shell';
import { CalendarDots, Devices, Gear, Palette, Plus, Tray, UserCircle } from '@phosphor-icons/react';
import { useState } from 'react';
const ACCOUNT = { email: 'ana@example.com', settingsHref: '/design/app', signOutHref: '/design', adminHref: '/design' };
// The app shell: sidebar, page header and the settings window, as an Inertia app would use them.
export function DesignAppPage() {
    const [settings, setSettings] = useState(false);
    const [section, setSection] = useState('Account');
    const phone = usePhone();
    return (_jsxs(Navigation, { switcher: {
            current: 'todo',
            home: { name: 'pe caiet', href: '/design', mark: _jsx(PeCaietMark, {}) },
            apps: [
                { name: 'todo', href: '/design/app', mark: _jsx(TodoMark, {}) },
                { name: 'idp', href: '/design/app', mark: _jsx(IdpMark, {}) },
            ],
        }, actions: _jsx(SidebarItem, { icon: _jsx(Plus, {}), onClick: () => { }, children: "New list" }), items: _jsxs(_Fragment, { children: [_jsx(SidebarItem, { href: "/design/app", icon: _jsx(Tray, {}), detail: 2, current: true, children: "Inbox" }), _jsx(SidebarItem, { href: "/design/app", icon: _jsx(CalendarDots, {}), detail: 4, alert: true, children: "Today" }), _jsxs(SidebarSection, { heading: "Lists", children: [_jsx(SidebarItem, { href: "/design/app", mark: "H", detail: 3, children: "Home" }), _jsx(SidebarItem, { href: "/design/app", mark: "W", children: "Work" })] })] }), account: ACCOUNT, children: [_jsx("div", { style: { padding: phone ? 'var(--pc-space-4)' : 'var(--pc-space-8)' }, children: _jsxs(Stack, { gap: 6, children: [_jsx(PageHeader, { title: "Inbox", description: "Everything that isn\u2019t in a list yet.", breadcrumbs: { parents: [{ label: 'Design', href: '/design' }], current: 'Inbox' }, actions: _jsx(Button, { variant: "outline", icon: _jsx(Gear, {}), onClick: () => setSettings(true), children: "Settings" }) }), _jsx(Card, { title: "Two tasks", description: "Open the settings window from the page header.", children: _jsx("p", { children: "Buy a cake \u00B7 Call Dan" }) })] }) }), _jsx(SettingsModal, { open: settings, onClose: () => setSettings(false), email: ACCOUNT.email, sections: [
                    { label: 'Account', href: '/design/app', icon: _jsx(UserCircle, {}), current: section === 'Account' },
                    { label: 'Sessions', href: '/design/app', icon: _jsx(Devices, {}), current: section === 'Sessions' },
                    { label: 'Preferences', href: '/design/app', icon: _jsx(Palette, {}), current: section === 'Preferences' },
                ], onClickCapture: event => {
                    // The demo has no settings pages behind these links: switch the section here instead of visiting.
                    const link = event.target.closest('a');
                    if (link?.textContent) {
                        event.preventDefault();
                        setSection(link.textContent.trim());
                    }
                }, children: _jsx(Card, { title: section, children: _jsx(TextInput, { label: "Email", defaultValue: ACCOUNT.email }) }) })] }));
}
