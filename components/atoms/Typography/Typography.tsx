'use client';

import {TypographyProps} from "@typesFront";
import {JSX} from "react";

const CustomTypography: ({type}: TypographyProps) => JSX.Element = ({
                                                                        type: Tag,
                                                                        children,
                                                                        ...   other
                                                                    }: TypographyProps): JSX.Element =>
{
    return <Tag {...other}>{children}</Tag>;
};

export default CustomTypography;