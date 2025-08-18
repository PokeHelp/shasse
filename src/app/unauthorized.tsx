"use client";

import {JSX} from "react";
import {Button, Link, PageLayout, Typography} from "@components";
import {Translation} from "@types";
import {useTranslations} from "next-intl";
import {usePathname} from "next/navigation";

export default function Unauthorized(): JSX.Element
{
    const t: Translation = useTranslations("page.unauthorized");
    const query: string = `?fallback=${usePathname()}`;

    return (
        <PageLayout>
            <Typography as="h1" className="px-0">{t("title")}</Typography>
            <Typography>{t("description")}</Typography>

            <div className="flex mt-4 gap-3">
                <Button asChild>
                    <Link href={`/login${query}`} className="no-underline">{t("login")}</Link>
                </Button>

                <Button asChild>
                    <Link href={`/register${query}`} className="no-underline">{t("register")}</Link>
                </Button>
            </div>
        </PageLayout>
    );
}