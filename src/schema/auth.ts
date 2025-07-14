import {z, ZodString} from 'zod';

const passwordSchema: ZodString = z.string().regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{8,}$/,
    "Le mot de passe doit contenir : 8 caractères minimum dont 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial"
);

const LoginSchema = z.object({
    email:    z.string().email("L'email n'est pas valide"),
    password: passwordSchema
});

const RegisterSchema = z.object({
    email:     z.string().email("L'email n'est pas valide"),
    pseudonym: z.string(),
    password:  passwordSchema,
    passwordVerify:  passwordSchema,
    termsAccepted: z.boolean()
}).refine((data): boolean => data.password === data.passwordVerify, {
    path: ['passwordVerify'],
    message: "Les mots de passe ne correspondent pas."
}).refine((data): boolean => data.termsAccepted, {
    path: ['termsAccepted'],
    message: "Vous devez accepter les termes et conditions."
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

const AccessTokenDataSchema = z.object({
    levelAccess: z.number().int().positive(),
    exp:         z.number().int(),
    iat:         z.number().int()
});

const RoleSchema = z.object({
    name:        z.string(),
    levelAccess: z.number(),
});

export {
    LoginSchema,
    RegisterSchema,
    RoleSchema,
    RefreshTokenDataSchema,
    AccessTokenDataSchema
}