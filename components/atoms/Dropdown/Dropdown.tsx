import {Select, SelectTrigger, SelectValue, SelectContent, SelectGroup} from '@ui/select';
import {DropdownProps} from "@typesFront";
import {JSX} from "react";

const Dropdown: ({placeholder, children, onValueChange}: DropdownProps) => JSX.Element = ({
                                                                                              placeholder,
                                                                                              onValueChange,
                                                                                              children,
                                                                                              ...other
                                                                                          }: DropdownProps): JSX.Element =>
{
    return (
        <Select {...other} onValueChange={onValueChange}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder}/>
            </SelectTrigger>
            <SelectContent position="popper">
                <SelectGroup>
                    {children}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default Dropdown;