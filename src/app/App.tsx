import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import {useSelector} from "react-redux";

import {Flex, Spin} from "antd";
import './styles/index.scss'
import {StateSchema} from "@/app/providers/StoreProvoder/config/StateSchema.ts";
import {useUser} from "@/entities/User/service/useUser.ts";


function App() {
    const isInitialized = useSelector((state: StateSchema) => state.auth.isInitialized);
    const {fetchUser} = useUser()

    useEffect(() => {
        fetchUser();
    }, []);

    if (!isInitialized) return <Flex justify={'center'} align={'center'} className={'loader'}>
        <Spin size={'large'}/>
    </Flex>

    return (
        <Flex justify={'center'} align={'start'} className="App">
            <Outlet/>
        </Flex>
    );
}

export default App

