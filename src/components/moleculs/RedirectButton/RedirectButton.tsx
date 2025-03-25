'use client';

import {Button} from "@components";
import {JSX, type MouseEvent} from 'react';
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {RedirectButtonProps} from "@typesFront";

export default function RedirectButton({redirectUrl, text}: RedirectButtonProps): JSX.Element
{
    const router: AppRouterInstance = useRouter();

    const handleClick: (e: MouseEvent<HTMLButtonElement>) => void = (e: MouseEvent<HTMLButtonElement>): void =>
    {
        e.preventDefault();
        router.push(redirectUrl);
    };

    return (
        <Button onClick={handleClick}>
            {text}
        </Button>
    );
}