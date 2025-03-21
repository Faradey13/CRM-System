import {Navigate, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {StateSchema} from "@/app/providers/StoreProvoder/config/StateSchema.ts";
import {useEffect, useState} from "react";
import {setAuthStatus} from "@/features/Authentication/model/slice/authSlice.ts";
import {tokenService} from "@/features/Authentication/service/TokenService.ts";
import {AppDispatch} from "@/app/providers/StoreProvoder/config/store.ts";
import {RoutePath} from "@/app/providers/routes/model/constants";


const ProtectedRoutes = () => {
    const accessToken = tokenService.getAccessToken();
    const [isInitialized, setIsInitialized] = useState(false)
    const isAuth = useSelector((state: StateSchema) => state.auth.isAuth)
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (accessToken) {
            dispatch(setAuthStatus(true));
        }
        setIsInitialized(true);
    }, [accessToken, dispatch]);

    if (!isInitialized) return null;

    return isAuth ? <Outlet/> : <Navigate to={`${RoutePath.AUTH}/${RoutePath.REGISTER}`} />;
};

export default ProtectedRoutes;