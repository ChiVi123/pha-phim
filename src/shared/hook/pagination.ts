import { range } from '~utils';

export interface IPaginationProps {
    page?: number;
    boundary?: number;
    sibling?: number;
    pageCount?: number;
}

type Page = number | 'ellipsis';

/**
 *
 * `usePagination` may not optimize, you can modify file (hook/hooks)/index.ts find arrow function usePagination
 * or crt + click to find the hook.
 *
 * @param props.page the current page.
 * @param props.boundary number of always visible pages at the beginning and end.
 * @param props.sibling number of always visible pages before and after the current page.
 * @param props.pageCount the total number of pages.
 *
 */
export const usePagination = (props: IPaginationProps): Page[] => {
    const { page = 1, boundary = 1, sibling = 1, pageCount = 1 } = props;
    const display = sibling * 2 + 1;

    // start and end pages always visible
    const startPages = range(1, Math.min(boundary, pageCount));
    const endPages = range(Math.max(pageCount - boundary + 1, boundary + 1), pageCount);

    // page ellipsis
    const startPageEllipsis = boundary + 1;
    const endPageEllipsis = pageCount - boundary;

    // page center
    const naturalStart = page - sibling;
    const whenPageIsHigh = pageCount - boundary - display;
    const greaterThanStartPages = startPageEllipsis + 1;

    const naturalEnd = page + sibling;
    const whenPageIsLow = boundary + display + 1;
    const lessThanEndPages = endPageEllipsis - 1;

    const start = Math.max(Math.min(naturalStart, whenPageIsHigh), greaterThanStartPages);
    const end = Math.min(Math.max(naturalEnd, whenPageIsLow), lessThanEndPages);
    const pageCenter = range(start, end);

    // ellipsis
    const startEllipsis: Page[] =
        start > startPageEllipsis + 1 ? ['ellipsis'] : startPageEllipsis < endPageEllipsis ? [startPageEllipsis] : [];
    const endEllipsis: Page[] =
        end < endPageEllipsis - 1 ? ['ellipsis'] : endPageEllipsis > boundary ? [endPageEllipsis] : [];

    return [...startPages, ...startEllipsis, ...pageCenter, ...endEllipsis, ...endPages];
};
