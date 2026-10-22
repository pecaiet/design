import { jsx as _jsx } from "react/jsx-runtime";
import { cx } from './cx';
export function Skeleton({ shape, className, ...span }) {
    return _jsx("span", { ...span, className: cx('pc-skeleton', shape && `pc-skeleton-${shape}`, className), "aria-hidden": "true" });
}
