import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from 'react';
import { cx } from './cx';
/** Choosing exactly one of two to five options that are always in view: Dark, Light or System; List, Board or Calendar. The
 *  chosen one lifts as a raised pill that slides to the next. Separate tools that each do their own thing are a Toolbar. */
export function SegmentedControl({ name, value, defaultValue, onChange, full, disabled, iconsOnly, options, className, ...div }) {
    const auto = useId();
    const list = options;
    const [picked, setPicked] = useState(() => defaultValue ?? list[0]?.value);
    const chosen = value ?? picked;
    return (_jsx("div", { ...div, className: cx('pc-segmented', full && 'pc-segmented-full', className), role: "radiogroup", children: list.map(option => (_jsxs("label", { className: cx('pc-btn', 'pc-btn-ghost', iconsOnly && 'pc-btn-icon'), "data-pc-tooltip": iconsOnly ? option.label : undefined, children: [_jsx("input", { type: "radio", name: name ?? auto, value: option.value, checked: option.value === chosen, disabled: disabled || option.disabled, "aria-label": iconsOnly ? option.label : undefined, onChange: () => {
                        setPicked(option.value);
                        onChange?.(option.value);
                    } }), option.icon, !iconsOnly && option.label] }, option.value))) }));
}
