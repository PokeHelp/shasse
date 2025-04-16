import {Sheet, SheetContent, SheetFooter, SheetHeader} from "@ui/sheet";
import {SliderProps} from "@typesFront";
import {JSX} from "react";

const Slider: ({sliderFooter, SliderHeader}: SliderProps) => JSX.Element = ({
                                                                                sliderFooter,
                                                                                SliderHeader,
                                                                                children,
                                                                                ...other
                                                                            }: SliderProps): JSX.Element =>
{
    return (
        <Sheet {...other}>
            <SheetContent>
                <SheetHeader>
                    {SliderHeader}
                </SheetHeader>
                {children}
                <SheetFooter>
                    {sliderFooter}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default Slider;