import Providers from './Provider';
import {ReactNode, JSX} from "react";

/**
 * Layout pour les routes front
 *
 * @param children
 * @constructor
 */
export default function RootLayout({children}: { children: ReactNode }): JSX.Element
{
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={"w-11/12 max-w-7xl mx-auto"}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}