import {Label} from "@ui/label"
import {Switch as SwitchUi} from "@ui/switch"
import {JSX} from "react";
import {SwitchProps} from "@typesFront";
import {cn} from "@lib";

export default function Switch({labelName, ...other}: SwitchProps): JSX.Element
{
    return (
        <div className="flex items-center space-x-2">
            <SwitchUi id={other.id} {...other} className={cn("cursor-pointer", other.className)}/>
            {
                labelName && <Label htmlFor={other.id}>{labelName}</Label>
            }
        </div>
    )
}
