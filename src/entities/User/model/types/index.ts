export interface Profile {
    id: number;
    username: string;
    email: string;
    date: string;
    isBlocked: boolean;
    roles: UserRoles[];
    phoneNumber: string;
}

export enum UserRoles {
    ADMIN = "ADMIN",
    MODERATOR = "MODERATOR",
    USER = "USER",
    HUILA= "HUILA",
}