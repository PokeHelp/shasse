import {ButtonProps, Button as MuiButton} from "@mui/material";
import {FC, JSX} from "react";

const Button: FC<ButtonProps> = ({...other}: ButtonProps): JSX.Element =>
{
    return <MuiButton {...other}/>;
};

export default Button;