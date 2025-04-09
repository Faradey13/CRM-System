import {createBrowserRouter} from "react-router-dom";
import UserPage from "@/pages/UserPage";
import TodoPage from "@/pages/TodoPage";
import {ProtectedLayout} from "./ProtectedLayout.tsx";
import NotFoundPage from "@/pages/NotFoundPage";
import LoginPage from "@/pages/LoginPage";
import App from "@/app/App.tsx";
import RegistrationPage from "@/pages/RegistrationPage";
import UsersPage from "@/pages/UsersPage";
import AuthLayout from "@/pages/AuthPage";
import RoleLayout from "@/app/providers/routes/ui/RoleLayout.tsx";
import {RoutePath} from "@/shared/config/constants.ts";



export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                element: <ProtectedLayout />,
                children: [
                    {
                        path: RoutePath.MAIN,
                        element: <TodoPage />,
                    },
                    {
                        path: RoutePath.USER,
                        element: <UserPage />,
                    },
                    {
                        element: <RoleLayout />,
                        children: [
                            {
                                path: RoutePath.ADMIN_USERS,
                                element: <UsersPage />,
                            }
                        ],
                    },
                ],
            },
            {
                path: RoutePath.AUTH,
                element: <AuthLayout />,
                children: [
                    {
                        index: true,
                        element: <NotFoundPage />,
                    },
                    {
                        path: RoutePath.LOGIN,
                        element: <LoginPage />,
                    },
                    {
                        path: RoutePath.REGISTER,
                        element: <RegistrationPage />,
                    },
                ],
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
            {
                path: RoutePath.NOTFOUND,
                element: <NotFoundPage />,
            },
        ],
    },
]);