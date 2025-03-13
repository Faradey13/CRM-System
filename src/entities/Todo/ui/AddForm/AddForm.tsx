import {FC,FormHTMLAttributes} from "react";

import cls from './AddForm.module.scss'
import {MAX_LENGTH_TASK, MIN_LENGTH_TASK} from "../../model/constants";
import {Button, Form, Input} from "antd";
import {useForm} from "antd/es/form/Form";
import {addTodo} from "@/entities/Todo/api/api.ts";

interface addForm extends FormHTMLAttributes<HTMLFormElement> {
    onAdded: () => Promise<void>;
}
interface AddFormValues {
    addTodo: string;
}

const AddForm: FC<addForm> = ({onAdded}) => {
    const [form] = useForm()

    const handleSubmit = async (values:AddFormValues) => {
        await addTodo(values.addTodo)
        onAdded()
        form.resetFields();

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
                    htmlType='submit'
                    className={cls.button}

                >
                    Add
                </Button>
            </section>
        </Form>
    );
};

export default AddForm;