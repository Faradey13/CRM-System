import {FC, FormHTMLAttributes, memo, useState} from "react";

import cls from './AddForm.module.scss'
import {MAX_LENGTH_TASK, MIN_LENGTH_TASK} from "../../model/constants";
import {Button, Form, Input, Spin} from "antd";
import {useForm} from "antd/es/form/Form";
import {addTodo} from "@/entities/Todo/api/api.ts";


interface addForm extends FormHTMLAttributes<HTMLFormElement> {
    onAdded: () => Promise<void>;
}
interface AddFormValues {
    addTodo: string;
}

export const AddForm: FC<addForm> = memo(({onAdded}) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [form] = useForm()

    const handleSubmit = async (values:AddFormValues) => {
        try {
            setIsLoading(true)
            setTimeout(async() => { //таймаут для наглядности
                await addTodo(values.addTodo)
                await onAdded()
                form.resetFields();
                setIsLoading(false)
            },1000)

        } catch {
            alert('Ошибка добавления, попробуйте позже')
        }



    }

    return (
        <Form form={form} className={cls.formContainer} onFinish={handleSubmit}>
            <section className={cls.form}>
                <Form.Item
                    className={cls.formItem}
                    name='addTodo'
                    rules={[
                        {required: true, message: 'Введите задачу для добавления'},
                        {min: MIN_LENGTH_TASK, message: `Длинна задачи должна быть больше ${MIN_LENGTH_TASK}`},
                        {max: MAX_LENGTH_TASK, message: `Длинна задачи должна быть меньше ${MAX_LENGTH_TASK}`}
                    ]}
                >
                    <Input
                        className={cls.input}
                        placeholder='Task To Be Done...'
                    />
                </Form.Item>
                <Button
                    disabled={isLoading}
                    htmlType='submit'
                    className={cls.button}

                >
                    Add
                </Button>
            </section>
            {isLoading && <Spin/>}
        </Form>
    );
});

