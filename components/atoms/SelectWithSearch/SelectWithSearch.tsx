"use client";

import {cn} from "@lib";
import {Button} from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Check, ChevronDown} from "lucide-react";
import {JSX, useState} from "react";
import {SelectWithSearchData, SelectWithSearchProps} from "@typesFront";

export default function SelectWithSearch({datas, placeholder, defaultValue, value: selectedValue, onSelectValueAction, ...other}: SelectWithSearchProps): JSX.Element
{
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="space-y-2 min-w-[300px]">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20"
                    >
                    <span className={cn("truncate", !selectedValue && "text-muted-foreground")}>
                       {selectedValue
                           ? datas.find((data: SelectWithSearchData): boolean => data.value === selectedValue.value)?.label
                           : defaultValue ?? placeholder}
                    </span>
                        <ChevronDown
                            size={16}
                            strokeWidth={2}
                            className="shrink-0 text-muted-foreground/80"
                            aria-hidden="true"
                        />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0"
                    align="start"
                >
                    <Command {...other}>
                        <CommandInput placeholder={placeholder} />
                        <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                                {datas.map((data: SelectWithSearchData): JSX.Element => (
                                    <CommandItem
                                        key={data.value}
                                        value={data.label}
                                        onSelect={(): void =>
                                        {
                                            onSelectValueAction(selectedValue?.value === data.value ? null : data);
                                            setOpen(false);
                                        }}
                                    >
                                        {data.label}
                                        {selectedValue?.value === data.value && (
                                            <Check size={16} strokeWidth={2} className="ml-auto"/>
                                        )}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
