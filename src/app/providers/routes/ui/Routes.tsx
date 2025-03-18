import {createBrowserRouter, Outlet} from "react-router-dom";
import UserPage from "@/pages/UserPage";
import TodoPage from "@/pages/TodoPage";
import {Flex, Layout} from "antd";

import {RoutePath} from "@/app/providers/routes/model/constants";
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
                path: RoutePath.MAIN,
                element: <TodoPage />,
            },
            {
                path: RoutePath.USER,
                element: <UserPage />,
            },
        ],
    },
]);