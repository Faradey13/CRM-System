import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

export interface UserRegistration {
    login: string;
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
}

export interface AuthData {
    login: string;
    password: string;
}

export interface RefreshToken {
    refreshToken: string;
}

export type unionErrorType  =  FetchBaseQueryError | SerializedError | undefined
export function defineCodeStatus(error: unionErrorType) {
    return (
        error !== undefined &&
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        error.status === 'PARSING_ERROR'
    )
}

export enum ErrorCodes {
    Conflict = 409,
    BadRequest = 400,
    Unauthorized = 401,
    ServerError = 500,
}

export type NewUser = UserRegistration & { confirmPassword?: string }

export interface Token {
    accessToken: string
    refreshToken: string
}

export const errorMessages: Record<ErrorCodes, string> = {
    [ErrorCodes.Conflict]: "Конфликт данных авторизации",
    [ErrorCodes.BadRequest]: "Некорректный запрос",
    [ErrorCodes.Unauthorized]: "Ошибка авторизации",
    [ErrorCodes.ServerError]: "На сервере ведутся технические работы, приносим извинения за временные неудобства",
};

