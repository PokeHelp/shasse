"use client"

import {ChangeEvent, JSX} from "react"
import {TimeInputProps} from "@typesFront";
import {Input} from "@ui/input";
import {cn} from "@lib";

export default function TimeInput({
                              value = 0,
                              onChange,
                              name,
                              ...other
                          }: TimeInputProps): JSX.Element
{

    const minutesToHHMM: (minutes: number) => string = (minutes: number): string =>
    {
        const h: number = Math.floor(minutes / 60)
        const m: number = minutes % 60
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
    }

    const hhmmToMinutes: (hhmm: string) => number = (hhmm: string): number =>
    {
        const [hours, minutes] = hhmm.split(":").map(Number)
        return hours * 60 + minutes
    }

    const handleChange: (e: ChangeEvent<HTMLInputElement>) => void = (e: ChangeEvent<HTMLInputElement>): void =>
    {
        const time: string = e.target.value
        if (time)
        {
            onChange?.(hhmmToMinutes(time))
        }
    }

    return (
        <Input
            {...other}
            id={other.id ?? name}
            name={name}
            type="time"
            step={60}
            value={minutesToHHMM(value)}
            onChange={handleChange}
            className={cn("rounded-md border border-input px-3 py-2 text-sm shadow-sm cursor-pointer", other.className)}
        />
    )
}
