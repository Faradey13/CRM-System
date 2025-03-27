import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {StateSchema} from "@/app/providers/StoreProvoder/config/StateSchema.ts";
import {RoutePath} from "@/app/providers/routes/model/constants";
import {Flex, Layout} from "antd";
import MainMenu from "@/widgets/Sidebar";


export const ProtectedLayout = () => {
    const isAuth = useSelector((state: StateSchema) => state.auth.isAuth)
    const isInitialized = useSelector((state: StateSchema) => state.auth.isInitialized);

    if (!isInitialized) return null
    if (!isAuth) return <Navigate to={`${RoutePath.AUTH}/${RoutePath.LOGIN}`} replace/>;


    return (
        <Layout hasSider={true}>
            <Flex justify={'center'}>
                <MainMenu/>
                <Outlet/>
            </Flex>
        </Layout>
    );
};


