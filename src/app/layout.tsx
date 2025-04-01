import Providers from './Provider';
import {ReactNode, JSX} from "react";
import {getLocale} from 'next-intl/server';
import {NextIntlClientProvider} from 'next-intl';

/**
 * Layout pour les routes front
 *
 * @param children
 * @constructor
 */
export default async function RootLayout({children}: { children: ReactNode }): Promise<JSX.Element>
{
    const locale: string = await getLocale();

    return (
        <html lang={locale} suppressHydrationWarning>
        <body className={"w-11/12 max-w-7xl mx-auto"}>
        <NextIntlClientProvider>
            <Providers>
                {children}
            </Providers>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}