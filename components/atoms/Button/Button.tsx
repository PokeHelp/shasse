import {JSX} from "react";
import {Button as UiButton} from "@ui/button";
import {ButtonProps} from "@typesFront";
import {cn} from '@lib'

const Button: ({children, className}: ButtonProps) => JSX.Element = ({children, className, ...other}: ButtonProps): JSX.Element =>
{
    return (
        <UiButton className={cn("cursor-pointer", className)} {...other}>
            {children}
        </UiButton>
    );
};

export default Button;