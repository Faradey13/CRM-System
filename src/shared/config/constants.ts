

export const BASE_URL = 'https://easydev.club/api/v1'
export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

export const RoutePath = {
    MAIN: '/',
    USER: '/user/:id',
    AUTH: '/auth',
    LOGIN: 'login',
    REGISTER: 'register',
    NOTFOUND: '/notfound',
    ADMIN_USERS: '/admin/users',

} as const;

export const PHONE_REGEX = /^\+?[1-9]\d{6,14}$/
