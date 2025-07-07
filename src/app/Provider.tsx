'use client';

import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '@lib';
import {ComponentProps, JSX, ReactNode} from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes"
import "@src/styles/global.css";

export default function Providers({children}: { children: ReactNode }): JSX.Element
{
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    );
}


function ThemeProvider({children, ...props }: ComponentProps<typeof NextThemesProvider>): JSX.Element {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
