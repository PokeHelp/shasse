import {JSX} from "react";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@ui/form";
import {Input} from "@components";
import {InputFormFieldProps} from "@typesFront";
import {ControllerRenderProps, FieldValues, Path} from "react-hook-form";

export default function InputFormField<T extends FieldValues>({
                                                                  formControl,
                                                                  name,
                                                                  errorText,
                                                                  label,
                                                                  ...other
                                                              }: InputFormFieldProps<T>): JSX.Element
{
    return (
        <FormField
            control={formControl}
            name={name}
            render={({field}: { field: ControllerRenderProps<T, Path<T>> }): JSX.Element => (
                <FormItem>
                    <FormLabel>
                        {label}
                    </FormLabel>
                    <FormControl>
                        <Input {...field} {...other} className={
                            errorText
                                ? 'border-error text-error-foreground focus-visible:ring-error'
                                : ''
                        }/>
                    </FormControl>
                    <FormDescription className={"text-error-foreground h-5"}>
                        {errorText}
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
}