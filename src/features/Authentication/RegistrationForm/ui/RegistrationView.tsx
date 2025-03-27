import {Button, ConfigProvider, Flex, Form, Input} from "antd";
import {FC} from "react";
import cls from './RegistrationView.module.scss'
import {NewUser} from "@/features/Authentication/model/types";
import {
    MAX_LOGIN, MAX_PASSWORD,
    MAX_USERNAME,
    MIN_LOGIN,
    MIN_PASSWORD,
    MIN_USERNAME
} from "@/features/Authentication/model/constants";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "@/app/providers/routes/model/constants";
import loginIcon from '@/shared/assets/icons/loginIcon.svg'




interface RegistrationViewProps {
    onSubmit: (data: NewUser) => void;
    isLoading: boolean;

}

export const RegistrationView:FC<RegistrationViewProps> = ({onSubmit, isLoading}) => {
    const [form] = Form.useForm<NewUser>();
    const navigate = useNavigate()

    const handleGoToLogin = () => {
        navigate(`${RoutePath.AUTH}/${RoutePath.LOGIN}`)
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
                marginTop: 20
            }} gap={20} vertical justify="space-between">
                <img src={loginIcon} alt="" width="100" height="100"/>

                <h1>Register your Account</h1>

                <Form<NewUser>
                    form={form}
                    onFinish={onSubmit}
                    layout="vertical"

                >
                    <Form.Item<NewUser>
                        name="username"
                        label='username'
                        rules={[
                            {required: true, message: 'Имя пользователя обязательно для заполнения'},
                            {min: MIN_USERNAME, message: `Длинна имени должна быть больше ${MIN_USERNAME}`},
                            {max: MAX_USERNAME, message: `Длинна имени должна быть меньше ${MAX_USERNAME}`},
                            {
                                validator: (_,value) => {
                                    const regExpUsername =/^[a-zA-Zа-яА-ЯёЁ]+$/
                                    if(!value || regExpUsername.test(value)){
                                        return Promise.resolve()
                                    } else {
                                        return Promise.reject('Username может содержать только латинские и русские символы')
                                    }
                                }
                            }
                        ]}
                        hasFeedback
                    >
                        <Input size={'large'}/>
                    </Form.Item>

                    <Form.Item<NewUser>
                        label='login'
                        name={'login'}
                        rules={[
                            {required: true, message: 'Логин обязателен для заполнения'},
                            {min: MIN_LOGIN, message: `Длинна логина должна быть больше ${MIN_LOGIN}`},
                            {max: MAX_LOGIN, message: `Длинна логина должна быть меньше ${MAX_LOGIN}`},
                            {
                                validator: (_,value) => {
                                    const regExpLogin = /^[a-zA-Z]+$/
                                    if(!value || regExpLogin.test(value)){
                                        return Promise.resolve()
                                    } else {
                                        return Promise.reject('Логин может содержать только латинские символы')
                                    }
                                }
                            }
                        ]}
                        hasFeedback
                    >
                        <Input size={'large'}/>
                    </Form.Item>

                    <Form.Item<NewUser>
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

                    <Form.Item<NewUser>
                        label='confirm password'
                        name={'confirmPassword'}
                        dependencies={['password']}
                        validateTrigger={['onSubmit', 'onBlur']}
                        rules={[
                            {required: true, message: 'Пароль обязателен для заполнения'},
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject(new Error('Пароли не совпадают'))
                                    }
                                }
                            })
                        ]}
                        hasFeedback
                    >
                        <Input.Password size={'large'}/>
                    </Form.Item>

                    <Form.Item<NewUser>
                        label='email'
                        name="email"
                        rules={[
                            {required: true, message: 'email обязателен для заполнения'},
                            {type: "email", message: 'Введите корректный email'}
                        ]}
                    >
                        <Input size={'large'}/>
                    </Form.Item>

                    <Form.Item<NewUser>
                        label='phone'
                        name="phoneNumber"
                        rules={[
                            {
                                validator: (_, value) => {
                                    const phoneRegex = /^\+?[1-9]\d{6,14}$/
                                    if (!value || phoneRegex.test(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Введите корректный номер телефона'))
                                }
                            }
                        ]}
                    >
                        <Input size={'large'}/>
                    </Form.Item>
                    <Form.Item<NewUser>
                        style={{marginTop: 22}}>
                        <Button
                            loading={isLoading}
                            disabled={isLoading}
                            htmlType={'submit'}
                            block
                            type={'primary'}
                            size={'large'}
                        >
                            Sign up
                        </Button>
                    </Form.Item>
                </Form>
                <Flex align={'center'} style={{marginTop: 55}} gap={10} justify={'center'}>
                    <span className={cls.newAcc}>{'Already have an account?'}</span>
                    <Button
                        size={'large'}
                        className={cls.newAccCreate}
                        type={'primary'}
                        onClick={handleGoToLogin}

                    >
                        Login
                    </Button>
                </Flex>

            </Flex>
        </ConfigProvider>

    );
};