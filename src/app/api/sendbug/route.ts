import { NextResponse } from "next/server";
import { getResendInstance } from "@src/lib/resend";
import {Resend} from "resend";

export async function POST(req: Request): Promise<NextResponse<{success: boolean}>> {
    const { title, content } = await req.json();
    const resend: Resend = getResendInstance();

    await resend.emails.send({
        to: "contact@pokehelp.fr",
        subject: title,
        text: content,
        from: "tickets@pokehelp.fr",
    });

    return NextResponse.json({ success: true });
}
