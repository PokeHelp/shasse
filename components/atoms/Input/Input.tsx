import {JSX} from 'react';
import {Input as UiInput} from "@ui/input"
import {InputProps} from "@typesFront";

const Input: ({type}: InputProps) => JSX.Element = ({type, ...other}: InputProps): JSX.Element =>
{
    return (
        <UiInput type={type} {...other} />
    );
};

export default Input;