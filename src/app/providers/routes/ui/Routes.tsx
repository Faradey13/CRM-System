import {createBrowserRouter, Navigate} from "react-router-dom";
import UserPage from "@/pages/UserPage";
import TodoPage from "@/pages/TodoPage";
import {RoutePath} from "@/app/providers/routes/model/constants";
import {ProtectedLayout} from "./ProtectedLayout.tsx";
import NotFoundPage from "@/pages/NotFoundPage";
import LoginPage from "@/pages/LoginPage";
import App from "@/app/App.tsx";
import RegistrationPage from "@/pages/RegistrationPage";
import AuthLayout from "@/pages/AuthPage/index.ts";



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
                ],
            },
            {
                path: RoutePath.AUTH,
                element: <AuthLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="*" replace />,
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
        ],
    },
]);