

export const RoutePath = {
    MAIN: '/',
    USER: '/user',
    AUTH: '/auth',
    LOGIN: 'login',
    REGISTER: 'register',
    NOTFOUND: '/notfound',
    ADMIN_USERS: '/admin/users',
    ADMIN_USER: `/admin/users/:id`,
    Get_ADMIN_USER: (id:number) => `/admin/users/${id}`,
} as const;