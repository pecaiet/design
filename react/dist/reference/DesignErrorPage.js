import { jsx as _jsx } from "react/jsx-runtime";
import { Button, ErrorPage } from '../index';
export function DesignErrorPage() {
    return (_jsx(ErrorPage, { title: "Can\u2019t sign in to this app", description: "The app sent you here with a request we don\u2019t accept.", code: "invalid_redirect_uri", codeDescription: "The redirect URI isn\u2019t one of the app\u2019s.", action: _jsx(Button, { variant: "outline", href: "/design", children: "Back to the design" }) }));
}
