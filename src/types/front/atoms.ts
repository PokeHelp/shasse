import {ComponentProps, Dispatch, JSX, SetStateAction, ComponentPropsWithoutRef, Ref} from "react";
import {Button} from '@ui/button';
import {Input} from '@ui/input';
import {Select} from '@ui/select';
import {Pagination} from '@ui/pagination';
import {Sheet} from '@ui/sheet';
import Link from 'next/link';
import {ImageProps} from "next/image";
import {ColumnDef, SortingState} from "@tanstack/react-table";

export type InputProps = ComponentProps<typeof Input>
export type LinkProps = ComponentProps<typeof Link>

export interface DropdownProps extends ComponentProps<typeof Select>
{
    placeholder?: string;
}

export interface ButtonProps extends ComponentProps<typeof Button>
{
    fill?: boolean;
}

export interface PaginationProps extends ComponentProps<typeof Pagination>
{
    currentPage: number;
    totalPages: number;
    onChangeEvent: Dispatch<SetStateAction<number>>;
}

export interface SliderProps extends ComponentProps<typeof Sheet>
{
    sliderFooter?: JSX.Element;
    SliderHeader?: JSX.Element;
    contentClassName?: string;
}

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export interface TypographyProps extends ComponentPropsWithoutRef<HeadingTag> {
    type: HeadingTag;
}

export interface PictureProps extends Omit<ImageProps, 'width' | 'height'>
{
    width?: number;
    height?: number;
    ref?: Ref<HTMLImageElement | null> | undefined;
}

export type CustomColumnDefTable<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
    accessorKey: string;
} & (
    { search: true; filter?: never } |
    { filter: true; search?: never } |
    { search?: never; filter?: never }
    );

export interface TableWithFilterProps<T>
{
    data: T[];
    defaultSorting?: SortingState;
    rawColumns: CustomColumnDefTable<T>[];
    placeholder: string;
    rowsPerPageSelection?: number[];
}