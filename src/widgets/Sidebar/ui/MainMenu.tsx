import {Link} from "react-router-dom";
import cls from './Sidebar.module.scss'
import {Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import {useSelector} from "react-redux";
import {StateSchema} from "@/shared/config/StateSchema.ts";
import { RoutePath } from "@/shared/config/constants";


export const MainMenu = () => {

    const isAdmin = useSelector((state:StateSchema) => state.auth.isAdmin);
    const user = useSelector((state: StateSchema) => state.auth.User)


    const pages = [
        { path: RoutePath.MAIN, name: 'Список задач', isAdmin: false },
        { path: (RoutePath.USER).replace(':id', String(user?.id)), name: 'Профиль', isAdmin: false },
        { path: RoutePath.ADMIN_USERS, name: 'Пользователи', isAdmin: true}

    ];
    const filteredPAges = pages.filter((page) => {
        if(!page.isAdmin) return page;
        if(page.isAdmin && isAdmin) return page
    })


    return (
        <Sider className={cls.sidebar}>
            <Menu className={cls.menu}
                  items={filteredPAges.map((page) => ({
                      key: page.path,
                      label: (
                          <Link to={page.path}>{page.name}</Link>
                      )
                  }))}
            />
        </Sider>
    );
};
