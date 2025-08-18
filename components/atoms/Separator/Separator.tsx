import { cn } from "@lib";
import React from "react";
import {SeparatorProps} from "@typesFront";

export default function Separator({
                                      direction = "horizontal",
                                      className,
                                      ...props
                                  }: SeparatorProps): React.JSX.Element {
    return (
        <hr
            {...props}
            className={cn(
                "border-primary", className,
                direction === "horizontal"
                    ? "w-full"
                    : "h-full w-[1px] border-s-[1px]",
            )}
        />
    );
}
