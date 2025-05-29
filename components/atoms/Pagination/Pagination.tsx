import {
    Pagination as Paginate,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationLink,
    PaginationEllipsis,
    PaginationNext
} from '@ui/pagination';
import {PaginationProps} from "@typesFront";
import {JSX} from "react";
import {cn} from '@lib'

const Pagination: ({currentPage, totalPages, onChangeEvent}: PaginationProps) => JSX.Element = ({
                                                                                                    currentPage,
                                                                                                    totalPages,
                                                                                                    onChangeEvent,
                                                                                                    className,
                                                                                                    ...other
                                                                                                }: PaginationProps): JSX.Element =>
{
    const getPageNumbers: () => JSX.Element[] = (): JSX.Element[] =>
    {
        const pages: JSX.Element[] = [];
        const maxVisible = 5;
        let startPage: number = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        const endPage: number = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible)
        {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        if (startPage > 1)
        {
            pages.push(
                <PaginationItem key={1}>
                    <PaginationLink onClick={() => onChangeEvent(1)}>1</PaginationLink>
                </PaginationItem>
            );
            if (startPage > 2)
            {
                pages.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis/>
                    </PaginationItem>
                );
            }
        }

        for (let i: number = startPage; i <= endPage; i++)
        {
            pages.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        isActive={i === currentPage}
                        onClick={(): void => onChangeEvent(i)}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        if (endPage < totalPages)
        {
            if (endPage < totalPages - 1)
            {
                pages.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis/>
                    </PaginationItem>
                );
            }
            pages.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink onClick={() => onChangeEvent(totalPages)}>
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return pages;
    };

    return (
        <Paginate {...other} className={cn("select-none", className)}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => onChangeEvent(Math.max(1, currentPage - 1))}
                        aria-disabled={currentPage <= 1}
                        className={currentPage <= 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    />
                </PaginationItem>

                {getPageNumbers()}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => onChangeEvent(Math.min(totalPages, currentPage + 1))}
                        aria-disabled={currentPage >= totalPages}
                        className={currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    />
                </PaginationItem>
            </PaginationContent>
        </Paginate>
    );
}

export default Pagination