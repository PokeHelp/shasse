import {JSX, ReactNode} from "react";

export default function PageLayout({children}: {children: ReactNode}): JSX.Element
{
    return (
        <div className="w-full flex justify-center">
            <div className="container max-w-[1600px]">
                {children}
            </div>
        </div>
    );
}