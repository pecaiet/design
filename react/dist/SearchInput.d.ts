import { type ComponentPropsWithRef } from 'react';
export type SearchInputProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'children'> & {
    /** What it searches: "Search users". It's the example too, unless there's a placeholder. */
    'aria-label': string;
    /** While the results take a moment: a spinner in place of the x. */
    busy?: boolean;
};
/** Filtering a table or a list on a page, as people type. Once there's text an x clears it (onChange gets the empty value, as
 *  when they delete it). Say how many match near it; nothing matches is an EmptyState that repeats the words. */
export declare function SearchInput({ busy, placeholder, onChange, className, ref, ...input }: SearchInputProps): import("react").JSX.Element;
