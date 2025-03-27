import {tokenService} from "@/features/Authentication/service/TokenService.ts";
import {setAuthStatus, setIsAdmin, setIsInitialized, setUser} from "@/features/Authentication/model/slice/authSlice.ts";
import {UserRoles} from "@/entities/User/model/types";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/providers/StoreProvoder/config/store.ts";
import {userApi} from "@/entities/User/api/userApi.ts";


export const useUser = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [trigger] = userApi.useLazyGetUserQuery();
    const fetchUser = async () => {

        const token = tokenService.getAccessToken();
        const refreshToken = tokenService.getRefreshToken();
        if (token || refreshToken) {
            try {
                const userResult = await trigger().unwrap();
                console.log(userResult)
                dispatch(setAuthStatus(true));
                dispatch(setUser(userResult));
                if (userResult.roles.includes(UserRoles.ADMIN)) {
                    dispatch(setIsAdmin(true));
                }
            } catch {
                console.error('ошибка загрузки пользователя')
            }
            dispatch(setIsInitialized(true));
        } else {
            dispatch(setIsInitialized(true));
        }
    };
    return {fetchUser}
}
