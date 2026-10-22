import { jsx as _jsx } from "react/jsx-runtime";
import { cx } from './cx';
/** Words for screen readers only, that the eye gets from the layout: the "tasks" after a count, the name of a column with no
 *  visible heading. An icon button names itself with aria-label instead. */
export function VisuallyHidden({ focusable, className, ...span }) {
    return _jsx("span", { ...span, className: cx(focusable ? 'pc-visually-hidden-focusable' : 'pc-visually-hidden', className) });
}
