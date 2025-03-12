import {RouteProps} from "react-router-dom";
import MainPage from "@/pages/MainPage";
import UserPage from "@/pages/UserPage";



export enum AppRoutes {
    MAIN = 'main',
    USER = 'user',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.USER]: '/user',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN] : {
        element: <MainPage/>,
        path: RoutePath.main
    },
    [AppRoutes.USER] : {
        element: <UserPage/>,
        path: RoutePath.user
    }
}