'use server';

import {JSX} from "react";
import {AuthGuard, Typography} from "@components";
import {RedirectButton} from "components/moleculs";
import {role} from "@prisma/client";

export default async function Unauthorize(): Promise<JSX.Element>
{ // TODO: revoir le système d'authorisation ect
    return (
      <AuthGuard requiredRole={role.SUPER_ADMIN}>
        <Typography type="h1">Vous n êtes pas authorisé à accéder à cette page</Typography>
        <RedirectButton redirectUrl={'/login'} text={'Aller à la page de connexion'} />
        <RedirectButton redirectUrl={'/'} text={"Aller à la page d'accueil"} />
      </AuthGuard>
    );
}