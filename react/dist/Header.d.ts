import type { ComponentPropsWithRef, ReactNode } from 'react';
import { type Account } from './SidebarAccount';
export type HeaderProps = Omit<ComponentPropsWithRef<'header'>, 'children'> & {
    /** On the left, where it sits on the sign-in page: pe caiet's logo unless you pass another AppLogo. */
    logo?: ReactNode;
    /** Who is signed in, on the right: the account row with an up-down caret, as wide as its content. */
    account: Account;
};
/** The bar across the top of a page without a sidebar (only pe caiet's root page): the logo, and the account row whose menu opens
 *  down from it, aligned to its right edge (a sheet on phones). 72px tall and 28px from the edges; on phones 52px and 20px, in the
 *  sidebar colour. */
export declare function Header({ logo, account, style, ...header }: HeaderProps): import("react").JSX.Element;
