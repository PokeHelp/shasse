import {JSX, ReactNode} from "react";

export default function PageLayout({children}: { children: ReactNode }): JSX.Element
{
    return (
        <div className="w-full flex justify-center pt-3">
            <div className="container max-w-[1600px] min-h-[72vh]">
                {children}
            </div>
        </div>
    );
}