'use server';

import {JSX} from "react";
import {getRequiredUser} from "@src/lib/auth-server";

export default async function Unauthorize(): Promise<JSX.Element>
{
    await getRequiredUser();

    return (
      <p>
          Authorisé
      </p>
    );
}