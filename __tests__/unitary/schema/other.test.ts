import {numberSchema} from "@schema";

describe("numberSchema", () => {
    it("should parse valid numeric string to number", () => {
        const result = numberSchema.safeParse("42");

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toBe(42);
            expect(typeof result.data).toBe("number");
        }
    });

    it("should parse valid float string to number", () => {
        const result = numberSchema.safeParse("3.14");

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toBeCloseTo(3.14);
        }
    });

    it("should fail for non-numeric string", () => {
        const result = numberSchema.safeParse("abc");

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe("Doit être un nombre valide");
            expect(result.error.errors[0].path).toEqual([]); // chemin racine
        }
    });

    it("should fail for empty string", () => {
        const result = numberSchema.safeParse("");

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe("Doit être un nombre valide");
        }
    });

    it("should fail for string with spaces or letters", () => {
        const result = numberSchema.safeParse("12a");

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.errors[0].message).toBe("Doit être un nombre valide");
        }
    });
});