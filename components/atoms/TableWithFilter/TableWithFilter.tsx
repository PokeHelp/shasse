"use client";

import {cn} from "@lib";
import {ChangeEvent, JSX, RefObject, useId, useMemo, useRef, useState} from "react";
import {
    ColumnDef, ColumnFiltersState, PaginationState,
    SortingState, VisibilityState, flexRender, getCoreRowModel, getFacetedUniqueValues, getFilteredRowModel,
    getPaginationRowModel, getSortedRowModel, useReactTable, Row, Table as TanstackTable, Column, Header, HeaderGroup
} from "@tanstack/react-table";
import {
    ChevronDown, ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, ChevronUp, CircleX, Columns3, Filter, ListFilter
} from "lucide-react";
import {Button} from "@ui/button";
import {Checkbox} from "@ui/checkbox";
import {
    DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger
} from "@ui/dropdown-menu";
import {Input} from "@ui/input";
import {Label} from "@ui/label";
import {Pagination, PaginationContent, PaginationItem} from "@ui/pagination";
import {Popover, PopoverContent, PopoverTrigger} from "@ui/popover";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@ui/select";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@ui/table";
import {CustomColumnDefTable, TableWithFilterProps} from "@typesFront";
import {CheckedState} from "@radix-ui/react-checkbox";
import {useTranslations} from "next-intl";

export default function TableWithFilter<T>({
                                               data,
                                               defaultSorting,
                                               rawColumns,
                                               placeholder,
                                               rowsPerPageSelection = [5, 10, 25, 50]
                                           }: TableWithFilterProps<T>): JSX.Element
{
    const id: string = useId();
    const inputRef: RefObject<HTMLInputElement | null> = useRef<HTMLInputElement>(null);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 10});
    const [sorting, setSorting] = useState<SortingState>(defaultSorting ?? []);
    const t = useTranslations('tableWithFilter');

    const searchKeys: (string | (keyof T & string))[] = rawColumns.filter((c: CustomColumnDefTable<T>): c is CustomColumnDefTable<T> & {
        search: true;
        accessorKey: string
    } => !!c.search && !!c.accessorKey).map((c: CustomColumnDefTable<T> & {
        search: true;
        accessorKey: string
    }): (string | (keyof T & string)) => c.accessorKey);

    const buildColumns: (cols: CustomColumnDefTable<T>[]) => ColumnDef<T>[] = (cols: CustomColumnDefTable<T>[]): ColumnDef<T>[] =>
    {
        const globalSearchFn: ((row: Row<T>, _: string, val: unknown) => boolean) | undefined =
                  searchKeys.length
                      ? (row: Row<T>, _: string, val: unknown): boolean =>
                        searchKeys.some((key: string | (keyof T & string)): boolean => `${row.getValue(key)}`.toLowerCase().includes(`${val ?? ''}`.toLowerCase()))
                      : undefined;

        return cols.map((c: CustomColumnDefTable<T>) =>
        {
            const newCol = {...c};
            if (c.filter)
            {
                newCol.filterFn = (row: Row<T>, columnId: string, filterValue: string[]): boolean =>
                    !filterValue?.length || filterValue.includes(String(row.getValue(columnId)));
            } else if (c.search && globalSearchFn)
            {
                newCol.filterFn = globalSearchFn;
            }
            return newCol;
        });
    };

    const columns: ColumnDef<T>[] = buildColumns(rawColumns);

    const table: TanstackTable<T> = useReactTable({
        data,
        columns,
        getCoreRowModel:          getCoreRowModel(),
        getSortedRowModel:        getSortedRowModel(),
        onSortingChange:          setSorting,
        enableSortingRemoval:     false,
        getPaginationRowModel:    getPaginationRowModel(),
        onPaginationChange:       setPagination,
        onColumnFiltersChange:    setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getFilteredRowModel:      getFilteredRowModel(),
        getFacetedUniqueValues:   getFacetedUniqueValues(),
        state:                    {sorting, pagination, columnFilters, columnVisibility},
    });

    const statusCounts: Map<string, number> = useMemo((): Map<string, number> =>
    {
        const counts = new Map<string, number>();
        rawColumns.filter((c: CustomColumnDefTable<T>): c is CustomColumnDefTable<T> & {
            filter: true;
            accessorKey: keyof T
        } => !!c.filter && !!c.accessorKey).forEach(column =>
        {
            data.forEach((item: T): void =>
            {
                const val: string = String(item[column.accessorKey]);
                counts.set(val, (counts.get(val) || 0) + 1);
            });
        });
        return counts;
    }, [data, rawColumns]);

    const selectedFilters: Record<string, string>[] = useMemo((): Record<string, string>[] =>
    {
        const filters: Record<string, string>[] = [];
        rawColumns.forEach((col: CustomColumnDefTable<T>): void =>
        {
            if (col.filter && col.accessorKey)
            {
                const key = col.accessorKey as string;
                const values = table.getColumn(key)?.getFilterValue() as string[] | undefined;
                if (values?.length)
                {
                    values.forEach((value: string): void =>
                    {
                        filters.push({[key]: value});
                    });
                }
            }
        });
        return filters;
    }, [rawColumns, table]);

    const handleFilterChange: (checked: boolean, columnKey: string, value: string) => void = (checked: boolean, columnKey: string, value: string): void =>
    {
        const column: Column<T> | undefined = table.getColumn(columnKey);
        if (!column) return;
        const currentFilter = column.getFilterValue() as string[] | undefined;
        const updated: string[] = checked
            ? [...(currentFilter || []), value]
            : (currentFilter || []).filter((v: string): boolean => v !== value);
        column.setFilterValue(updated.length ? updated : undefined);
    };

    return (
        <div>
            {/* Filters */}
            <div className={cn("flex flex-wrap items-center mb-3", searchKeys.length > 0 ? 'justify-between' : 'justify-end')}>
                {/* Search in columns */}
                {
                    searchKeys.length > 0 && (
                        <div className="relative">
                            <Input
                                id={`${id}-input`}
                                ref={inputRef}
                                className={cn(
                                    "peer min-w-60 ps-9",
                                    searchKeys.length > 0 && Boolean(table.getColumn(searchKeys[0])?.getFilterValue()) && "pe-9",
                                )}
                                value={(searchKeys.length > 0 && (table.getColumn(searchKeys[0])?.getFilterValue() ?? "")) as string}
                                onChange={(e: ChangeEvent<HTMLInputElement>): void | undefined => table.getColumn(searchKeys[0])?.setFilterValue(e.target.value)}
                                placeholder={placeholder}
                                type="text"
                                aria-label={placeholder}
                            />
                            <div
                                className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                <ListFilter size={16} strokeWidth={2} aria-hidden="true"/>
                            </div>
                            {
                                searchKeys.length > 0 && Boolean(table.getColumn(searchKeys[0] ?? "")?.getFilterValue()) && (
                                    <button
                                        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                        aria-label="Clear filter"
                                        onClick={(): void =>
                                        {
                                            table.getColumn(searchKeys[0])?.setFilterValue("");
                                            if (inputRef.current)
                                            {
                                                inputRef.current.focus();
                                            }
                                        }}
                                    >
                                        <CircleX size={16} strokeWidth={2} aria-hidden="true"/>
                                    </button>
                                )}
                        </div>
                    )}

                <div className="flex gap-3">
                    {/* Filtres */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">
                                <Filter className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2}/>
                                {t('filters')}
                                {Object.values(selectedFilters).flat().length > 0 && (
                                    <span
                                        className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                                        {Object.values(selectedFilters).flat().length}
                                    </span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="min-w-56 p-3" align="start">
                            <div className="space-y-4">
                                {rawColumns
                                    .filter((c: CustomColumnDefTable<T>): c is CustomColumnDefTable<T> & {
                                        filter: true;
                                        accessorKey: string
                                    } => !!c.filter && !!c.accessorKey)
                                    .map((col): JSX.Element =>
                                    {
                                        const key: string = col.accessorKey;
                                        const values: string[] = Array.from(
                                            new Set(data.map((row: T): string => String(row[key as keyof T])))
                                        ).sort();

                                        const currentFilter = table.getColumn(key)?.getFilterValue() as string[] | undefined;

                                        return (
                                            <div key={key} className="space-y-2">
                                                <Label
                                                    className="text-xs font-semibold text-muted-foreground">
                                                    {key}
                                                </Label>
                                                <div className="space-y-1">
                                                    {values.map((val: string, i: number): JSX.Element => (
                                                        <div key={`${key}-${val}-${i}`}
                                                             className="flex items-center gap-2">
                                                            <Checkbox
                                                                id={`${key}-${i}`}
                                                                checked={currentFilter?.includes(val) ?? false}
                                                                onCheckedChange={(checked: CheckedState): void => handleFilterChange(!!checked, key, val)}
                                                            />
                                                            <Label htmlFor={`${key}-${i}`}
                                                                   className="flex grow justify-between gap-2 font-normal">
                                                                {val}
                                                                <span className="ms-2 text-xs text-muted-foreground">
                                                                    {statusCounts.get(val) || 0}
                                                                </span>
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Columns to display */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="cursor-pointer">
                                <Columns3
                                    className="-ms-1 me-2 opacity-60"
                                    size={16}
                                    strokeWidth={2}
                                    aria-hidden="true"
                                />
                                {t('colToDisplay')}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column: Column<T>): boolean => column.getCanHide())
                                .map((column: Column<T>): JSX.Element =>
                                {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize cursor-pointer"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value: boolean): void => column.toggleVisibility(value)}
                                            onSelect={(event: Event): void => event.preventDefault()}
                                        >
                                            {typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* TableWithFilter */}
            <div className="overflow-hidden rounded-lg border border-border bg-background">
                <Table className="table-fixed">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup: HeaderGroup<T>): JSX.Element => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent">
                                {headerGroup.headers.map((header: Header<T, unknown>): JSX.Element =>
                                {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            style={{width: `${header.getSize()}px`}}
                                            className="h-11"
                                        >
                                            {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                                <div
                                                    className={cn(
                                                        header.column.getCanSort() &&
                                                        "flex h-full cursor-pointer select-none items-center justify-between gap-2",
                                                    )}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    onKeyDown={(e): void =>
                                                    {
                                                        // Enhanced keyboard handling for sorting
                                                        if (
                                                            header.column.getCanSort() &&
                                                            (e.key === "Enter" || e.key === " ")
                                                        )
                                                        {
                                                            e.preventDefault();
                                                            header.column.getToggleSortingHandler()?.(e);
                                                        }
                                                    }}
                                                    tabIndex={header.column.getCanSort() ? 0 : undefined}
                                                >
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {{
                                                        asc:  (
                                                                  <ChevronUp
                                                                      className="shrink-0 opacity-60"
                                                                      size={16}
                                                                      strokeWidth={2}
                                                                      aria-hidden="true"
                                                                  />
                                                              ),
                                                        desc: (
                                                                  <ChevronDown
                                                                      className="shrink-0 opacity-60"
                                                                      size={16}
                                                                      strokeWidth={2}
                                                                      aria-hidden="true"
                                                                  />
                                                              ),
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                            ) : (
                                                flexRender(header.column.columnDef.header, header.getContext())
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="last:py-0">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between gap-8 mt-3">
                {/* Results per page */}
                <div className="flex items-center gap-3">
                    <Label htmlFor={id} className="max-sm:sr-only">
                        {t('rowsPerPage')}
                    </Label>
                    <Select
                        value={table.getState().pagination.pageSize.toString()}
                        onValueChange={(value: string): void =>
                        {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger id={id} className="w-fit whitespace-nowrap">
                            <SelectValue placeholder="Select number of results"/>
                        </SelectTrigger>
                        <SelectContent
                            className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
                            {rowsPerPageSelection.map((pageSize: number): JSX.Element => (
                                <SelectItem key={pageSize} value={pageSize.toString()}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Page number information */}
                <div className="flex grow justify-end whitespace-nowrap text-sm text-muted-foreground">
                    <p className="whitespace-nowrap text-sm text-muted-foreground" aria-live="polite">
                        <span className="text-foreground">
                          {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                            {Math.min(
                                Math.max(
                                    table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
                                    table.getState().pagination.pageSize,
                                    0,
                                ),
                                table.getRowCount(),
                            )}
                        </span>
                        {t("pageCount")}
                        <span className="text-foreground">
                            {table.getRowCount().toString()}
                        </span>
                    </p>
                </div>

                {/* Pagination buttons */}
                <div>
                    <Pagination>
                        <PaginationContent>
                            {/* First page button */}
                            <PaginationItem>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    onClick={(): void => table.firstPage()}
                                    disabled={!table.getCanPreviousPage()}
                                    aria-label={t("goFirstPage")}
                                    title={t("goFirstPage")}
                                >
                                    <ChevronFirst size={16} strokeWidth={2} aria-hidden="true"/>
                                </Button>
                            </PaginationItem>
                            {/* Previous page button */}
                            <PaginationItem>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    onClick={(): void => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                    aria-label={t("goPreviousPage")}
                                    title={t("goPreviousPage")}
                                >
                                    <ChevronLeft size={16} strokeWidth={2} aria-hidden="true"/>
                                </Button>
                            </PaginationItem>
                            {/* Next page button */}
                            <PaginationItem>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    onClick={(): void => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                    aria-label={t("goNextPage")}
                                    title={t("goNextPage")}
                                >
                                    <ChevronRight size={16} strokeWidth={2} aria-hidden="true"/>
                                </Button>
                            </PaginationItem>
                            {/* Last page button */}
                            <PaginationItem>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    onClick={(): void => table.lastPage()}
                                    disabled={!table.getCanNextPage()}
                                    aria-label={t("goLastPage")}
                                    title={t("goLastPage")}
                                >
                                    <ChevronLast size={16} strokeWidth={2} aria-hidden="true"/>
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}
