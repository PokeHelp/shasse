// Interface permettant de mettre à equivalence la BDD pour rester logique
export const RoleLevels = {
    PUBLIC: 1,
    ADMIN: 2,
    SUPER_ADMIN: 3,
} as const;

export type RoleName = keyof typeof RoleLevels;

export function getLevelAccess(role: RoleName): 1 | 2 | 3
{
    return RoleLevels[role];
}

export function getRole(role: RoleName): 'PUBLIC' | 'ADMIN' | 'SUPER_ADMIN'
{
    for (const roleName in RoleLevels)
    {
        if (roleName === role)
        {
            return roleName;
        }
    }

    return "PUBLIC";
}