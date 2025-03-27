import {Button, ConfigProvider, Flex, Form, Input} from "antd";
import {
    MAX_LOGIN, MAX_PASSWORD,
    MIN_LOGIN,
    MIN_PASSWORD,
} from "@/features/Authentication/model/constants";
import cls from "@/features/Authentication/RegistrationForm/ui/RegistrationView.module.scss";
import {AuthData} from "@/features/Authentication/model/types";
import {FC} from "react";
import {RoutePath} from "@/app/providers/routes/model/constants";
import {useNavigate} from "react-router-dom";
import loginIcon from '@/shared/assets/icons/loginIcon.svg'

interface LoginViewProps {
    isLoading: boolean;
    onSubmit: (data: AuthData) => void;
}

export const LoginView:FC<LoginViewProps> = ({isLoading,onSubmit,}) => {
    const [form] = Form.useForm<AuthData>();
    const navigate = useNavigate()

    const handleGoToRegister = () => {
        navigate(`${RoutePath.AUTH}/${RoutePath.REGISTER}`)
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#7F265B',
                    controlHeightLG: 50,
                }, components: {
                    Button: {
                        colorPrimary: '#7F265B',
                    },
                }

            }}
        >
            <Flex style={{
                width: 420,
                position: 'relative',
                left: -120,
                marginTop: 300
            }} gap={20} vertical justify="space-between">
                <img src={loginIcon} alt="" width="100" height="100"/>

                <h1>Login to your Account</h1>
                <Form<AuthData>
                    form={form}
                    onFinish={onSubmit}
                    layout="vertical"

                >

                    <Form.Item<AuthData>
                        label='login'
                        name={'login'}
                        rules={[
                            {required: true, message: 'Логин обязателен для заполнения'},
                            {min: MIN_LOGIN, message: `Длинна логина должна быть больше ${MIN_LOGIN}`},
                            {max: MAX_LOGIN, message: `Длинна логина должна быть меньше ${MAX_LOGIN}`}
                        ]}
                        hasFeedback
                    >
                        <Input size={'large'}/>
                    </Form.Item>

                    <Form.Item<AuthData>
                        label='password'
                        name={'password'}
                        rules={[
                            {required: true, message: 'Пароль обязателен для заполнения'},
                            {min: MIN_PASSWORD, message: `Длинна пароля должна быть больше ${MIN_PASSWORD}`},
                            {max: MAX_PASSWORD, message: `Длинна пароля должна быть меньше ${MAX_PASSWORD}`}
                        ]}
                        hasFeedback
                    >
                        <Input.Password size={'large'}/>
                    </Form.Item>


                    <Form.Item<AuthData>
                        style={{marginTop: 32}}>
                        <Button
                            loading={isLoading}
                            disabled={isLoading}
                            htmlType={'submit'}
                            block
                            type={'primary'}
                            size={'large'}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <Flex align={'center'} style={{marginTop: 217}} gap={10} justify={'center'}>
                    <span className={cls.newAcc}>Not Registered Yet?</span>
                    <Button
                        size={'large'}
                        className={cls.newAccCreate}
                        type={'primary'}
                        onClick={handleGoToRegister}
                    >
                        Create account
                    </Button>
                </Flex>

            </Flex>
        </ConfigProvider>

    );
};