import {Flex, Spin} from "antd";
import cls from './Loader.module.scss'


const Loader = () => {
    return (
        <Flex justify={'center'} align={'center'} className={cls.loader}>
           <Spin size="large"/>
        </Flex>
    );
};

export default Loader;