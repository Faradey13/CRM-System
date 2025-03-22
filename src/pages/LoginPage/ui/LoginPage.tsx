import LoginForm from "@/features/Authentication/LoginForm";
import {useEffect, useState} from "react";
import {authApi} from "@/features/Authentication/api/authApi.ts";
import {AuthData, defineCodeStatus, ErrorCodes} from "@/features/Authentication/model/types";
import {tokenService} from "@/features/Authentication/service/TokenService.ts";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "@/app/providers/routes/model/constants";
import {Flex} from "antd";
import useApp from "antd/es/app/useApp";
import {useUser} from "@/entities/User/service/useUser.ts";


const LoginPage = () => {

    const [errorLoginMessage, setErrorLoginMessage] = useState<string>('');
    const [login, {error, isError, isLoading, isSuccess}] = authApi.useLoginMutation()
    const navigate = useNavigate();
    const {message} = useApp();
    const {fetchUser} = useUser()

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
        try {
            const tokenData = await login(values).unwrap();
            tokenService.setTokens(tokenData);
            await fetchUser()
            navigate(RoutePath.MAIN);
        } catch (err) {
            console.error('ошибка логина', err);
        }
    };
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