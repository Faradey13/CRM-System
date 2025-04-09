import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {StateSchema} from "@/shared/config/StateSchema.ts";
import {Flex, Layout} from "antd";
import MainMenu from "@/widgets/Sidebar";
import { RoutePath } from "@/shared/config/constants";


export const ProtectedLayout = () => {
    const isAuth = useSelector((state: StateSchema) => state.auth.isAuth)
    const isInitialized = useSelector((state: StateSchema) => state.auth.isInitialized);

    if (!isAuth) return <Navigate to={`${RoutePath.AUTH}/${RoutePath.LOGIN}`} replace/>;
    if (!isInitialized) return null

    return (
        <Layout hasSider={true}>
            <Flex justify={'center'}>
                <MainMenu/>
                <Outlet/>
            </Flex>
        </Layout>
    );
};


