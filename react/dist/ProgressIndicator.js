import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cx } from './cx';
/** Where someone is in a few steps. It only shows where they are: moving between steps is the page's own buttons. */
export function ProgressIndicator({ steps, compact, vertical, className, ...ol }) {
    const list = (_jsx("ol", { "aria-label": "Steps", ...ol, className: cx('pc-steps', vertical && 'pc-steps-vertical', !compact && className), children: steps.map(({ label, state }, i) => (_jsx("li", { className: "pc-step", "aria-current": state === 'current' ? 'step' : undefined, "data-state": state === 'current' ? undefined : state, children: _jsx("span", { className: "pc-step-label", children: label }) }, i))) }));
    if (!compact)
        return list;
    const found = steps.findIndex(step => step.state !== 'done');
    const now = found === -1 ? steps.length - 1 : found;
    return (_jsxs("div", { className: cx('pc-steps-compact', className), children: [_jsxs("div", { className: "pc-steps-head", children: [_jsx("span", { className: "pc-steps-now", children: steps[now]?.label }), _jsxs("span", { className: "pc-steps-count", children: ["Step ", now + 1, " of ", steps.length] })] }), list] }));
}
