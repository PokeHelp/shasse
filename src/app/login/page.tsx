'use server';

import {Typography, LoginForm} from "@components";
import {JSX} from "react";

/**
 * Page: /login
 *
 * @constructor
 */
export default async function Login(): Promise<JSX.Element>
{
    return (
        <>
            <Typography variant="h1">Login</Typography>
            <LoginForm/>
        </>
    );
}