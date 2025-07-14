import {cn} from "@lib";
import type {LucideProps} from "lucide-react";
import {Loader2} from "lucide-react";

export const Spinner = ({className, ...props}: LucideProps) =>
{
    return <Loader2 {...props} className={cn(className, "animate-spin")}/>;
};
