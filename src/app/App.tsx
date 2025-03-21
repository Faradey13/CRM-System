import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import {userApi} from "@/entities/User/api/userApi.ts";
import {setAuthStatus, setUser} from "@/features/Authentication/model/slice/authSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/providers/StoreProvoder/config/store.ts";
import {tokenService} from "@/features/Authentication/service/TokenService.ts";
import {Flex} from "antd";
import './styles/index.scss'


function App() {
    const dispatch = useDispatch<AppDispatch>();
    const [trigger] = userApi.useLazyGetUserQuery()
    const isToken = tokenService.hasAccessToken()
    useEffect(() => {
        if (isToken) {
            fetchUser()
        }
    }, [isToken]);

    const fetchUser = async () => {
        try {
            const userResult = await trigger(undefined, false).unwrap();
            dispatch(setAuthStatus(true));
            dispatch(setUser(userResult));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Flex justify={'center'} align={'start'} className="App">
            <Outlet/>
        </Flex>
    )

}

export default App

