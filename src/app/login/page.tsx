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
            <Typography>Login</Typography>
            <LoginForm/>
        </>
    );
}