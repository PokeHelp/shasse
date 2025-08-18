import {z} from "zod";

const EmailBugSchema = z.object({
    title:   z.string(),
    content: z.string()
});

export {
    EmailBugSchema
}