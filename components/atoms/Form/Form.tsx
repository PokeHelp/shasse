import {
    Form as FormUi,
    FormField as FormFieldUi,
    FormControl as FormControlUi,
    FormItem as FormItemUi,
    FormLabel as FormLabelUi,
    FormMessage as FormMessageUi
} from "@ui/form";
import {JSX} from "react";
import {
    FormControlProps,
    FormFieldProps,
    FormItemProps,
    FormLabelProps,
    FormMessageProps,
    FormProps
} from "@typesFront";
import {FieldPath, FieldValues} from "react-hook-form";
import {cn} from "@lib";

function Form<T extends FieldValues>({form, callback, children, ...props}: FormProps<T>): JSX.Element
{
    return (
        <FormUi {...form}>
            <form onSubmit={form.handleSubmit(callback)} {...props}>
                {children}
            </form>
        </FormUi>
    );
}

function FormField<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: FormFieldProps<TFieldValues, TName>): JSX.Element
{
    return <FormFieldUi {...props} />;
}

function FormControl(props: FormControlProps): JSX.Element
{
    return <FormControlUi {...props} className={props.className}/>;
}

function FormItem(props: FormItemProps): JSX.Element
{
    return <FormItemUi {...props} className={props.className}/>;
}

function FormLabel(props: FormLabelProps): JSX.Element
{
    return <FormLabelUi {...props} className={cn(props.className, 'text-sm')}/>;
}

function FormMessage(props: FormMessageProps): JSX.Element
{
    return <FormMessageUi {...props} className={props.className}/>;
}

export {Form, FormField, FormItem, FormControl, FormLabel, FormMessage};
