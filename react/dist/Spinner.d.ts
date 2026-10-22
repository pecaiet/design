export type SpinnerProps = {
    /** Read out instead of the turning circle: "Loading", "Working". */
    label?: string;
    /** small 12px in tight spots, large 20px on its own; 16px beside text by default. */
    size?: 'small' | 'large';
    className?: string;
};
export declare function Spinner({ label, size, className }: SpinnerProps): import("react").JSX.Element;
