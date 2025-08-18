import {ReactNode, JSX} from "react";
import {getLocale} from 'next-intl/server';
import {Layout} from "@components";

export default async function RootLayout({children}: { children: ReactNode }): Promise<JSX.Element>
{
    const locale: string = await getLocale();

    return (
        <html lang={locale} suppressHydrationWarning>
        <body>
        <Layout>
            {children}
        </Layout>
        </body>
        </html>
    );
}