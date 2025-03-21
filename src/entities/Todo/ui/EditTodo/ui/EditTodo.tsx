import {Button, Flex, Form} from "antd";
import {TodoForm} from "@/entities/Todo/ui/TodoForm/TodoForm.tsx";
import {CheckOutlined, CloseSquareOutlined} from "@ant-design/icons";
import {FC, useId} from "react";
import {FormValues} from "@/entities/Todo/model/types";
import {todosApi} from "@/entities/Todo/api/api.ts";



interface EditTodoProps {
    initialTitle: string;
    onStopEditing: () => void;
    todoId: number;
}

const EditTodo:FC<EditTodoProps> = ({initialTitle, onStopEditing, todoId}) => {

    const [updateTodo,{isLoading}] = todosApi.useUpdateTodoMutation()
    const [form] = Form.useForm();
    const formId = useId()

    const handleEditTodoText = async (values: FormValues) => {
        try {
            if (todoId) {
                await updateTodo([todoId, { title: values.formValue }]);
                onStopEditing();
            }
        } catch {
            alert('не удалось обновить задачу');
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