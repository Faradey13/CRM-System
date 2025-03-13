import {Link, useLocation} from "react-router-dom";
import cls from './Sidebar.module.scss'
import {Menu} from "antd";
import Sider from "antd/es/layout/Sider";

export const Sidebar = () => {
    enum PagePath {
        MAIN = '/',
        USER = '/user'
    }

    const NamePath = {
        [PagePath.MAIN]: 'Список задач',
        [PagePath.USER]: 'Профиль',
    }
    const location = useLocation()
    console.log(PagePath.MAIN)
    return (
        <Sider className={cls.sidebar}>
            <Menu className={cls.menu}
                  items={[
                      {
                          key: '1',
                          label: (
                              <Link to={location.pathname === PagePath.MAIN ? PagePath.USER : PagePath.MAIN}>
                                  {location.pathname === PagePath.MAIN ? NamePath[PagePath.USER] : NamePath[PagePath.MAIN]}
                              </Link>
                          ),
                      },
                  ]}
            />
        </Sider>
    );
};
