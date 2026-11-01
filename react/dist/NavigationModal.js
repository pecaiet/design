import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { XIcon } from '@phosphor-icons/react';
import { useId, useRef, useState } from 'react';
import { Button } from './Button';
import { cx } from './cx';
import { Dialog } from './Modal';
import { SidebarContext, SidebarToggle } from './Navigation';
import { useSheet } from './shell';
/** A big window over the page with its own nav: Navigation, inside a modal (settings, an account, help). The app opens it over the
 *  page you are on (open), and the x, Escape and a click on the dimmed page call onClose, which goes back there. Up to 960 × 640
 *  on desktop; on phones it fills the screen and its toggle opens the nav as a sheet, which the backdrop or Escape closes first.
 *  Keep it mounted across rows (a persistent layout), so moving between them doesn't open it again. */
export function NavigationModal({ title, items, footer, heading, closeLabel, children, onClose, ...dialog }) {
    const id = useId();
    const frame = useRef(null);
    const [sheet, setSheet] = useState(false);
    useSheet(sheet, () => setSheet(false), frame, `${id}-nav`);
    return (_jsxs(Dialog, { "aria-labelledby": `${id}-title`, ...dialog, kind: "modal", onClose: onClose, children: [_jsxs("div", { ref: frame, className: cx('pc-modal-frame', sheet && 'pc-sidebar-sheet'), children: [_jsx("div", { className: "pc-sheet-backdrop", onClick: () => setSheet(false) }), _jsxs("nav", { id: `${id}-nav`, className: "pc-sidebar pc-modal-nav", "aria-label": title, children: [_jsx("div", { className: "pc-sidebar-head", children: _jsx("h2", { id: `${id}-title`, className: "pc-dialog-title", children: title }) }), items, footer && (_jsx("div", { className: "pc-sidebar-footer", children: _jsx("div", { className: "pc-modal-nav-user", children: footer }) }))] })] }), _jsxs("section", { className: "pc-modal-main", inert: sheet, children: [_jsxs("div", { className: "pc-modal-head", children: [_jsxs("div", { className: "pc-page-title-row", children: [_jsx(SidebarContext, { value: { open: sheet, toggle: () => setSheet(!sheet), id: `${id}-nav` }, children: _jsx(SidebarToggle, {}) }), _jsx("h2", { className: "pc-page-title", children: heading })] }), _jsx(Button, { variant: "ghost", icon: _jsx(XIcon, {}), label: closeLabel, "data-pc-tooltip-side": "bottom", onClick: onClose })] }), _jsx("div", { className: "pc-modal-body", children: children })] })] }));
}
