
import RegistrationForm from "@/features/Authentication/RegistrationForm";
import {authApi} from "@/features/Authentication/api/authApi.ts";
import {useEffect, useState} from "react";
import {defineCodeStatus, ErrorCodes, NewUser} from "@/features/Authentication/model/types";
import {Button, Flex} from "antd";
import useApp from "antd/es/app/useApp";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "@/app/providers/routes/model/constants";


const RegistrationPage = () => {

    const [registration, {isLoading, error, isError, isSuccess}] = authApi.useRegistrationMutation()
    const {message, notification} = useApp();
    const [errorRegMessage, setErrorRegMessage] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isError && error) {
            if (defineCodeStatus(error)) {
                const typedError = error as { originalStatus?: number };
                if (typedError.originalStatus === ErrorCodes.BadRequest) {
                    setErrorRegMessage('Ошибка регистрации, проверьте данные');
                } else if (typedError.originalStatus === ErrorCodes.ServerError) {
                    setErrorRegMessage('На сервере ведутся технические работы, приносим извинения за временные неудобства');
                } else if (typedError.originalStatus === ErrorCodes.Conflict) {
                    setErrorRegMessage('Пользователь с такими данными уже существует');
                } else {
                    setErrorRegMessage('Неизвестная ошибка регистрации');
                }
            } else {
                setErrorRegMessage('Неизвестная ошибка');
            }
        } else if (isSuccess) {
            setMessageSuccess()

        }
    }, [isError, error, isSuccess, message]);


    useEffect(() => {
        setMessageError();
        setErrorRegMessage('')
    },[errorRegMessage])

    const setMessageError = async () => {
        if (errorRegMessage) {
            await message.error(errorRegMessage);
        }
    }

    const setMessageSuccess = async () => {
       notification.success({
           message: 'Регистрация прошла успешно!',
           description: 'Теперь вы можете залогиниться',
           placement:"top",
           actions: (
               <Button
                   onClick={() => {
                       navigate(`${RoutePath.AUTH}/${RoutePath.LOGIN}`)
                       notification.destroy();
                   }}
               >Login</Button>
           )

       });
    }

    const handleRegistration = async (values: NewUser) => {
        const formData = { ...values };
        delete formData.confirmPassword;
        await registration(formData);
    };

    return (
        <Flex justify="center" align={"center"}>
             <RegistrationForm
                isLoading={isLoading}
                onSubmit={handleRegistration}
            />
        </Flex>

    );
};

export default RegistrationPage;