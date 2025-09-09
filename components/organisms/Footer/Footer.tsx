'use client';

import {JSX} from "react";
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {EmailBugSchema} from "@schema";
import {useZodForm} from "@utils";
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Link,
    Typography
} from "@components";
import {Translation} from "@types";
import {useTranslations} from "next-intl";
import {Textarea} from "@ui/textarea";
import {toast} from "sonner";
import {axiosService} from "@lib";

export default function Footer(): JSX.Element
{
    const t: Translation = useTranslations();

    const form: UseFormReturn<z.infer<typeof EmailBugSchema>> = useZodForm(EmailBugSchema, {
        defaultValues: {
            title:   "",
            content: ""
        },
    });

    async function onSubmit(values: z.infer<typeof EmailBugSchema>): Promise<void>
    {
        await axiosService.post('/api/sendbug', JSON.stringify(values));

        toast.success(t("email.sendWithSuccess"));
    }

    return (
        <footer
            className="flex px-4 py-5 border-t w-full z-[9999] bg-background flex-col inset-x-0 pr-1/4 gap-4 container max-w-[1600px]">
            <Typography as="section">
                <Typography as="h3">
                    {t('footer.email.reportBugOrUpgrade')}
                </Typography>
                <Form form={form} callback={onSubmit} className="flex items-center justify-center w-full gap-3">
                    <FormField
                        name='title'
                        control={form.control}
                        render={({field}): JSX.Element => (
                            <FormItem className="w-1/4 flex-1">
                                <FormLabel>
                                    {t('footer.email.titleLabel')}
                                </FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} placeholder={t('footer.email.titlePlaceholder')}
                                           required/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name='content'
                        control={form.control}
                        render={({field}): JSX.Element => (
                            <FormItem className="w-1/4 flex-1">
                                <FormLabel>
                                    {t('footer.email.contentPlaceholder')}
                                </FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder={t('footer.email.contentPlaceholder')} required/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="flex-[0.2]">
                        {t('footer.email.report')}
                    </Button>
                </Form>
            </Typography>

            <Typography as="span">
                ©2025 Pokehelp Tous droits réservés. – <Link href="/cgu">{t("cgu")}</Link>
            </Typography>
        </footer>
    )
}