import {JSX} from "react";
import {cn} from "@lib";
import {GenderGaugeProps} from "@typesFront";

export default function GenderGauge({maleRate, ...other}: GenderGaugeProps): JSX.Element
{
    return (
        <div {...other} className={cn("bg-pink-400 rounded-full h-2", other.className)}>
            <div className="rounded-l-full bg-blue-500 h-full" style={{width: `${maleRate}%` }}></div>
        </div>
    );
}