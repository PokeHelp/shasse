import {TextFieldProps, TypographyProps} from "@mui/material";

export interface CustomTextFieldProps extends Omit<TextFieldProps, 'error'>
{
    errorText?: string;
}

export interface CustomTypographyProps extends TypographyProps
{
    type?: 'error';
}