'use client';

import {TypographyProps} from "@typesFront";
import {JSX} from "react";
import {cn} from "@lib";

const CustomTypography: ({type}: TypographyProps) => JSX.Element = ({
                                                                        type: Tag,
                                                                        children,
                                                                        ...   other
                                                                    }: TypographyProps): JSX.Element =>
{
    return <Tag className={cn("flex items-center", other.className)} {...other}>{children}</Tag>;
};

export default CustomTypography;