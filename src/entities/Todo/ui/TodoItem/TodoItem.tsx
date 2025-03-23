import cls from './TodoItem.module.scss'
import {FC, ReactNode, useState} from "react";
import {Button, Checkbox, List} from "antd";
import {DeleteOutlined, FormOutlined} from "@ant-design/icons";
import EditTodo from "@/entities/Todo/ui/EditTodo/ui/EditTodo.tsx";
import {todosApi} from "@/entities/Todo/api/api.ts";

interface ChildrenProps {
    children?: ReactNode;
}

interface CheckboxComponentProps extends ChildrenProps {
    isComplete: boolean
    isDisabled: boolean
    todoId: number
    title: string
}



export const TodoItem: FC<CheckboxComponentProps> = ({
                                                         children,
                                                         isComplete,
                                                         isDisabled,
                                                         todoId,
                                                         title
                                                     }) => {


    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isRemoving, setIsRemoving] = useState<boolean>(false);
    // const [isLoading, setIsLoading] = useState<boolean>(false)

    const [delTodo, {isLoading: isDelLoading}] = todosApi.useDelTodoMutation()
    const [updateTodo] = todosApi.useUpdateTodoMutation()

    const handleRemove = () => {
        setIsRemoving(true);
        setTimeout(async () => {
            await handleDeleteTodo(todoId);
        }, 100);
    };


    const handleStartEditTask = () => {
        setIsEditing(true);
    }



    const handleCancelEditing = () => {
        setIsEditing(false)
    }

    const handleDeleteTodo = async (id: number) => {
        try {
            await delTodo(id)
        } catch {
            alert('хозяин нам пизда, ничего не работает')
        }
    }


    const handleCompleteTodo = async (id: number, status: boolean) => {
        await updateTodo([id, {isDone: !status}])

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
                <EditTodo
                    todoId={todoId}
                    initialTitle={title}
                    onStopEditing={handleCancelEditing}
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
                    loading={isDelLoading}
                />
            </div>}
        </List.Item>
    );
};

