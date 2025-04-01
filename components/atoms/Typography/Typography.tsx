'use client';

import {TypographyProps} from "@typesFront";

//TODO: faire toutes les variantes
const CustomTypography = ({children, ...other}: TypographyProps) =>
{
    return <div {...other}>{children}</div>;
};

export default CustomTypography;