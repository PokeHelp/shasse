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
        <html lang="en">
        <body>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}