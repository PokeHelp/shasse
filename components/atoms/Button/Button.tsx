import {ComponentType, JSX} from "react";
import {Button as UiButton} from "@ui/button";
import {ButtonProps as BaseButtonProps} from "@typesFront";
import {cn} from "@lib";
import {SubmitButton} from "@ui/submit-button";

export interface ButtonPropsSuccess
    extends Omit<BaseButtonProps, "variant">
{
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "success";
}

const Button: ({fill, className, variant}: ButtonPropsSuccess) => JSX.Element = ({
                                                                                     fill = false,
                                                                                     className,
                                                                                     variant,
                                                                                     ...rest
                                                                                 }: ButtonPropsSuccess): JSX.Element =>
{
    const mappedVariant: BaseButtonProps["variant"] =
              variant === "success" ? "default" : variant ?? "default";

    const mappedClassName: string | undefined =
              variant === "success"
                  ? cn(
                      "text-success border-success hover:text-background hover:fill-success hover:bg-success",
                      className
                  )
                  : className;

    const ComponentButton: ComponentType<BaseButtonProps> =
              rest.type === "submit" ? SubmitButton : UiButton;

    const disabledClass =
              "disabled:pointer-events-auto cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-primary";

    return (
        <ComponentButton
            className={cn(
                "border",
                fill
                    ? "bg-secondary border-secondary hover:bg-secondary"
                    : "cursor-pointer border-primary fill-primary text-primary bg-transparent hover:text-background hover:fill-background",
                rest.disabled === true ? disabledClass : "",
                mappedClassName
            )}
            variant={mappedVariant}
            {...rest}
        >
            {rest.children}
        </ComponentButton>
    );
};

export default Button;
