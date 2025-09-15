'use client';

import {Accordion, AccordionItem, AccordionTrigger, AccordionContent} from "@ui/accordion";
import {JSX, useState} from "react";
import {CollapseProps} from "@typesFront";

export default function Collapse({triggerAction, children, ...other}: CollapseProps): JSX.Element
{
    const [value, setValue] = useState<string | undefined>(other.defaultChecked ? "item-1" : undefined);
    const isOpen: boolean = value === "item-1";

    return (
        <Accordion
            type="single"
            collapsible
            value={value}
            onValueChange={setValue}
            {...other}
        >
            <AccordionItem value="item-1">
                <AccordionTrigger
                    className="justify-start xl:justify-end cursor-pointer"
                    onClick={e => {
                        const target = e.target as HTMLElement;
                        if (["INPUT", "LABEL", "BUTTON"].includes(target.tagName)) {
                            e.stopPropagation();
                        }
                    }}
                >
                    {typeof triggerAction === "function"
                        ? triggerAction(isOpen)
                        : triggerAction}
                </AccordionTrigger>
                <AccordionContent>
                    {children}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
