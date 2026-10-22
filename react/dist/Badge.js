import { jsx as _jsx } from "react/jsx-runtime";
import { cx } from './cx';
export function Badge({ variant, small, className, ...span }) {
    return _jsx("span", { ...span, className: cx('pc-badge', variant && `pc-badge-${variant}`, small && 'pc-badge-small', className) });
}
