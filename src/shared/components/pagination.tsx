import { ComponentProps } from 'react';
import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    Pagination as PaginationUI,
} from '~components-ui/pagination';
import { usePagination } from '~hook';
import { cn } from '~utils';

interface IProps extends ComponentProps<'nav'> {
    searchParams: URLSearchParams;
    pagination: { totalItems: number; totalItemsPerPage: number; currentPage: number; pageRanges: number };
}

function Pagination({ pagination, searchParams, className, ...props }: IProps) {
    const pageCount = Math.round(pagination.totalItems / pagination.totalItemsPerPage);
    const pages = usePagination({ page: pagination.currentPage, pageCount });
    const previousParams = new URLSearchParams(searchParams);
    const nextParams = new URLSearchParams(searchParams);

    previousParams.set('page_number', String(Math.max(pagination.currentPage - 1, 1)));
    nextParams.set('page_number', String(Math.min(pagination.currentPage + 1, pageCount)));

    return (
        <PaginationUI className={className} {...props}>
            <PaginationContent className='gap-2 sm:gap-1 flex-wrap'>
                <PaginationItem>
                    <PaginationPrevious
                        to={{ search: previousParams.toString() }}
                        className={cn('w-8 h-8 sm:w-10 sm:h-10', {
                            'opacity-50 pointer-events-none': pagination.currentPage === 1,
                        })}
                    />
                </PaginationItem>

                {pages.map((page, index) => {
                    const newParams = new URLSearchParams(searchParams);
                    if (page !== 'ellipsis') {
                        newParams.set('page_number', page.toString());
                    }
                    return (
                        <PaginationItem key={index + '-' + page}>
                            {page === 'ellipsis' ? (
                                <PaginationEllipsis className='w-8 h-8 sm:w-10 sm:h-10' />
                            ) : (
                                <PaginationLink
                                    to={{ search: newParams.toString() }}
                                    isActive={page === pagination.currentPage}
                                    className='w-8 h-8 sm:w-10 sm:h-10'
                                >
                                    {page}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    );
                })}

                <PaginationItem>
                    <PaginationNext
                        to={{ search: nextParams.toString() }}
                        className={cn('w-8 h-8 sm:w-10 sm:h-10', {
                            'opacity-50 pointer-events-none': pagination.currentPage > pageCount,
                        })}
                    />
                </PaginationItem>
            </PaginationContent>
        </PaginationUI>
    );
}

export default Pagination;
