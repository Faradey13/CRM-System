import {Button, Form, Input} from "antd";
import {FC} from "react";
import {adminApi} from "@/features/Administer/api/adminApi.ts";
import {MAX_USERNAME, MIN_USERNAME} from "@/features/Authentication/model/constants";
import {UserEditRequest} from "@/features/Administer/model/types";
import {PHONE_REGEX} from "@/shared/config/constants.ts";
import {getChangedValues} from "@/shared/utils/getChangedValues.ts";



interface EditUserFormProps {
    initialValues: UserEditRequest;
    userId: number;
    close: () => void;
}

export const EditUserForm: FC<EditUserFormProps> = ({initialValues, userId, close}) => {
    const [editUserById, {isLoading}] = adminApi.useEditUserByIdMutation()
    const userValues: UserEditRequest = {
        email: initialValues.email,
        username: initialValues.username,
        phoneNumber: initialValues.phoneNumber
    }

    const handleEditUser = async (values: UserEditRequest) => {
        const userEditData = getChangedValues(userValues, values)
        try {
            if(Object.keys(userEditData).length > 0) {
                await editUserById([userId, userEditData])
            }
            close()
        } catch (error) {
            console.error('Ошибка обновления пользователя', error)
        }
    }

    return (
        <Form<UserEditRequest>
            onFinish={handleEditUser}
            initialValues={userValues}
        >
            <Form.Item<UserEditRequest>
                name={'username'}
                rules={[
                    {min: MIN_USERNAME, message: `Длинна имени должна быть больше ${MIN_USERNAME}`},
                    {max: MAX_USERNAME, message: `Длинна имени должна быть меньше ${MAX_USERNAME}`}
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item<UserEditRequest>
                name={'email'}
                rules={[
                    {type: "email", message: 'Введите корректный email'},
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item<UserEditRequest>
                name={'phoneNumber'}
                rules={[
                    {
                        validator: (_, value) => {
                            if (!value || PHONE_REGEX.test(value)) {
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
