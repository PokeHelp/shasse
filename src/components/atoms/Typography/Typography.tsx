'use client';

import {ComponentType, FC, JSX} from 'react';
import {Typography, TypographyProps} from '@mui/material';
import {styled} from '@mui/system';
import {CustomTypographyProps} from "@typesFront";

const CustomTypography: FC<CustomTypographyProps> = ({type, ...other}: CustomTypographyProps): JSX.Element =>
{
    const styles = (props: { type?: 'error' }) => ({
        ...(props.type === 'error' && {
            backgroundColor: 'red',
            color:           'white',
            fontWeight:      'bold',
            padding:         '1em',
            borderRadius:    '8px',
        }),
    });

    const StyledTypography: ComponentType<TypographyProps & { type?: 'error' }> = styled(Typography)(styles);

    return <StyledTypography type={type} {...other} />;
};

export default CustomTypography;