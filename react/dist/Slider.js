import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from 'react';
import { cx } from './cx';
/** "About this much" in a range, by dragging a handle; teal up to the value. For an exact number, a TextInput or a Stepper. */
export function Slider({ label, min = 0, max = 100, step, value, defaultValue, format, marks, onChange, id, style, className, ...input }) {
    const auto = useId();
    const labelId = `${id ?? auto}-label`;
    const [moved, setMoved] = useState(() => defaultValue ?? min + (max - min) / 2);
    const current = value ?? moved;
    const words = format?.(current);
    const slider = (_jsx("input", { ...input, className: cx('pc-slider', !label && !marks && className), type: "range", id: id, min: min, max: max, step: step, value: value, defaultValue: value === undefined ? defaultValue : undefined, style: { '--value': `${((current - min) / (max - min)) * 100}%`, ...style }, "aria-labelledby": label && !input['aria-label'] ? labelId : undefined, "aria-valuetext": typeof words === 'string' ? words : undefined, onChange: event => {
            setMoved(Number(event.target.value));
            onChange?.(event);
        } }));
    if (!label && !marks)
        return slider;
    return (_jsxs("div", { className: cx('pc-field', className), children: [label && (_jsxs("div", { className: "pc-progress-head", children: [_jsx("span", { className: "pc-label", id: labelId, children: label }), words !== undefined && _jsx("span", { className: "pc-progress-value", children: words })] })), slider, marks && (_jsx("div", { className: "pc-slider-marks", "aria-hidden": "true", children: Array.from({ length: Math.round((max - min) / (step ?? 1)) + 1 }, (_, i) => _jsx("span", {}, i)) }))] }));
}
/** A range with two handles, From and To, teal between them. */
export function SliderRange({ label, min = 0, max = 100, step, value, defaultValue, onChange, format, disabled, style, className, ...div }) {
    const [moved, setMoved] = useState(() => defaultValue ?? [min, max]);
    const [from, to] = value ?? moved;
    const percent = (n) => `${((n - min) / (max - min)) * 100}%`;
    const change = (next) => {
        setMoved(next);
        onChange?.(next);
    };
    return (_jsxs("div", { className: cx('pc-field', className), children: [_jsxs("div", { className: "pc-progress-head", children: [_jsx("span", { className: "pc-label", children: label }), format && _jsx("span", { className: "pc-progress-value", children: format([from, to]) })] }), _jsxs("div", { ...div, className: "pc-slider-range", style: { '--from': percent(from), '--to': percent(to), ...style }, children: [_jsx("input", { className: "pc-slider", type: "range", min: min, max: max, step: step, value: from, disabled: disabled, "aria-label": "From", onChange: event => change([Math.min(Number(event.target.value), to), to]) }), _jsx("input", { className: "pc-slider", type: "range", min: min, max: max, step: step, value: to, disabled: disabled, "aria-label": "To", onChange: event => change([from, Math.max(Number(event.target.value), from)]) })] })] }));
}
