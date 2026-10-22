import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cx } from './cx';
export function Quote({ variant, name, source, avatar, children, className, ...figure }) {
    return (_jsxs("figure", { ...figure, className: cx('pc-quote', variant && `pc-quote-${variant}`, className), children: [_jsx("blockquote", { children: _jsx("p", { children: children }) }), (name || source) && (_jsxs("figcaption", { children: [avatar, _jsxs("span", { children: [name && _jsx("span", { className: "pc-quote-name", children: name }), name && source && ', ', source] })] }))] }));
}
