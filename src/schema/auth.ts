import {z, ZodArray, ZodNumber, ZodObject, ZodOptional, ZodString} from 'zod';

const LoginSchema: ZodObject<{ email: ZodString, password: ZodString }> = z.object({
    email:    z.string().email("L'email n'est pas valide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères")
});

const RegisterSchema: ZodObject<{
    email: ZodString,
    pseudonym: ZodString,
    password: ZodString,
    langue: ZodOptional<ZodString>
}> = z.object({
    email:     z.string().email("L'email n'est pas valide"),
    pseudonym: z.string(),
    langue:    z.string().optional(),
    password:  z.string()
                   .min(9, "Le mot de passe doit contenir au moins 8 caractères")
                   .regex(/[A-Z]/, "Au moins une lettre majuscule est requise")
                   .regex(/[a-z]/, "Au moins une lettre minuscule est requise")
                   .regex(/[0-9]/, "Au moins un chiffre est requis")
                   .regex(/[^A-Za-z0-9]/, "Au moins un caractère spécial est requis"),
});

const RefreshTokenSchema: ZodObject<{ refreshToken: ZodString }> = z.object({
    refreshToken: z.string()
});

const RefreshTokenDataSchema = z.object({
    userId: z.number().int().positive(),
    exp: z.number().int().positive()
                .refine(
                    exp => exp > Math.floor(Date.now() / 1000),
                    { message: "Le token est expiré" }
                ),
    iat: z.number().int().positive()
                .refine(
                    iat => iat <= Math.floor(Date.now() / 1000),
                    { message: "La date d'émission est dans le futur" }
                ),
});

const AccessTokenDataSchema: ZodObject<{ levelAccess: ZodNumber, exp: ZodNumber, iat: ZodNumber }> = z.object({
    levelAccess: z.number().int().positive(),
    exp:         z.number().int(),
    iat:         z.number().int()
});

const RoleSchema: ZodObject<{ name: ZodString, levelAccess: ZodNumber }> = z.object({
    name:        z.string(),
    levelAccess: z.number(),
});

export {
    LoginSchema,
    RegisterSchema,
    RefreshTokenSchema,
    RoleSchema,
    RefreshTokenDataSchema,
    AccessTokenDataSchema
}