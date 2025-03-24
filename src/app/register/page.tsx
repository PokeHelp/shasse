'use server';

import {Typography, RegisterForm} from "@components";
import {JSX} from "react";

/**
 * Page: /register
 *
 * @constructor
 */
export default async function Register(): Promise<JSX.Element>
{
    return (
        <>
            <Typography variant="h1">Register</Typography>
            <RegisterForm/>
        </>
    );
}