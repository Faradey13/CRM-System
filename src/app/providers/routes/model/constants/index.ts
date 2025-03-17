export enum AppRoutes {
    MAIN = 'main',
    USER = 'user',
    AUTH = 'auth',
}

export const RoutePath = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.USER]: '/user',
    [AppRoutes.AUTH]: '/auth',
} as const;