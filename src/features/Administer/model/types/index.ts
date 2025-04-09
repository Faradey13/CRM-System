import {Profile, UserRoles} from "@/entities/User/model/types";


// export interface MetaResponse<T> {
//     data: T[]
//     meta: {
//         totalAmount: number;
//         sortBy: string;
//         sortOrder: 'asc' | 'desc';
//     }
// }

export type UserEditRequest = Pick<Partial<Profile>, 'phoneNumber' | 'username' | 'email'>

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