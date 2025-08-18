import { ReactNode } from "react";
import {Footer, Header} from "@components";

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            <div className="mt-12">
                {children}
            </div>
            <Footer />
        </>
    );
}