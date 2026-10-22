import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CaretLeft, X } from '@phosphor-icons/react';
import { useId } from 'react';
import { Button } from './Button';
import { cx } from './cx';
import { Dialog } from './Modal';
/** A panel from the right with a form or a record's details. A yes/no question stays a Modal. */
export function Drawer({ title, children, footer, ...props }) {
    const id = useId();
    const parts = (_jsxs(_Fragment, { children: [_jsxs("div", { className: "pc-drawer-head", children: [props.back && (_jsx(Button, { variant: "ghost", icon: _jsx(CaretLeft, {}), label: props.back, className: "pc-drawer-back", "data-pc-tooltip-side": "bottom", onClick: props.onClose })), _jsx("h2", { className: "pc-drawer-title", id: id, children: title }), _jsx(Button, { variant: "ghost", icon: _jsx(X, {}), label: "Close", className: "pc-drawer-close", "data-pc-tooltip-side": "bottom", onClick: props.onClose })] }), _jsx("div", { className: "pc-drawer-body", children: children }), footer && _jsx("div", { className: "pc-drawer-footer", children: footer })] }));
    if (props.beside) {
        const { beside, back, onClose, className, ...aside } = props;
        return _jsx("aside", { "aria-labelledby": id, ...aside, className: cx('pc-drawer', 'pc-drawer-beside', className), children: parts });
    }
    const { beside, back, ...dialog } = props;
    return _jsx(Dialog, { "aria-labelledby": id, ...dialog, kind: "drawer", children: parts });
}
