import {createBrowserRouter, Outlet} from "react-router-dom";
import UserPage from "@/pages/UserPage";
import TodoPage from "@/pages/TodoPage";
import AuthPage from "@/pages/AuthPage/ui/AuthPage.tsx";
import {Flex, Layout} from "antd";

import {AppRoutes, RoutePath} from "@/app/providers/routes/model/constants";
import {MainMenu} from "@/widgets/Sidebar/ui/MainMenu.tsx";



export const router = createBrowserRouter([
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
                path: RoutePath[AppRoutes.MAIN],
                element: <TodoPage />,
            },
            {
                path: RoutePath[AppRoutes.USER],
                element: <UserPage />,
            },
            {
                path: RoutePath[AppRoutes.AUTH],
                element: <AuthPage />,
            },
        ],
    },
]);