import {toNextJsHandler} from "better-auth/next-js";
import {auth} from "@lib";

export const {POST, GET} = toNextJsHandler(auth)