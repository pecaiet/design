import { type HTMLAttributes, type ReactNode, type SVGProps } from 'react';
export type AppLogoProps = HTMLAttributes<HTMLSpanElement> & {
    /** The app's square mark (PeCaietMark), or a letter as a stand-in. */
    mark: ReactNode;
    /** The app's name: "pe caiet". */
    children: ReactNode;
};
/** The app's mark and name, as at the top of the sign-in page and the Header. */
export declare function AppLogo({ mark, children, className, ...span }: AppLogoProps): import("react").JSX.Element;
export type MarkProps = SVGProps<SVGSVGElement>;
/** pe caiet's square mark (pe-caiet.svg). It fills a .pc-app-logo-mark slot. */
export declare function PeCaietMark(props: MarkProps): import("react").JSX.Element;
/** todo's square mark (todo.svg). */
export declare function TodoMark(props: MarkProps): import("react").JSX.Element;
/** idp's square mark (idp.svg). */
export declare function IdpMark(props: MarkProps): import("react").JSX.Element;
/** pe caiet's word (pe-caiet-word.svg), in the text colour: the Footer's. */
export declare function PeCaietWord(props: MarkProps): import("react").JSX.Element;
/** todo's word (todo-word.svg). */
export declare function TodoWord(props: MarkProps): import("react").JSX.Element;
