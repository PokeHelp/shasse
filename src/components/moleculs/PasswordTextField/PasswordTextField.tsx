'use client';

import {TextField} from "@components";
import {JSX, useState} from "react";
import {CustomTextFieldProps} from "@typesFront";
import {IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from '@mui/icons-material';

export default function PasswordTextField({...other}: CustomTextFieldProps): JSX.Element
{
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility: () => void = (): void =>
    {
        setShowPassword((actualValue: boolean): boolean => !actualValue);
    };

    return (
        <TextField
            {...other}
            type={showPassword ? 'text' : 'password'}
            slotProps={{
                input: {
                    endAdornment: (
                                      <InputAdornment position="end">
                                          <IconButton
                                              onClick={handleTogglePasswordVisibility}
                                              edge="end"
                                              aria-label={showPassword ? 'Cacher le mot de passe' : 'Afficher le mot de passe'}
                                          >
                                              {showPassword ? <VisibilityOff/> : <Visibility/>}
                                          </IconButton>
                                      </InputAdornment>
                                  ),
                },
            }}
        />
    );
};