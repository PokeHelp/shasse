import {ReactNode, JSX} from "react";
import {NextIntlClientProvider} from 'next-intl';
import Providers from "./Provider";

export default async function Layout({children}: { children: ReactNode }): Promise<JSX.Element>
{
    return (
        <NextIntlClientProvider>
            <Providers>
                {children}
            </Providers>
        </NextIntlClientProvider>
    );
}