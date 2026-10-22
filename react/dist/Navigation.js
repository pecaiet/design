import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TextIndent, TextOutdent } from '@phosphor-icons/react';
import { createContext, useContext, useId, useRef, useState } from 'react';
import { AppSwitcher } from './AppSwitcher';
import { Button } from './Button';
import { cx } from './cx';
import { usePhone, useSheet } from './shell';
import { SidebarAccount } from './SidebarAccount';
/** What a toggle in a title row opens and closes: the app's sidebar, or the settings window's nav. Not exported from the package. */
export const SidebarContext = createContext(null);
/** The sidebar around this page, for a toggle of your own: open, and toggle(). Null outside a Navigation. */
export const useSidebar = () => useContext(SidebarContext);
/** The one toggle that opens and closes the sidebar, first in the page's title row (PageHeader puts it there). Open, it points left
 *  (text-outdent, "Close sidebar"); closed, right (text-indent, "Open sidebar"). Nothing outside a Navigation. */
export function SidebarToggle({ className }) {
    const sidebar = useContext(SidebarContext);
    if (!sidebar)
        return null;
    return (_jsx(Button, { variant: "ghost", icon: sidebar.open ? _jsx(TextOutdent, {}) : _jsx(TextIndent, {}), label: sidebar.open ? 'Close sidebar' : 'Open sidebar', className: cx('pc-sidebar-toggle', className), "aria-expanded": sidebar.open, "aria-controls": sidebar.id, "data-pc-tooltip-side": "bottom", onClick: sidebar.toggle }));
}
// Desktop: sticky and one screen tall; the rows scroll inside it when they don't fit.
const FRAME = { position: 'sticky', top: 0, display: 'flex', flexShrink: 0, alignSelf: 'flex-start', height: '100dvh' };
const remembered = () => {
    try {
        return !/(?:^|; )sidebar=closed(?:;|$)/.test(document.cookie);
    }
    catch {
        return true;
    }
};
/** The app's frame: the sidebar (the app switcher, the rows, the footer with the account row) and the page beside it. The toggle in
 *  each page's title row opens and closes it. Desktop: it slides closed while the page widens, remembered in the sidebar cookie.
 *  Phones: always starts closed; the toggle opens it as a sheet over the dimmed page, which the backdrop, Escape or a visit closes. */
export function Navigation({ switcher, items, actions, account, children, style, ...div }) {
    const phone = usePhone();
    const id = useId();
    const frame = useRef(null);
    const [open, setOpen] = useState(remembered);
    const [sheet, setSheet] = useState(false);
    const sheetOpen = phone && sheet;
    useSheet(sheetOpen, () => setSheet(false), frame, id);
    const toggle = () => {
        if (phone)
            return setSheet(!sheet);
        setOpen(!open);
        try {
            document.cookie = `sidebar=${open ? 'closed' : 'open'}; path=/; max-age=31536000; samesite=lax`;
        }
        catch { }
    };
    return (_jsx(SidebarContext, { value: { open: phone ? sheet : open, toggle, id }, children: _jsxs("div", { ...div, style: { ...(phone ? undefined : { display: 'flex', minHeight: '100dvh' }), ...style }, children: [_jsxs("div", { ref: frame, hidden: phone && !sheet, className: sheetOpen ? 'pc-sidebar-sheet' : undefined, role: sheetOpen ? 'dialog' : undefined, "aria-modal": sheetOpen || undefined, "aria-label": sheetOpen ? switcher.current : undefined, style: phone ? undefined : FRAME, children: [phone && _jsx("div", { className: "pc-sheet-backdrop", onClick: () => setSheet(false) }), _jsxs("nav", { id: id, className: "pc-sidebar", "aria-label": switcher.current, "data-state": !phone && !open ? 'closed' : undefined, children: [_jsx(AppSwitcher, { ...switcher }), items, _jsxs("div", { className: "pc-sidebar-footer", children: [actions, _jsx(SidebarAccount, { ...account })] })] })] }), _jsx("main", { inert: sheetOpen, style: { flex: 1, minWidth: 0 }, children: children })] }) }));
}
