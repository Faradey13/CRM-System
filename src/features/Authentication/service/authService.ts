import {AppDispatch} from "@/app/providers/StoreProvoder/config/store.ts";
import {setAuthStatus, setUser} from "@/features/Authentication/model/slice/authSlice.ts";
import {tokenService} from "@/features/Authentication/service/TokenService.ts";


export const logoutOnClient = (dispatch: AppDispatch): void => {
    try {
        tokenService.removeTokens();
        dispatch(setAuthStatus(false));
        dispatch(setUser(null));
        window.location.reload();
    } catch (e) {
        console.error(e);
    }
}