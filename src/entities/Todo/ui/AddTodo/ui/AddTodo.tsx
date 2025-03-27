import {Button, Flex, Form} from "antd";
import {TodoForm} from "@/entities/Todo/ui/TodoForm/TodoForm.tsx";
import {FormValues} from "@/entities/Todo/model/types";
import {FC, useId} from "react";
import {todosApi} from "@/entities/Todo/api/api.ts";



const AddTodo:FC = () => {

    const [form] = Form.useForm();
    const formId = useId()

    const [addTodo,{isLoading}] = todosApi.useAddTodoMutation()

    const handleSubmit = async (values:FormValues) => {
        try {
            await addTodo(values.formValue)
        } catch (e) {
            alert(e)
        }
    }

    return (
        <Flex justify='space-around'>
            <TodoForm
                form={form}
                onSubmit={handleSubmit}
                formId={formId}
            />
            <Button
                disabled={isLoading}
                htmlType='submit'
                loading={isLoading}
                form={formId}
            >
                Add
            </Button>
        </Flex>
    );
};

export default AddTodo;