import LoginForm from "@/features/Authentication/LoginForm";
import {useEffect, useState} from "react";
import {authApi} from "@/features/Authentication/api/authApi.ts";
import {AuthData, defineCodeStatus, ErrorCodes} from "@/features/Authentication/model/types";
import {userApi} from "@/entities/User/api/userApi.ts";
import {setAuthStatus, setUser} from "@/features/Authentication/model/slice/authSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/providers/StoreProvoder/config/store.ts";
import {tokenService} from "@/features/Authentication/service/TokenService.ts";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "@/app/providers/routes/model/constants";
import {Flex} from "antd";
import useApp from "antd/es/app/useApp";


const LoginPage = () => {

    const [errorLoginMessage, setErrorLoginMessage] = useState<string>('');
    const [login, {error, isError, isLoading, isSuccess}] = authApi.useLoginMutation()
    const {data: UserData} = userApi.useGetUserQuery()
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const {message} = useApp();

    useEffect(() => {
        if (isError && error) {
            console.log(error)
            if (defineCodeStatus(error)) {
                if (error.originalStatus === ErrorCodes.BadRequest) {
                    setErrorLoginMessage('Ошибка авторизации, проверьте данные')
                }
                if (error.originalStatus === ErrorCodes.Unauthorized) {
                    setErrorLoginMessage('Логин или пароль не верные')
                }
                if (error.originalStatus === ErrorCodes.ServerError) {
                    setErrorLoginMessage('На сервере ведутся технические работы, приносим извинения за временные неудобства')
                }

            }
        } else if (isSuccess) {
            showSuccessMessage()
        }
    }, [isError, error, isSuccess, message])

    useEffect(() => {
        showErrorMessage()
        setErrorLoginMessage('')
    }, [errorLoginMessage]);

    const handleLogin = async (values: AuthData) => {
        const tokenData = await login(values).unwrap();
        if (tokenData) {
            tokenService.setTokens(tokenData);

            if (UserData) {
                dispatch(setAuthStatus(true))
                dispatch(setUser(UserData))
            }
            navigate(RoutePath.MAIN)
        }
    }

    const showErrorMessage = async() => {
        if (errorLoginMessage) {
            console.log(errorLoginMessage)
            await message.error(errorLoginMessage);
        }
    }
    const showSuccessMessage = async() => {
        await message.success('Вход успешен')

    }

    return (
        <Flex justify="end">
            <LoginForm
                isLoading={isLoading}
                onSubmit={handleLogin}
            />
        </Flex>

    );
};

export default LoginPage;