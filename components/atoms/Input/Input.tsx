'use client';

import {JSX, useState} from 'react';
import {Input as UiInput} from "@ui/input"
import {InputProps} from "@typesFront";
import {Button} from "@components";
import {cn} from "@lib";
import { ReactSVG } from 'react-svg'

const Input: ({type, className}: InputProps) => JSX.Element = ({type, className, ...other}: InputProps): JSX.Element =>
{
    const [showPassword, setShowPassword] = useState(false);

    if (type === "password")
    {
        return (
            <div className="relative">
                <UiInput type={showPassword ? 'text' : 'password'} className={cn("pr-10 border-primary", className)} {...other}/>
                <Button type="button" className={"absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 p-0"}
                        onClick={(): void => setShowPassword(!showPassword)}>
                    <ReactSVG
                        className="h-4 w-4"
                        src={showPassword ? '/svg/eye-off.svg' : '/svg/eye.svg'}
                    />
                </Button>
            </div>
        );
    } else
    {
        return (
            <UiInput type={type} {...other} className={cn("border-primary", className)} />
        );
    }


};

export default Input;