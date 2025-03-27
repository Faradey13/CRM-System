import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "@/shared/config/constants.ts";
import {AuthData, Token, UserRegistration} from "@/features/Authentication/model/types";
import {Profile} from "@/entities/User/model/types";


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl: `${BASE_URL}/auth`}),
    tagTypes: ["auth"],
    endpoints: (build) => ({
        login: build.mutation<Token, AuthData>({
            query: (authData) => ({
                url: "/signin",
                method: "POST",
                body: authData,
            }),
            invalidatesTags: ["auth"],
        }),
        registration: build.mutation<Profile, UserRegistration>({
            query: (registrationData) => ({
                url: "/signup",
                method: "POST",
                body: registrationData,
            }),
            invalidatesTags: ["auth"],
        }),
        tokenUpdate: build.mutation<Token, string>({
           query: (refreshToken) => ({
               url: 'refresh',
               method: 'POST',
               body: {refreshToken: refreshToken}
           })
        })
    }),
});
