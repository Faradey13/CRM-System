import {Button, Flex, Form} from "antd";
import {TodoForm} from "@/entities/Todo/ui/TodoForm/TodoForm.tsx";
import {FormValues} from "@/entities/Todo/model/types";
import {addTodo} from "@/entities/Todo/api/api.ts";
import {FC, useId, useState} from "react";

interface AddTodoProps {
    onAdded: () => Promise<void>;
}

const AddTodo:FC<AddTodoProps> = ({onAdded}) => {

    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const formId = useId()

    const handleSubmit = async (values:FormValues) => {
        try {
            setIsLoading(true)
            await addTodo(values.formValue)
            await onAdded()
        } catch (e) {
            alert(e)
        }  finally {
            setIsLoading(false);
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