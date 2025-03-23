import {createBrowserRouter} from "react-router-dom";
import UserPage from "@/pages/UserPage";
import TodoPage from "@/pages/TodoPage";
import {RoutePath} from "@/app/providers/routes/model/constants";
import ProtectedRoutes from "@/app/providers/routes/ui/ProtectedRoutes.tsx";
import NotFoundPage from "@/pages/NotFoundPage";
import LoginPage from "@/pages/LoginPage";
import App from "@/app/App.tsx";
import RegistrationPage from "@/pages/RegistrationPage";
import AuthPage from "@/pages/AuthPage";


export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                element: <ProtectedRoutes />,
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
                element: <AuthPage />,
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
        ],
    },
]);