import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "@/app/providers/StoreProvoder/config/baseQuery.ts";
import {User} from "@/entities/User/model/types";
import {UserAdminFilters, UserEditRequest, UserRolesRequest} from "@/features/Administer/model/types";
import {MetaResponse} from "@/shared/types";


export const adminApi = createApi({
    tagTypes: ['admin', 'users'],
    reducerPath: 'adminApi',
    baseQuery: baseQueryWithRefresh,
    endpoints: (build) => ({
        getAllUsers: build.query<MetaResponse<User, undefined>, UserAdminFilters>({
            query: (params) => ({
                url:'/admin/users',
                method: 'GET',
                params

            }),
            providesTags: () => ['users']
        }),

        getUserById: build.query<User, number>({
            query: (id) => ({
                url:`/admin/users/${id}`,
                method: 'GET',
            })
        }),

        editUserById: build.mutation<User, [number, UserEditRequest]>({
            query: ([id, userData]) => ({
                url: `/admin/users/${id}`,
                method: 'PUT',
                body: userData
            }),
            invalidatesTags : ['users'],
        }),

        blockUser: build.mutation<User, number>({
            query: (id) => ({
                url: `/admin/users/${id}/block`,
                method: 'POST'
            }),
            invalidatesTags : ['users'],
        }),

        unblockUser: build.mutation<User, number>({
            query: (id) => ({
                url: `/admin/users/${id}/unblock`,
                method: 'POST'
            }),
            invalidatesTags : ['users'],
        }),

        editRights: build.mutation<User, [number, UserRolesRequest]>({
            query:([id, roles]) => ({
                url: `/admin/users/${id}/rights`,
                method: 'POST',
                body: roles
            }),
            invalidatesTags : ['users'],
        }),

        deleteUser: build.mutation<void, number>({
            query: (id) => ({
                url: `/admin/users/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags : ['users'],
            // onQueryStarted: async (id, {dispatch, queryFulfilled }) => {
            //     try {
            //         await queryFulfilled
            //         dispatch(
            //             adminApi.util.updateQueryData('getAllUsers', undefined, (draft) => {
            //                 const index = draft.data.findIndex((user) => user.id === id)
            //                 if (index !== -1) {
            //                     draft.data.splice(index, 1);
            //                 }
            //             })
            //         )
            //     } catch (error) {
            //         console.error(error, 'ошибка обновления кеша')
            //     }
            // }
        })
    })
})