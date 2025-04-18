import {ComponentProps, Dispatch, JSX, SetStateAction, ComponentPropsWithoutRef, HTMLAttributes} from "react";
import {Button} from '@ui/button';
import {Input} from '@ui/input';
import {Select} from '@ui/select';
import {Pagination} from '@ui/pagination';
import {Sheet} from '@ui/sheet';
import Link from 'next/link';

export type ButtonProps = ComponentProps<typeof Button>
export type InputProps = ComponentProps<typeof Input>
export type LinkProps = ComponentProps<typeof Link>

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