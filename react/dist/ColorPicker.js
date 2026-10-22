import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Plus } from '@phosphor-icons/react';
import { useId, useState } from 'react';
import { cx } from './cx';
const COLOURS = ['gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'purple', 'pink'];
/** A colour from the set, or any colour: the rainbow ring at the end opens the device's own chooser, and the colour picked
 *  there fills its middle. It stays in the ring to go back to when one from the set is chosen. */
export function ColorPicker({ label, name, value, defaultValue, onChange, id, className, ...div }) {
    const auto = useId();
    const labelId = `${id ?? auto}-label`;
    const [picked, setPicked] = useState(defaultValue);
    const chosen = value ?? picked;
    const [custom, setCustom] = useState(() => (chosen?.startsWith('#') ? chosen : undefined));
    const ring = chosen?.startsWith('#') ? chosen : custom;
    const choose = (colour) => {
        setPicked(colour);
        onChange?.(colour);
    };
    const swatches = (_jsxs("div", { ...div, className: cx('pc-swatches', !label && className), id: id, role: "radiogroup", "aria-labelledby": label ? labelId : undefined, children: [COLOURS.map(colour => {
                const words = colour[0].toUpperCase() + colour.slice(1);
                return (_jsx("label", { className: cx('pc-swatch', `pc-colour-${colour}`), "data-pc-tooltip": words, children: _jsx("input", { type: "radio", name: name ?? auto, value: colour, "aria-label": words, checked: chosen === colour, onChange: () => choose(colour) }) }, colour));
            }), _jsxs("label", { className: "pc-swatch pc-swatch-custom", "data-pc-tooltip": "Custom colour", style: ring ? { '--pc-colour': ring } : undefined, children: [_jsx("input", { type: "color", "aria-label": "Custom colour", value: ring ?? '#000000', onChange: event => {
                            const hex = event.target.value;
                            setCustom(hex);
                            choose(hex);
                        } }), ring && (_jsx("input", { type: "radio", name: name ?? auto, value: ring, "aria-label": `Custom colour ${ring.toUpperCase()}`, checked: chosen === ring, onChange: () => choose(ring) })), _jsx("span", { className: "pc-swatch-ring" }), _jsx(Plus, {})] })] }));
    if (!label)
        return swatches;
    return (_jsxs("div", { className: cx('pc-field', className), children: [_jsx("span", { className: "pc-label", id: labelId, children: label }), swatches] }));
}
