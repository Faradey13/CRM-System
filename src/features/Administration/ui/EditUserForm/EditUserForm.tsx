import {Button, Form, Input} from "antd";
import {Profile} from "@/entities/User/model/types";
import {FC} from "react";
import {adminApi} from "@/features/Administration/api/adminApi.ts";
import {MAX_USERNAME, MIN_USERNAME} from "@/features/Authentication/model/constants";

type EditUserFormValues = Pick<Profile, 'username' | 'email' | 'phoneNumber'>

interface EditUserFormProps {
    userValues: EditUserFormValues;
    id: number;
    close: () => void;
}

export const EditUserForm: FC<EditUserFormProps> = ({userValues, id, close}) => {
    const [editUserById, {isLoading}] = adminApi.useEditUserByIdMutation()
    const initialValues: EditUserFormValues = {
        email: userValues.email,
        username: userValues.username,
        phoneNumber: userValues.phoneNumber
    }

    const handleEditUser = async (values: EditUserFormValues) => {
        const userEditData: Partial<EditUserFormValues> = {}
        if(values.email! !== initialValues.email) userEditData['email'] = values.email
        if(values.username! !== initialValues.username) userEditData['username'] = values.username
        if(values.phoneNumber! !== initialValues.phoneNumber) userEditData['phoneNumber'] = values.phoneNumber
        try {
            await editUserById([id, userEditData])
            close()
        } catch (error) {
            console.error('Ошибка обновления пользователя', error)
        }
    }

    return (
        <Form<EditUserFormValues>
            onFinish={handleEditUser}
            initialValues={initialValues}
        >
            <Form.Item<EditUserFormValues>
                name={'username'}
                rules={[
                    {min: MIN_USERNAME, message: `Длинна имени должна быть больше ${MIN_USERNAME}`},
                    {max: MAX_USERNAME, message: `Длинна имени должна быть меньше ${MAX_USERNAME}`}
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item<EditUserFormValues>
                name={'email'}
                rules={[
                    {type: "email", message: 'Введите корректный email'},
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item<EditUserFormValues>
                name={'phoneNumber'}
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
                <Input/>
            </Form.Item>
            <Form.Item>
                <Button
                    htmlType={'submit'}
                    loading={isLoading}
                >
                    Изменить
                </Button>
            </Form.Item>
            <Form.Item>
                <Button
                    onClick={close}
                >
                    Отмена
                </Button>
            </Form.Item>
        </Form>
    );
};
