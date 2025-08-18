import {Resend} from "resend";

export function getResendInstance() {
    const key = process.env.RESEND_API_KEY;

    if (!key) {
        throw new Error("Missing RESEND_API_KEY in environment variables");
    }

    return new Resend(key);
}