import {ComponentProps, Dispatch, SetStateAction} from "react";
import {Button} from '@ui/button';
import {Input} from '@ui/input';
import {Select} from '@ui/select';
import {Pagination} from '@ui/pagination';

export type ButtonProps = ComponentProps<typeof Button>
export type InputProps = ComponentProps<typeof Input>
export type TypographyProps = ComponentProps<"h1" | "h2">

export interface DropdownProps extends ComponentProps<typeof Select>
{
    placeholder?: string;
}

export interface PaginationProps extends ComponentProps<typeof Pagination>
{
    currentPage: number;
    totalPages: number;
    onChangeEvent: Dispatch<SetStateAction<number>>;
}