import {JSX} from "react";
import {Button as UiButton} from "@ui/button";
import {ButtonProps} from "@typesFront";
import {cn} from '@lib'

const Button: ({fill, className}: ButtonProps) => JSX.Element = ({
                                                                     fill = false,
                                                                     className,
                                                                     ...props
                                                                 }: ButtonProps): JSX.Element =>
{
    return (
        <UiButton
            className={cn(
                "border",
                fill
                    ? "bg-secondary border-secondary hover:bg-secondary"
                    : "cursor-pointer border-primary fill-primary text-primary bg-transparent hover:text-background hover:fill-background",
                className
            )}
            {...props}
        >
            {props.children}
        </UiButton>
    );
};

export default Button;