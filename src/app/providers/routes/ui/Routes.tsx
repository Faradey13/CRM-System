import {createBrowserRouter} from "react-router-dom";
import UserPage from "@/pages/UserPage";
import TodoPage from "@/pages/TodoPage";
import {RoutePath} from "@/app/providers/routes/model/constants";
import {ProtectedLayout} from "./ProtectedLayout.tsx";
import NotFoundPage from "@/pages/NotFoundPage";
import LoginPage from "@/pages/LoginPage";
import App from "@/app/App.tsx";
import RegistrationPage from "@/pages/RegistrationPage";
import AdminLayout from "@/app/providers/routes/ui/AdminLayout.tsx";
import UsersPage from "@/pages/UsersPage";
import AdminUserPage from "@/pages/AdminUserPage/ui/AdminUserPage.tsx";
import AuthLayout from "@/pages/AuthPage";



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
                        element: <AdminLayout />,
                        children: [
                            {
                                path: RoutePath.ADMIN_USERS,
                                element: <UsersPage />,
                            },
                            {
                                path: RoutePath.ADMIN_USER,
                                element: <AdminUserPage/>
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