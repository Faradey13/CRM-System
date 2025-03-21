import {createApi} from "@reduxjs/toolkit/query/react";
import {Profile} from "@/entities/User/model/types";
import {baseQueryWithRefresh} from "@/app/providers/StoreProvoder/config/baseQuery.ts";




export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithRefresh,
    tagTypes: ['user'],
    endpoints: (build) => ({
        getUser: build.query<Profile, void>({
            query: () => ({
                url: '/user/profile',
                method: 'GET',
            })
        }),
        logout: build.mutation({
            query: () => ({
                url: '/user/logout',
                method: 'GET'
            })
        })
    })
})