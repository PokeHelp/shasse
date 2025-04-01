import {getRequestConfig} from 'next-intl/server';
import {cookies} from "next/headers";
import {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";
import {getDefaultLangue} from "@service";

export default getRequestConfig(async () =>
{
    const userLang: RequestCookie | undefined = (await cookies()).get('userLang');
    const locale: string = userLang === undefined ? getDefaultLangue() : userLang.value;

    try
    {
        return {
            locale,
            messages: (await import(`../../messages/${locale}.json`)).default
        };
    } catch (e)
    {
        console.log(e);
        return {
            locale,
            messages: (await import(`../../messages/${getDefaultLangue()}.json`)).default
        };
    }
});