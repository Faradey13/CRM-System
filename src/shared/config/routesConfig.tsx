import {RouteProps} from "react-router-dom";
import UserPage from "@/pages/UserPage";
import TodoPage from "@/pages/TodoPage";



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
        element: <TodoPage/>,
        path: RoutePath.main
    },
    [AppRoutes.USER] : {
        element: <UserPage/>,
        path: RoutePath.user
    }
}