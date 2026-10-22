import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { WarningCircle } from '@phosphor-icons/react';
import { Code } from './Code';
import { SignedOut } from './SignIn';
/** A signed-out page that says something went wrong and what to do: the sign-in layout with one card. */
export function ErrorPage({ title, description, code, codeDescription, action, ...layout }) {
    return (_jsx(SignedOut, { ...layout, paused: true, children: _jsxs("div", { className: "pc-card", children: [_jsxs("div", { className: "pc-card-header", children: [_jsx("span", { "aria-hidden": "true", style: {
                                display: 'grid',
                                placeItems: 'center',
                                width: 'var(--pc-size-48)',
                                height: 'var(--pc-size-48)',
                                marginBottom: 'var(--pc-space-2)',
                                borderRadius: 'var(--pc-radius-full)',
                                background: 'var(--destructive-soft)',
                                color: 'var(--destructive)',
                            }, children: _jsx(WarningCircle, { style: { width: 'var(--pc-size-24)', height: 'var(--pc-size-24)' } }) }), _jsx("h1", { className: "pc-page-title", children: title }), _jsx("p", { className: "pc-page-description", children: description })] }), _jsxs("div", { className: "pc-card-content", children: [code && _jsxs("p", { children: ["Error code: ", _jsx(Code, { children: code })] }), codeDescription && _jsx("p", { className: "pc-muted", children: codeDescription }), _jsx("div", { children: action })] })] }) }));
}
