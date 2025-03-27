import {REFRESH_TOKEN} from "@/shared/config/constants.ts";



export class TokenService {
    private accessToken: string | null = null;

    getAccessToken() : string | null {
        console.log(this.accessToken)
        return this.accessToken;
    }


    setAccessToken(token: string | null): void {
        this.accessToken = token
    }

    getRefreshToken = () => {
        return localStorage.getItem(REFRESH_TOKEN) || null;
    };

    removeTokens = () => {
        localStorage.removeItem(REFRESH_TOKEN);
        this.accessToken = null;
    }

    setRefreshToken = (token: string) => {
        localStorage.setItem(REFRESH_TOKEN, token);
    }

}

export const tokenService = new TokenService();