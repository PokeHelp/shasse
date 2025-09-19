import {mapError, setFieldError} from "@utils";
import {z, ZodError, ZodIssue} from "zod";
import {DataError, ErrorMap} from "@types";

describe("Error utils", () =>
{
    let setErrors: jest.Mock;

    beforeEach(() =>
    {
        setErrors = jest.fn();
        jest.clearAllMocks();
    });

    describe("setFieldError", () =>
    {
        it("should add an error for a field", () =>
        {
            setFieldError(setErrors, "username", "Required");
            expect(setErrors).toHaveBeenCalledWith(expect.any(Function));

            const prev = {password: "Too short"};
            const result = (setErrors.mock.calls[0][0])(prev);
            expect(result).toEqual({password: "Too short", username: "Required"});
        });
    });

    describe("mapError", () =>
    {
        it("should map Zod issues into ErrorMap", () =>
        {
            const schema = z.object({
                username: z.string().min(1, "Required").refine(val => val !== "taken", {
                    message: "Must be unique",
                }),
            });

            const result = schema.safeParse({username: ""});

            expect(result.success).toBe(false);

            const dataError: DataError = {
                success: false,
                error:   (result as { success: false; error: ZodError }).error,
            };

            const mapped = mapError(dataError);

            expect(mapped).toMatchObject({
                username: expect.stringContaining("Required"),
            });
        });

        it("should append messages if the field already exists", () =>
        {
            const issues: ZodIssue[] = [
                {path: ["username"], message: "Required", code: "custom"},
                {path: ["username"], message: "Must be unique", code: "custom"},
            ];

            const dataError: DataError = {
                success: false,
                error:   new ZodError<{ username: string }>(issues),
            };

            const result = mapError(dataError);

            expect(result).toEqual({
                username: "Required\nMust be unique",
            });
        });

        it("should use 'custom' as field name when path is empty", () => {
            // On crée une ZodError avec path vide
            const issues: ZodIssue[] = [
                { path: [], message: "General error", code: "custom" },
            ];

            const dataError: DataError = {
                success: false,
                error: new ZodError<unknown>(issues),
            };

            const result: ErrorMap = mapError(dataError);

            expect(result).toEqual({
                custom: "General error",
            });
        });
    });
});
