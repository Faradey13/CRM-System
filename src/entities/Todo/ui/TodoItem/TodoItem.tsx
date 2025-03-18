import cls from './TodoItem.module.scss'
import {FC, ReactNode, useState} from "react";
import {Button, Checkbox, List} from "antd";
import {deleteTodo, updateTodo} from "@/entities/Todo/api/api.ts";
import {DeleteOutlined, FormOutlined} from "@ant-design/icons";
import {TodoForm} from "@/entities/Todo/ui/TodoForm/TodoForm.tsx";
import {FormType, FormValues} from "@/entities/Todo/model/types";

interface ChildrenProps {
    children?: ReactNode;
}

interface CheckboxComponentProps extends ChildrenProps {
    isComplete: boolean
    isDisabled: boolean
    todoId: number
    onChangeTodo: () => void
    title: string
}



export const TodoItem: FC<CheckboxComponentProps> = ({
                                                         children,
                                                         isComplete,
                                                         isDisabled,
                                                         todoId,
                                                         onChangeTodo,
                                                         title

                                                     }) => {


    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isRemoving, setIsRemoving] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleRemove = () => {
        setIsRemoving(true);
        setTimeout(async () => {
            await handleDeleteTodo(todoId);
        }, 100);
    };


    const handleStartEditTask = () => {
        setIsEditing(true);
    }



    const handleEditTask = async (value: FormValues) => {
        await handleEditTodoText(value)
        setIsEditing(false)
    }

    const handleCancelEditing = () => {
        setIsEditing(false)
    }

    const handleDeleteTodo = async (id: number) => {
        try {
            setIsLoading(true)
            await deleteTodo(id)
            onChangeTodo();
        } catch {
            alert('хозяин нам пизда, ничего не работает')
        }finally {
            setIsLoading(false)
        }
    }

    const handleEditTodoText = async (values: FormValues) => {
        try {
            setIsLoading(true);
            if (todoId) {
                await updateTodo(todoId, { title: values.formValue });
                onChangeTodo();
                handleCancelEditing();
            }
        } catch {
            alert('не удалось обновить задачу');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCompleteTodo = async (id: number, status: boolean) => {
        await updateTodo(id, {isDone: !status})
        onChangeTodo();

    }


    const todoItemClass = [
        cls.todoItem,
        isRemoving && cls.fadeOut,
        cls.fadeIn,
        isEditing && cls.editing
    ].join(' ')

    return (
        <List.Item className={todoItemClass}>
            {!isEditing && <Checkbox
                className={cls.checkbox}
                disabled={isEditing}
                onChange={() => handleCompleteTodo(todoId, isComplete)}
                checked={isComplete}
                children={children}
            />}
            {isEditing &&
                <TodoForm
                    formType={FormType.UPDATE}
                    isLoading={isLoading}
                    handleCloseForm={handleCancelEditing}
                    onSubmit={handleEditTask}
                    initialTitle={isEditing ? title : undefined}
                />
            }
            {!isEditing && <div className={cls.buttons}>
                <Button
                    className={cls.button}
                    disabled={isDisabled}
                    onClick={handleStartEditTask}
                    icon={<FormOutlined />}
                />
                <Button
                    className={cls.buttonDel}
                    onClick={handleRemove}
                    icon={<DeleteOutlined />}
                    loading={isLoading}
                />
            </div>}
        </List.Item>
    );
};

