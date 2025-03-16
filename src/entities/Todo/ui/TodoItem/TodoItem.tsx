import cls from './TodoItem.module.scss'
import {FC, ReactNode, useState} from "react";
import { Checkbox, List } from "antd";
import imgTrash from '@/shared/assets/icons/trash.svg'
import imgPencil from '@/shared/assets/icons/pensil-paper.svg'
import {deleteTodo, updateTodo} from "@/entities/Todo/api/api.ts";
import {MAX_LENGTH_TASK, MIN_LENGTH_TASK} from "@/entities/Todo/model/constants";
import {Button, Form} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useForm} from "antd/es/form/Form";

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

interface EditTodoValue {
    editTodo: string
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

    const handleRemove = () => {
        setIsRemoving(true);
        setTimeout(async () => {
            await handleDeleteTodo(todoId);
        }, 100);
    };

    const [form] = useForm()

    const handleStartEditTask = () => {
        form.setFieldsValue({ editTodo: title });
        setIsEditing(true)
    }

    const handleEditTask = async (value: EditTodoValue) => {
        console.log(value)
        await handleEditTodoText(todoId, value.editTodo)
        setIsEditing(false)
    }

    const handleCancelEditing = () => {
        setIsEditing(false)
    }

    const handleDeleteTodo = async (id: number) => {
        await deleteTodo(id)
        onChangeTodo();
        alert('сделано хозяин')
    }

    const handleEditTodoText = async (id: number, text: string) => {
        console.log(text, 'text')
        await updateTodo(id, {title: text})
        onChangeTodo();
        handleCancelEditing()
    }

    const handleCompleteTodo = async (id: number, status: boolean) => {
        await updateTodo(id, {isDone: !status})
        onChangeTodo();

    }

    const handleSubmit = () => {
        form.submit()
    }

    const todoItemClass = [
        cls.todoItem,
        isRemoving && cls.fadeOut,
        cls.fadeIn,
        isEditing && cls.editing
    ].join(' ')

    return (
        <List.Item className={todoItemClass}>
            <Checkbox
                className={cls.checkbox}
                disabled={isEditing}
                onChange={() => handleCompleteTodo(todoId, isComplete)}
                checked={isComplete}
            >{!isEditing ? children :
                <div>
                    <Form form={form} onFinish={handleEditTask}>
                        <Form.Item
                            initialValue={title}
                            name='editTodo'
                            rules={[
                                {required: true, message: 'Задача не может быть пустой'},
                                {min: MIN_LENGTH_TASK, message: `Длинна задачи должна быть больше ${MIN_LENGTH_TASK}`},
                                {max: MAX_LENGTH_TASK, message: `Длинна задачи должна быть меньше ${MAX_LENGTH_TASK}`}
                            ]}
                        >
                            <TextArea
                                className={cls.textarea}
                                placeholder="Edit your todo"
                            />
                        </Form.Item>
                    </Form>
                </div>
            }</Checkbox>
            {!isEditing && <div className={cls.buttons}>
                <Button
                    className={cls.button}
                    disabled={isDisabled}
                    onClick={handleStartEditTask}
                    icon={<img src={imgPencil} alt="Edit"/>}
                />

                <Button
                    className={cls.buttonDel}
                    onClick={handleRemove}
                >
                    <img src={imgTrash} alt=""/>
                </Button>
            </div>}
            {isEditing &&
                <div className={`${cls.buttons} ${cls.editingButtons}`}>
                    <Button
                        className={cls.buttonEditi}
                        onClick={handleSubmit}
                    >
                        Изменить
                    </Button>
                    <Button
                        className={cls.buttonEditiErr}
                        onClick={handleCancelEditing}
                    >
                        Отменить
                    </Button>
                </div>
            }
        </List.Item>
    );
};

