import { ReactNode } from "react";
import { Header } from "@components";

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}