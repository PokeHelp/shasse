import {JSX} from "react";
import {Button as UiButton} from "@ui/button";
import {ButtonProps} from "@typesFront";
import {cn} from '@lib'

const Button: ({children, className}: ButtonProps) => JSX.Element = ({
                                                                         children,
                                                                         className,
                                                                         ...other
                                                                     }: ButtonProps): JSX.Element =>
{
    return (
        <UiButton
            className={cn("cursor-pointer border-primary bg-transparent border fill-primary hover:fill-background text-primary hover:text-background", className)} {...other}>
            {children}
        </UiButton>
    );
};

export default Button;