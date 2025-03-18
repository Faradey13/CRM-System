import {FC, memo, useEffect} from "react";
import cls from './TodoForm.module.scss'
import {MAX_LENGTH_TASK, MIN_LENGTH_TASK} from "../../model/constants";
import {Button, Form, Input} from "antd";
import {useForm} from "antd/es/form/Form";

import {FormType, FormValues} from "@/entities/Todo/model/types";
import {CheckOutlined, CloseSquareOutlined} from "@ant-design/icons";


interface todoFormProps {
    formType: FormType;
    handleCloseForm?: () => void;
    isLoading: boolean;
    onSubmit: (values: FormValues, id?:number) =>Promise<void>;
    id? : number
    initialTitle?: string;
}


export const TodoForm: FC<todoFormProps> = memo(({formType, handleCloseForm,  isLoading, onSubmit, initialTitle}) => {

    const [form] = useForm()
    const handleSubmit = (values: FormValues) => {
        onSubmit(values);
        form.resetFields();
    };

    useEffect(() => {
        if (initialTitle) {
            form.setFieldsValue({ formValue: initialTitle });
        }
    }, [initialTitle, form]);

    return (
        <Form form={form} className={cls.formContainer} onFinish={handleSubmit}>
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
                        className={FormType.ADD ? cls.input : cls.inputEdit}
                        placeholder='Task To Be Done...'
                    />
                </Form.Item>
                {formType === FormType.ADD &&
                    <Button
                        disabled={isLoading}
                        htmlType='submit'
                        className={cls.button}
                        loading={isLoading}

                    >
                        Add
                    </Button>}
                {
                    formType === FormType.UPDATE &&
                    <div className={`${cls.buttons} ${cls.editingButtons}`}>
                        <Button
                            className={cls.buttonEditi}
                            disabled={isLoading}
                            htmlType='submit'
                            loading={isLoading}
                            icon={<CheckOutlined/>}
                        />
                        <Button
                            className={cls.buttonEditiErr}
                            onClick={handleCloseForm}
                            icon={<CloseSquareOutlined/>}
                        />
                    </div>
                }
            </section>
        </Form>
    );
});

