'use client';

import {ComponentType, FC, JSX} from 'react';
import {TextField as MuiTextField, TextFieldProps} from '@mui/material';
import {styled} from '@mui/system';
import {CustomTextFieldProps} from '@typesFront'
import {Typography} from "@components";

const StyledTextField: ComponentType<TextFieldProps> = styled(MuiTextField)({
    marginBottom: '0px',
});

const TextField: FC<CustomTextFieldProps> = ({errorText, ...other}: CustomTextFieldProps): JSX.Element =>
{
    return (
        <>
            <StyledTextField
                {...other}
                error={!!errorText}
            />

            <Typography
                component="p"
                variant="body2"
                sx={{
                    whiteSpace: 'pre-line',
                    color:      !!errorText ? '#d32f2f' : 'transparent'
                }}
                dangerouslySetInnerHTML={{__html: errorText || ''}}
            />
        </>
    );
};

export default TextField;