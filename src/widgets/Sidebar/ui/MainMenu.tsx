import {Link} from "react-router-dom";
import cls from './Sidebar.module.scss'
import {Menu} from "antd";
import Sider from "antd/es/layout/Sider";


export const MainMenu = () => {
    enum PagePath {
        MAIN = '/',
        USER = '/user'
    }

    const pages = [
        { path: PagePath.MAIN, name: 'Список задач' },
        { path: PagePath.USER, name: 'Профиль' },

    ];

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
        </Sider>
    );
};
