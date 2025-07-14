import {
    ComponentProps,
    Dispatch,
    JSX,
    SetStateAction,
    ComponentPropsWithoutRef,
    Ref,
    HTMLAttributes,
    ReactNode
} from "react";
import {Button} from '@ui/button';
import {Input} from '@ui/input';
import {Select} from '@ui/select';
import {Pagination} from '@ui/pagination';
import {Sheet} from '@ui/sheet';
import Link from 'next/link';
import {ImageProps} from "next/image";
import {ColumnDef, SortingState} from "@tanstack/react-table";
import {Command} from "@ui/command";
import {Switch} from "@ui/switch";
import {ControllerProps, FieldPath, FieldValues, Path, SubmitHandler, UseFormReturn} from "react-hook-form";
import {FormControl, FormItem, FormLabel, FormMessage} from "@ui/form";

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

export interface SelectWithSearchData
{
    value: string;
    label: string;
}

export interface SelectWithSearchProps extends Omit<ComponentProps<typeof Command>, "value">
{
    datas: SelectWithSearchData[];
    placeholder: string;
    defaultValue?: string;
    value: SelectWithSearchData | null;
    onSelectValueAction: (selected: SelectWithSearchData | null) => void;
    // onSelectValueAction: Dispatch<SetStateAction<SelectWithSearchData | null>>;
}

export interface SwitchProps extends ComponentProps<typeof Switch>
{
    labelName?: string;
}

export interface FormProps<T extends FieldValues> extends HTMLAttributes<HTMLFormElement> {
    form: UseFormReturn<T>;
    callback: SubmitHandler<T>;
    children: ReactNode;
}

export type FormFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = ControllerProps<TFieldValues, TName>;
export type FormMessageProps = ComponentProps<typeof FormMessage>;
export type FormLabelProps = ComponentProps<typeof FormLabel>;
export type FormItemProps = ComponentProps<typeof FormItem>;
export type FormControlProps = ComponentProps<typeof FormControl>;

export interface CheckboxProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    label: string;
    name: Path<T>;
}