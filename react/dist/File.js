import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DownloadSimple, FileIcon, FileImage, FilePdf, FileText, FileXls, X } from '@phosphor-icons/react';
import { useEffect, useRef } from 'react';
import { Button } from './Button';
import { cx } from './cx';
import { enter as grow, leave } from './motion';
const KINDS = [
    [/\.pdf$/i, _jsx(FilePdf, {})],
    [/\.(xlsx?|csv|ods|numbers)$/i, _jsx(FileXls, {})],
    [/\.(png|jpe?g|gif|webp|avif|heic|svg)$/i, _jsx(FileImage, {})],
    [/\.(txt|md|rtf|docx?|odt|pages)$/i, _jsx(FileText, {})],
];
/** FileRows, 2px apart. */
export function Files({ className, ...div }) {
    return _jsx("div", { ...div, className: cx('pc-files', className) });
}
/** A file as a row, like a task or menu row: its icon, its name and its size. */
export function FileRow({ name, size, icon, enter, className, ...element }) {
    const ref = useRef(null);
    useEffect(() => {
        if (enter)
            grow(ref.current);
    }, []);
    const look = cx('pc-file', className);
    const inner = (_jsxs(_Fragment, { children: [icon ?? KINDS.find(([ending]) => ending.test(name))?.[1] ?? _jsx(FileIcon, {}), _jsx("span", { className: "pc-file-name", children: name }), _jsx("span", { className: "pc-file-size", children: size })] }));
    if (element.href !== undefined) {
        const { onRemove, download = true, ...link } = element;
        return (_jsxs("a", { ...link, ref: ref, className: look, download: download, children: [inner, _jsx(DownloadSimple, { className: "pc-file-action" })] }));
    }
    const { onRemove, href, ...div } = element;
    const remove = async () => {
        await leave(ref.current);
        onRemove();
    };
    return (_jsxs("div", { ...div, ref: ref, className: look, children: [inner, _jsx(Button, { variant: "ghost", icon: _jsx(X, {}), label: `Remove ${name}`, onClick: remove })] }));
}
