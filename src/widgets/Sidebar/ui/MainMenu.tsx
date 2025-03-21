import {Link} from "react-router-dom";
import cls from './Sidebar.module.scss'
import {Button, Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import {tokenService} from "@/features/Authentication/service/TokenService.ts";
import {userApi} from "@/entities/User/api/userApi.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/providers/StoreProvoder/config/store.ts";


export const MainMenu = () => {
    const [logout, {isLoading}] = userApi.useLogoutMutation()
    const dispatch = useDispatch<AppDispatch>()
    enum PagePath {
        MAIN = '/',
        USER = '/user'
    }

    const pages = [
        { path: PagePath.MAIN, name: 'Список задач' },
        { path: PagePath.USER, name: 'Профиль' },

    ];
    const handleLogout = async () => {
        try {
            await logout(undefined)
            tokenService.logoutOnClient(dispatch)
        } catch (error){
            console.error(error)
        }


    }

    return (
        <Sider className={cls.sidebar}>
            <Menu className={cls.menu}
                  items={pages.map((page) => ({
                      key: page.path,
                      label: (
                          <Link to={page.path}>{page.name}</Link>
                      )
                  }))}
            />
            <Button
                onClick={handleLogout}
                loading={isLoading}
            >Logout</Button>
        </Sider>
    );
};
