import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Link, SignIn as SignInPage, SignInPassword, TextInput } from '../index';
export function DesignSignInPage() {
    return (_jsxs(SignInPage, { title: "Sign in", description: _jsxs(_Fragment, { children: ["New here? ", _jsx(Link, { href: "/design/sign-in", children: "Create an account" })] }), onSubmit: event => event.preventDefault(), children: [_jsx(TextInput, { label: "Email", type: "email", autoComplete: "email", placeholder: "ana@example.com" }), _jsx(SignInPassword, { forgotHref: "/design/sign-in" }), _jsx(Button, { variant: "primary", full: true, type: "submit", children: "Sign in" })] }));
}
