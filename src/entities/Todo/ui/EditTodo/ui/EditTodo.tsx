import {Button, Flex, Form} from "antd";
import {TodoForm} from "@/entities/Todo/ui/TodoForm/TodoForm.tsx";
import {CheckOutlined, CloseSquareOutlined} from "@ant-design/icons";
import {FC, useId, useState} from "react";
import {FormValues} from "@/entities/Todo/model/types";
import {updateTodo} from "@/entities/Todo/api/api.ts";


interface EditTodoProps {
    initialTitle: string;
    onStopEditing: () => void;
    todoId: number;
    onChangeTodo: () => Promise<void>
}

const EditTodo:FC<EditTodoProps> = ({initialTitle, onStopEditing, todoId, onChangeTodo}) => {

    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const formId = useId()

    const handleEditTodoText = async (values: FormValues) => {
        try {
            setIsLoading(true);
            if (todoId) {
                await updateTodo(todoId, { title: values.formValue });
                await onChangeTodo();
                onStopEditing();
            }
        } catch {
            alert('не удалось обновить задачу');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Flex>
            <TodoForm
                onSubmit={handleEditTodoText}
                formId={formId}
                form={form}
                initialTitle={initialTitle}
            />
            <Flex vertical>
                <Button
                    disabled={isLoading}
                    htmlType='submit'
                    form={formId}
                    loading={isLoading}
                    icon={<CheckOutlined/>}
                />
                <Button
                    onClick={onStopEditing}
                    icon={<CloseSquareOutlined/>}
                />
            </Flex>
        </Flex>
    );
};

export default EditTodo;