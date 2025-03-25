import {sendResponse} from "./http";
import {createJWT, verifyJWT, getCookie} from "./auth";
import {setFieldError, clearFieldError, clearAllErrors, handleGenericError, validateData, mapError} from './error';
import {logError} from './server'
import {getRole, RoleLevels, RoleName, getLevelAccess} from './role';

export {
    sendResponse,
    createJWT,
    verifyJWT,
    mapError,
    setFieldError,
    clearFieldError,
    clearAllErrors,
    handleGenericError,
    validateData,
    logError,
    getCookie,
    getRole,
    RoleLevels,
    getLevelAccess
}

export type {
    RoleName
}