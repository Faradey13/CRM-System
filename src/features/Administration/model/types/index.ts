import {UserRoles} from "@/entities/User/model/types";


export interface User {
    id: number;
    username: string;
    email: string;
    date: string;
    isBlocked: boolean;
    roles: UserRoles[];
    phoneNumber: string;
}

export interface MetaResponse<T> {
    data: T[]
    meta: {
        totalAmount: number;
        sortBy: string;
        sortOrder: 'asc' | 'desc';
    }
}

export interface UserEditRequest{
    username?: string;
    email?: string;
    phoneNumber?: string;
}

export interface UserAdminFilters {
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    isBlocked?: boolean;
    limit?: number;
    offset?: number;
}

export interface UserRolesRequest {
    roles: UserRoles[]
}