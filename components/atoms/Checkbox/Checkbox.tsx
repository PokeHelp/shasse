import {JSX} from "react";
import {FormField, FormItem, FormMessage, FormLabel, FormControl} from "@components";
import {Checkbox as CheckboxUi} from "@ui/checkbox";
import {FieldValues} from "react-hook-form";
import {CheckboxProps} from "@typesFront";
import {CheckedState} from "@radix-ui/react-checkbox";

export default function Checkbox<T extends FieldValues>({form, label, name, ...props}: CheckboxProps<T>): JSX.Element
{
    return (
        <FormField
            {...props}
            control={form.control}
            name={name}
            render={({ field }): JSX.Element => {
                return (
                    <FormItem className="flex flex-col" >
                        <div className="flex flex-row items-center gap-2">
                            <FormControl>
                                <CheckboxUi
                                    checked={field.value}
                                    onCheckedChange={(checked: CheckedState): void => {
                                        return field.onChange(checked);
                                    }}
                                />
                            </FormControl>
                            <FormLabel>
                                {label}
                            </FormLabel>
                        </div>
                        <FormMessage/>
                    </FormItem>
                )
            }}
        />
    );
}