import {Prisma} from "@prisma/client";

export type UserWithRoles = Prisma.userGetPayload<{
    include: {
        roleUsers: {
            include: {
                role: true;
            };
        };
    };
}>;