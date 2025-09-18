import {TranslationIdNamesSchema} from "@schema";

describe("TranslationIdNamesSchema", () => {
    it("should pass with valid data", () => {
        const data = { name: "Example", id: 123 };
        const result = TranslationIdNamesSchema.safeParse(data);

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toEqual(data);
        }
    });

    it("should fail if name is missing", () => {
        const data = { id: 123 };
        const result = TranslationIdNamesSchema.safeParse(data);

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].path).toEqual(["name"]);
            expect(result.error.errors[0].message).toContain("Required");
        }
    });

    it("should fail if id is missing", () => {
        const data = { name: "Example" };
        const result = TranslationIdNamesSchema.safeParse(data);

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].path).toEqual(["id"]);
            expect(result.error.errors[0].message).toContain("Required");
        }
    });

    it("should fail if types are wrong", () => {
        const data = { name: 123, id: "abc" };
        const result = TranslationIdNamesSchema.safeParse(data);

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors.length).toBe(2);
            expect(result.error.errors.map(e => e.path)).toEqual([["name"], ["id"]]);
        }
    });
});
