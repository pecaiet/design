import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cx } from './cx';
export function EmptyState({ title, description, className, ...div }) {
    return (_jsxs("div", { ...div, className: cx('pc-empty', className), children: [_jsx("p", { className: "pc-empty-title", children: title }), description && _jsx("p", { className: "pc-empty-description", children: description })] }));
}
