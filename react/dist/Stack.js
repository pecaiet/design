import { jsx as _jsx } from "react/jsx-runtime";
import { cx } from './cx';
export function Stack({ gap, row, className, ...div }) {
    return _jsx("div", { ...div, className: cx('pc-stack', gap && gap !== 3 && `pc-stack-${gap}`, row && 'pc-stack-row', className) });
}
