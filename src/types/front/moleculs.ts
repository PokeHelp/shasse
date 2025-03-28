import {FieldValues, Control, Path} from "react-hook-form";
import {InputProps} from "@typesFront";

export interface RedirectButtonProps
{
    redirectUrl: string;
    text: string;
}

export interface InputFormFieldProps<T extends FieldValues> extends Omit<InputProps, 'name'> {
    formControl: Control<T>;
    name: Path<T>;
    errorText?: string;
    label: string;
}