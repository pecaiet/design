import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Star } from '@phosphor-icons/react';
import { useId } from 'react';
import { cx } from './cx';
const STARS = [1, 2, 3, 4, 5];
/** How something was rated: teal stars, empty ones outlined, and the number. */
export function Rating({ value, count, compact, className, ...span }) {
    const number = value.toFixed(1);
    return (_jsxs("span", { ...span, className: cx('pc-rating', compact && 'pc-rating-compact', className), children: [_jsx("span", { className: "pc-rating-stars", role: "img", "aria-label": `${number} out of 5`, children: (compact ? [1] : STARS).map(star => {
                    const fill = compact ? 100 : Math.round(Math.min(Math.max(value - star + 1, 0), 1) * 100);
                    return (_jsxs("span", { className: "pc-rating-star", style: fill < 100 ? { '--fill': `${fill}%` } : undefined, children: [_jsx(Star, {}), _jsx(Star, { weight: "fill" })] }, star));
                }) }), _jsx("span", { className: "pc-rating-value", children: number }), count && _jsx("span", { className: "pc-rating-count", children: count })] }));
}
/** Setting a rating: five stars, each a radio. The chosen star and those before it fill; under the pointer they fill lighter
 *  until clicked; the arrow keys move it, as in any radio group. */
export function RatingInput({ label, name, value, defaultValue, onChange, description, disabled, id, className, ...span }) {
    const auto = useId();
    const labelId = `${id ?? auto}-label`;
    const rating = (_jsxs("span", { className: cx('pc-rating', !label && className), children: [_jsx("span", { ...span, className: "pc-rating-input", id: id, role: "radiogroup", "aria-labelledby": label ? labelId : undefined, children: STARS.map(star => (_jsxs("label", { className: "pc-rating-star", children: [_jsx("input", { type: "radio", name: name ?? auto, value: star, "aria-label": star === 1 ? '1 star' : `${star} stars`, checked: value === undefined ? undefined : value === star, defaultChecked: value === undefined ? defaultValue === star : undefined, disabled: disabled, onChange: () => onChange?.(star) }), _jsx(Star, {}), _jsx(Star, { weight: "fill" })] }, star))) }), description && _jsx("span", { className: "pc-rating-count", children: description })] }));
    if (!label)
        return rating;
    return (_jsxs("div", { className: cx('pc-field', className), children: [_jsx("span", { className: "pc-label", id: labelId, children: label }), rating] }));
}
