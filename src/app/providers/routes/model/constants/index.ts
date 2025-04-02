

export const RoutePath = {
    MAIN: '/',
    USER: '/user/:id',
    USER_PATH: (id:number) => `/user/${id}`,
    AUTH: '/auth',
    LOGIN: 'login',
    REGISTER: 'register',
    NOTFOUND: '/notfound',
    ADMIN_USERS: '/admin/users',

} as const;