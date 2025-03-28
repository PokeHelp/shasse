import {JSX} from "react";
import {Button as UiButton} from "@ui/button";
import {ButtonProps} from "@typesFront";

const Button: ({children}: ButtonProps) => JSX.Element = ({children, ...other}: ButtonProps): JSX.Element =>
{
    return (
        <UiButton {...other}>
            {children}
        </UiButton>
    );
};

export default Button;