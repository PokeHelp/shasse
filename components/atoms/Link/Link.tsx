import Link from "next/link";
import {LinkProps} from "@typesFront";
import {JSX} from "react";
import {cn} from "@lib";

const CustomLink: ({}: LinkProps) => JSX.Element = ({href, children, ...other}: LinkProps): JSX.Element =>
{
    return (
        <Link href={href} {...other}
                   className={cn('text-primary underline', other.className)}>
            {children}
        </Link>
    );
}

export default CustomLink;