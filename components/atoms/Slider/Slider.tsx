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
            <SheetContent className={cn('px-4 lg:px-2 slider-overflow w-full lg:w-3/4 mt-10', contentClassName)}>
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