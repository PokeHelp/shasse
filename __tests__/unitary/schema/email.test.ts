import {EmailBugSchema} from "@schema";

describe("EmailBugSchema", () =>
{
    it("should succeed with valid data", () =>
    {
        const validData = {
            title:   "Bug report",
            content: "There is a bug in the system"
        };

        const result = EmailBugSchema.safeParse(validData);
        expect(result.success).toBe(true);
        if (result.success)
        {
            expect(result.data).toEqual(validData);
        }
    });

    it("should fail if title is missing", () =>
    {
        const invalidData = {
            content: "Some content"
        };

        const result = EmailBugSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success)
        {
            const paths = result.error.errors.map(e => e.path.join("."));
            expect(paths).toContain("title");
        }
    });

    it("should fail if content is missing", () =>
    {
        const invalidData = {
            title: "Bug report"
        };

        const result = EmailBugSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success)
        {
            const paths = result.error.errors.map(e => e.path.join("."));
            expect(paths).toContain("content");
        }
    });

    it("should fail if both fields are missing", () =>
    {
        const invalidData = {};

        const result = EmailBugSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success)
        {
            const paths = result.error.errors.map(e => e.path.join("."));
            expect(paths).toContain("title");
            expect(paths).toContain("content");
        }
    });

    it("should fail if title or content is not a string", () =>
    {
        const invalidData = {
            title:   123,
            content: true
        };

        const result = EmailBugSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success)
        {
            const types = result.error.errors.map(e => e.code);
            expect(types).toContain("invalid_type");
        }
    });
});