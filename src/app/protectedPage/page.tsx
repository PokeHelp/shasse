'use client';

import {AuthGuard} from "@components";
import {JSX} from "react";
import {role} from "@prisma/client";

/**
 * Page: /protectedPage
 * Page de test
 *
 * @constructor
 */
export default function ProtectedPage(): JSX.Element
{
    return (
        <AuthGuard requiredRole={role.PUBLIC}>
            <h1>Route protégée</h1>
        </AuthGuard>
    );
}