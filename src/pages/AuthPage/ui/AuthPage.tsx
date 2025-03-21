import cls from './AuthPage.module.scss'
import {App, Flex} from "antd";
import {Outlet} from "react-router-dom";
import authPageIllustration from '@/shared/assets/image/authPageIllustration.png'

const AuthPage = () => {
    return (
        <App className={cls.authWrapper}>
            <Flex  justify={'space-between'}>
                <img src={authPageIllustration} alt=""/>
                <Outlet/>
            </Flex>
        </App>

    );
};

export default AuthPage;