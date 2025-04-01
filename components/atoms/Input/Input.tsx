'use client';

import React, {JSX, useState} from 'react';
import {Input as UiInput} from "@ui/input"
import {InputProps} from "@typesFront";
import {Button} from "@components";
import Eye from '@svg/eye.svg';
import EyeOff from '@svg/eye-off.svg';
import {cn} from "@lib";

const Input: ({type, className}: InputProps) => JSX.Element = ({type, className, ...other}: InputProps): JSX.Element =>
{
    const [showPassword, setShowPassword] = useState(false);

    if (type === "password")
    {
        return (
            <div className="relative">
                <UiInput type={showPassword ? 'text' : 'password'} className={cn("pr-10", className)} {...other}/>
                <Button type="button" className={"absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 p-0"}
                        onClick={(): void => setShowPassword(!showPassword)}>
                    {showPassword ? (<EyeOff className={"h-4 w-4"}/>) : (<Eye className={"h-4 w-4"}/>)}
                </Button>
            </div>
        );
    } else
    {
        return (
            <UiInput type={type} {...other} />
        );
    }


};

export default Input;