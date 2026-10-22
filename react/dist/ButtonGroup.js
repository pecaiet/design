import { jsx as _jsx } from "react/jsx-runtime";
import { cx } from './cx';
/** Buttons side by side, 8px apart, each its own shape, wrapping when there's no room: page and dialog actions. At most one
 *  primary; a delete goes last. */
export function ButtonGroup({ className, ...div }) {
    return _jsx("div", { ...div, className: cx('pc-btn-group', className) });
}
/** Tools on a list or an editor (search, sort, view, more): ghost buttons, usually icon only, in a quiet tray. A tool that stays
 *  on is pressed. Choosing one of a few options is a SegmentedControl. */
export function Toolbar({ className, ...div }) {
    return _jsx("div", { ...div, className: cx('pc-toolbar', className) });
}
/** Between groups of tools in a Toolbar. */
export function ToolbarDivider({ className }) {
    return _jsx("span", { className: cx('pc-toolbar-divider', className) });
}
