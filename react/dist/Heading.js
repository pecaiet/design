import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cx } from './cx';
export function Heading({ page, as: Tag = 'h2', description, className, ...heading }) {
    if (page)
        return _jsx("h1", { ...heading, className: cx('pc-page-title', className) });
    if (!description)
        return _jsx(Tag, { ...heading, className: cx('pc-section-title', className) });
    return (_jsxs("div", { className: className, style: { display: 'grid', gap: 'var(--pc-space-0-5)' }, children: [_jsx(Tag, { ...heading, className: "pc-section-title" }), _jsx("p", { className: "pc-section-description", children: description })] }));
}
