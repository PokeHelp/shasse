'use server';

import {JSX} from "react";
import {Typography} from "@components";
import {RedirectButton} from "@src/components/moleculs";

export default async function Unauthorize(): Promise<JSX.Element>
{
    return (
      <>
        <Typography>Vous n êtes pas authorisé à accéder à cette page</Typography>
        <RedirectButton redirectUrl={'/login'} text={'Aller à la page de connexion'} />
        <RedirectButton redirectUrl={'/'} text={"Aller à la page d'accueil"} />
      </>
    );
}