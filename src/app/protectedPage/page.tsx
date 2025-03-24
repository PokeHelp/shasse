'use client';

import {AuthGuard} from "@components";
import {JSX} from "react";

/**
 * Page: /protectedPage
 * Page de test
 *
 * @constructor
 */
export default function ProtectedPage(): JSX.Element
{
    return (
        <AuthGuard requiredLevelAccess={1}>
            <h1>Route protégée</h1>
        </AuthGuard>
    );
}