import cls from './AuthPage.module.scss'
import {App, Flex} from "antd";
import {Outlet} from "react-router-dom";

const AuthPage = () => {
    return (
        <App className={cls.authWrapper}>
            <Flex  justify={'space-between'}>
                <img src="/src/shared/assets/image/authPageIllustration.png" alt=""/>
                <Outlet/>
            </Flex>
        </App>

    );
};

export default AuthPage;