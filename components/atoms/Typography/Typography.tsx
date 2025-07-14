'use server';

import {TypographyProps} from "@typesFront";
import {JSX} from "react";
import {cn} from "@lib";

const CustomTypography: ({type}: TypographyProps) => JSX.Element = ({
                                                                        type: Tag,
                                                                        children,
                                                                        ...other
                                                                    }: TypographyProps): JSX.Element =>
{
    const tagClasses: Record<string, string> = {
        h1: 'text-3xl font-bold',
        h2: 'text-2xl font-bold',
        h3: 'text-xl font-bold',
        h4: 'text-xl font-semibold',
        h5: 'text-l font-bold',
        h6: 'text-l font-semibold',
    };


    return <Tag className={cn(tagClasses[Tag] ?? '', other.className)} {...other}>{children}</Tag>;
};

export default CustomTypography;