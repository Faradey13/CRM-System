
import {BaseQueryFn, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "@/shared/config/constants.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {defineCodeStatus, ErrorCodes} from "@/features/Authentication/model/types";
import {tokenService} from "@/features/Authentication/service/TokenService.ts";
import {authApi} from "@/features/Authentication/api/authApi.ts";
import {logoutOnClient} from "@/features/Authentication/service/authService.ts";


const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
        const accessToken = tokenService.getAccessToken();
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        }
        return headers;
    }
})

export const baseQueryWithRefresh: BaseQueryFn<
    string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && defineCodeStatus(result.error) && result.error.originalStatus === ErrorCodes.Unauthorized) {
        const refreshToken = tokenService.getRefreshToken();
        if (refreshToken) {
            try {
                const tokenUpdate = authApi.endpoints.tokenUpdate.initiate(refreshToken);
                const newTokens = await api.dispatch(tokenUpdate).unwrap();
                tokenService.setAccessToken(newTokens.accessToken);
                tokenService.setRefreshToken(newTokens.refreshToken);
                if (newTokens) {
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    logoutOnClient(api.dispatch)
                    return { error: { status: 401, data: 'Ошибка обновления токена' } as FetchBaseQueryError };
                }
            } catch {
                logoutOnClient(api.dispatch)
                return { error: { status: 401, data: 'Ошибка обновления токена' } as FetchBaseQueryError };
            }
        } else {
            logoutOnClient(api.dispatch)
            return result;
        }
    }

    return result;
};