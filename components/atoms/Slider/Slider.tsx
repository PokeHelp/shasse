import {Sheet, SheetContent, SheetFooter, SheetHeader} from "@ui/sheet";
import {SliderProps} from "@typesFront";
import {JSX} from "react";
import {cn} from "@lib";
import './Slider.css';

const Slider: ({sliderFooter, SliderHeader, contentClassName}: SliderProps) => JSX.Element = ({
                                                                                sliderFooter,
                                                                                SliderHeader,
                                                                                contentClassName,
                                                                                children,
                                                                                ...other
                                                                            }: SliderProps): JSX.Element =>
{
    return (
        <Sheet {...other}>
            <SheetContent className={cn('px-4 slider-overflow', contentClassName)}>
                <SheetHeader>
                    {SliderHeader}
                </SheetHeader>
                <div className="">
                    {children}
                </div>
                <SheetFooter>
                    {sliderFooter}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default Slider;