'use client';

import {Accordion, AccordionItem, AccordionTrigger, AccordionContent} from "@ui/accordion";
import {JSX, useState} from "react";
import {CollapseProps} from "@typesFront";

export default function Collapse({triggerAction, children, ...other}: CollapseProps): JSX.Element
{
    const [value, setValue] = useState<string | undefined>(undefined);
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
                <AccordionTrigger className="justify-end cursor-pointer">
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
