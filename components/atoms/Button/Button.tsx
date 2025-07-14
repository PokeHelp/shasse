import {ComponentType, JSX} from "react";
import {Button as UiButton} from "@ui/button";
import {ButtonProps} from "@typesFront";
import {cn} from '@lib'
import {SubmitButton} from "@ui/submit-button";

const Button: ({fill, className}: ButtonProps) => JSX.Element = ({
                                                                     fill = false,
                                                                     className,
                                                                     ...props
                                                                 }: ButtonProps): JSX.Element =>
{
    const ComponentButton: ComponentType<ButtonProps> = props.type === 'submit' ? SubmitButton : UiButton;

    const disabledClass: string = "disabled:pointer-events-auto cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-primary";

    return (
        <ComponentButton
            className={cn(
                "border",
                fill
                    ? "bg-secondary border-secondary hover:bg-secondary"
                    : "cursor-pointer border-primary fill-primary text-primary bg-transparent hover:text-background hover:fill-background",
                props.disabled === true ? disabledClass : "",
                className
            )}
            {...props}
        >
            {props.children}
        </ComponentButton>
    );
};

export default Button;