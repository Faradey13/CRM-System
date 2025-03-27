import {FC, memo} from "react";
import cls from './TodoForm.module.scss'
import {MAX_LENGTH_TASK, MIN_LENGTH_TASK} from "../../model/constants";
import {Form, FormInstance, Input} from "antd";
import {FormValues} from "@/entities/Todo/model/types";



interface todoFormProps {
    onSubmit: (values: FormValues, id?: number) => Promise<void>;
    initialTitle?: string;
    form: FormInstance<FormValues>;
    formId: string;
}


export const TodoForm: FC<todoFormProps> = memo(({onSubmit, initialTitle, form, formId}) => {
    const handleSubmit = (values: FormValues) => {
        onSubmit(values);
        form.resetFields();
    };
    const initialValues: FormValues = {
        formValue: initialTitle || '',
    };

    return (
        <Form
            form={form}
            id={formId}
            className={cls.formContainer}
            onFinish={handleSubmit}
            initialValues={initialTitle ? initialValues : undefined}
        >
            <section className={cls.form}>
                <Form.Item
                    className={cls.formItem}
                    name='formValue'
                    rules={[
                        {required: true, message: 'Задача не может быть пустой'},
                        {min: MIN_LENGTH_TASK, message: `Длинна задачи должна быть больше ${MIN_LENGTH_TASK}`},
                        {max: MAX_LENGTH_TASK, message: `Длинна задачи должна быть меньше ${MAX_LENGTH_TASK}`}
                    ]}
                >
                    <Input
                        className={cls.input}
                        placeholder='Task To Be Done...'
                    />
                </Form.Item>

            </section>
        </Form>
    );
});

