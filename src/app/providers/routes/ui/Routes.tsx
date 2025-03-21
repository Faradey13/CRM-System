import {createBrowserRouter, Outlet} from "react-router-dom";
import UserPage from "@/pages/UserPage";
import TodoPage from "@/pages/TodoPage";
import {Flex, Layout} from "antd";

import {RoutePath} from "@/app/providers/routes/model/constants";
import {MainMenu} from "@/widgets/Sidebar/ui/MainMenu.tsx";
import ProtectedRoutes from "@/app/providers/routes/ui/ProtectedRoutes.tsx";
import NotFoundPage from "@/pages/NotFoundPage";
import LoginPage from "@/pages/LoginPage";
import App from "@/app/App.tsx";
import RegistrationPage from "@/pages/RegistrationPage";
import AuthPage from "@/pages/AuthPage";




export const router = createBrowserRouter([
    {
        element: <App/>,
        children: [
            {
                element: <ProtectedRoutes />,
                children: [
                    {
                        element: (
                            <main className={'app'}>
                                <Layout hasSider={true}>
                                    <Flex justify={'center'}>
                                        <MainMenu />
                                        <Outlet />
                                    </Flex>
                                </Layout>
                            </main>
                        ),
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
                ],
            },
            {
                path: RoutePath.AUTH,
                element: <AuthPage/>,
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
                        element: <RegistrationPage/>
                    }
                ],
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
]);