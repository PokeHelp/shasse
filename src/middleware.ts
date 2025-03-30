import {NextResponse} from "next/server";
import {cookies, headers} from "next/headers";
import {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";
import {ReadonlyHeaders} from "next/dist/server/web/spec-extension/adapters/headers";
import Negotiator from "negotiator";
import {match} from "@formatjs/intl-localematcher";
import {getDefaultLangue, getAllIsoCode} from "@service";

export async function middleware(): Promise<NextResponse>
{
    const response: NextResponse = NextResponse.next()
    const langCookie: RequestCookie | undefined = (await cookies()).get('userLang');

    if (langCookie === undefined)
    {
        const headersList: ReadonlyHeaders = await headers();
        const acceptLanguage: string | null = headersList.get('accept-language');
        let locale: string = getDefaultLangue();

        if (acceptLanguage)
        {
            const negotiator = new Negotiator({headers: {'accept-language': acceptLanguage}});
            const browserLanguages: string[] = negotiator.languages();
            locale = match(browserLanguages, await getAllIsoCode(), locale);
        }

        response.cookies.set('userLang', locale, {
            path:     '/',
            maxAge:   60 * 60 * 24 * 365,
            sameSite: 'lax',

            // TODO: sécure le cookie
            // secure: true,
            // httpOnly: true
        })
    }

    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};