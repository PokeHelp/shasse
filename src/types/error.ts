import {ErrorMap} from "@types";

export type Errors = { [key: string]: string };

export type ErrorResponse = {
    success: false;
    error: string | ErrorMap;
}