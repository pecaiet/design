import { jsx as _jsx } from "react/jsx-runtime";
import { cx } from './cx';
/** The first thing in the page, out of sight until the first Tab. A page with two places to skip to has two, one after the other. */
export function SkipLink({ className, ...link }) {
    return _jsx("a", { ...link, className: cx('pc-skip-link', className) });
}
