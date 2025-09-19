import {AccessTokenDataSchema, LoginSchema, RefreshTokenDataSchema, RegisterSchema, RoleSchema} from "@schema";

describe("Auth & Token Schemas", () =>
{

    describe("LoginSchema", () =>
    {
        it("should pass with valid email and password", () =>
        {
            const validData = {
                email:    "user@test.com",
                password: "Abcd1234!"
            };
            const result = LoginSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        it("should fail with invalid email", () =>
        {
            const result = LoginSchema.safeParse({
                email:    "invalid",
                password: "Abcd1234!"
            });
            expect(result.success).toBe(false);
        });

        it("should fail with weak password", () =>
        {
            const result = LoginSchema.safeParse({
                email:    "user@test.com",
                password: "weakpass"
            });
            expect(result.success).toBe(false);
        });
    });

    describe("RegisterSchema", () =>
    {
        it("should pass with matching passwords and terms accepted", () =>
        {
            const validData = {
                email:          "user@test.com",
                pseudonym:      "myUser",
                password:       "Abcd1234!",
                passwordVerify: "Abcd1234!",
                termsAccepted:  true
            };
            const result = RegisterSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        it("should fail if passwords do not match", () =>
        {
            const data = {
                email:          "user@test.com",
                pseudonym:      "myUser",
                password:       "Abcd1234!",
                passwordVerify: "Abcd12345!",
                termsAccepted:  true
            };
            const result = RegisterSchema.safeParse(data);
            expect(result.success).toBe(false);
            if (!result.success)
            {
                const paths = result.error.errors.map(e => e.path.join("."));
                expect(paths).toContain("passwordVerify");
            }
        });

        it("should fail if termsAccepted is false", () =>
        {
            const data = {
                email:          "user@test.com",
                pseudonym:      "myUser",
                password:       "Abcd1234!",
                passwordVerify: "Abcd1234!",
                termsAccepted:  false
            };
            const result = RegisterSchema.safeParse(data);
            expect(result.success).toBe(false);
            if (!result.success)
            {
                const paths = result.error.errors.map(e => e.path.join("."));
                expect(paths).toContain("termsAccepted");
            }
        });
    });

    describe("RoleSchema", () =>
    {
        it("should pass with valid data", () =>
        {
            const result = RoleSchema.safeParse({
                name:        "Admin",
                levelAccess: 1
            });
            expect(result.success).toBe(true);
        });

        it("should fail if levelAccess is not a number", () =>
        {
            const result = RoleSchema.safeParse({
                name:        "Admin",
                levelAccess: -1
            });
            expect(result.success).toBe(false);
        });
    });

    describe("RefreshTokenDataSchema", () =>
    {
        it("should pass with valid future exp and past iat", () =>
        {
            const now = Math.floor(Date.now() / 1000);
            const result = RefreshTokenDataSchema.safeParse({
                userId: 1,
                exp:    now + 3600,
                iat:    now - 10
            });
            expect(result.success).toBe(true);
        });

        it("should fail if token is expired", () =>
        {
            const now = Math.floor(Date.now() / 1000);
            const result = RefreshTokenDataSchema.safeParse({
                userId: 1,
                exp:    now - 10,
                iat:    now - 20
            });
            expect(result.success).toBe(false);
        });

        it("should fail if iat is in the future", () =>
        {
            const now = Math.floor(Date.now() / 1000);
            const result = RefreshTokenDataSchema.safeParse({
                userId: 1,
                exp:    now + 3600,
                iat:    now + 10
            });
            expect(result.success).toBe(false);
        });
    });

    describe("AccessTokenDataSchema", () =>
    {
        it("should pass with valid data", () =>
        {
            const result = AccessTokenDataSchema.safeParse({
                levelAccess: 1,
                exp:         1234567890,
                iat:         1234560000
            });
            expect(result.success).toBe(true);
        });
    });
});
