"use client"

import {format} from "date-fns"
import {Calendar as CalendarIcon} from "lucide-react"
import {Button} from "@components"
import {Calendar} from "@ui/calendar"
import {Popover, PopoverContent, PopoverTrigger} from "@ui/popover"
import {JSX} from "react"
import {useController, FieldValues} from "react-hook-form"
import {DatePickerProps} from "@typesFront";
import {Translation} from "@types";
import {useTranslations} from "next-intl";
import {fr} from "date-fns/locale"

export default function DatePicker<T extends FieldValues>({
                                                              name,
                                                              control,
                                                              placeholder
                                                          }: DatePickerProps<T>): JSX.Element
{
    const {
              field: {value, onChange},
          } = useController({
        name,
        control,
    })

    const t: Translation = useTranslations("calendar");

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    data-empty={!value}
                    className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                >
                    <CalendarIcon className="mr-2 h-4 w-4"/>
                    {value ? format(value, "PPP", {locale: fr}) : <span>{placeholder ?? t("placeholder")}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={value} onSelect={onChange} locale={fr}/>
            </PopoverContent>
        </Popover>
    )
}
