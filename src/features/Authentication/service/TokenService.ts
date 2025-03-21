import {ACCESS_TOKEN, REFRESH_TOKEN} from "@/shared/config/constants.ts";
import {Token} from "@/features/Authentication/model/types";
import {AppDispatch} from "@/app/providers/StoreProvoder/config/store.ts";
import {setAuthStatus, setUser} from "@/features/Authentication/model/slice/authSlice.ts";
import {authApi} from "@/features/Authentication/api/authApi.ts";


export class TokenService {
    getAccessToken = () => {
        return localStorage.getItem(ACCESS_TOKEN) || null;
    }

    getRefreshToken = () => {
        return localStorage.getItem(REFRESH_TOKEN) || null;
    };

    removeTokens = () => {
        localStorage.removeItem(ACCESS_TOKEN) ;
        localStorage.removeItem(REFRESH_TOKEN);
    }

    hasAccessToken = () => !!this.getAccessToken();

    setTokens = (tokens: Token) => {
        localStorage.setItem(ACCESS_TOKEN, tokens.accessToken);
        localStorage.setItem(REFRESH_TOKEN, tokens.refreshToken);
    }
    logoutOnClient(dispatch: AppDispatch): void {
        try {
            this.removeTokens();
            dispatch(setAuthStatus(false));
            dispatch(setUser(null));
            window.location.reload();
        } catch (e) {
            console.error(e);
        }
    }

    async refreshTokens(dispatch: AppDispatch): Promise<Token | null> {
        const refreshToken = this.getRefreshToken();

        if (!refreshToken) {
            this.logoutOnClient(dispatch);
            return null;
        }

        try {
            const tokenUpdate = authApi.endpoints.tokenUpdate.initiate(refreshToken);
            const data = await dispatch(tokenUpdate).unwrap();
            this.setTokens(data);
            return data;
        } catch (error) {
            console.error('Ошибка обновления токена:', error);
            this.logoutOnClient(dispatch);
            return null;
        }
    }
}

export const tokenService = new TokenService();