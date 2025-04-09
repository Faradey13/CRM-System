import LoginForm from "@/features/Authentication/LoginForm";
import {useEffect, useState} from "react";
import {authApi} from "@/features/Authentication/api/authApi.ts";
import {AuthData, defineCodeStatus, ErrorCodes, errorMessages} from "@/features/Authentication/model/types";
import {tokenService} from "@/features/Authentication/service/TokenService.ts";
import {useNavigate} from "react-router-dom";
import {Flex} from "antd";
import useApp from "antd/es/app/useApp";
import {useUser} from "@/entities/User/service/useUser.ts";
import { RoutePath } from "@/shared/config/constants";




const LoginPage = () => {

    const [errorLoginMessage, setErrorLoginMessage] = useState<string>('');
    const [login, {error, isError, isLoading, isSuccess}] = authApi.useLoginMutation()
    const navigate = useNavigate();
    const {message} = useApp();
    const {fetchUser} = useUser()

    useEffect(() => {
        if (isError && error) {
            if (defineCodeStatus(error)) {
                setErrorLoginMessage(errorMessages[error.originalStatus as ErrorCodes])
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
            tokenService.setRefreshToken(tokenData.refreshToken);
            tokenService.setAccessToken(tokenData.accessToken)
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