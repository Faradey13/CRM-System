import cls from './TodoItem.module.scss'
import {FC, FormEvent, ReactNode, useEffect, useId, useRef, useState} from "react";
import {Checkbox} from "@/shared/ui/Checkbox/Checkbox.tsx";
import {Button} from "@/shared/ui/Button/Button.tsx";
import imgTrash from '@/shared/assets/icons/trash.svg'
import imgPencil from '@/shared/assets/icons/pensil-paper.svg'
import {ButtonColor} from "@/shared/ui/Button/model/types.ts";
import {ErrorComponent} from "../ErrorComponent/ErrorComponent.tsx";
import {deleteTodo, updateTodo} from "@/entities/Todo/api/api.ts";
import {MAX_LENGTH_TASK, MIN_LENGTH_TASK} from "@/entities/Todo/model/constants";

interface ChildrenProps {
    children?: ReactNode;
}

interface CheckboxComponentProps extends  ChildrenProps{
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
    const [editValue, setEditValue] = useState<string>('')
    const [isRemoving, setIsRemoving] = useState<boolean>(false);
    const [validationError, setValidationError] = useState<null | string>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const formId = useId()

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "0px";
            textarea.style.height = `${5 + textarea.scrollHeight}px`;
        }
    }, [children, isEditing, editValue]);

    const handleRemove = () => {
        setIsRemoving(true);
        setTimeout(async() => {
            await handleDeleteTodo(todoId);
        }, 100);
    };

    const handleStartEditTask = () => {
        setIsEditing(true)
        setEditValue(title)

    }

    const handleEditTask = async (event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault()
        if (editValue.length < MIN_LENGTH_TASK) {
            setValidationError(`Длинна задачи должна быть больше ${MIN_LENGTH_TASK}`)
            return;
        }
        if (editValue.length > MAX_LENGTH_TASK) {
            setValidationError(`Длинна задачи должна быть меньше ${MAX_LENGTH_TASK}`)
            return;
        }
        setValidationError(null)
        await handleEditTodoText(todoId, editValue)
        setIsEditing(false)
    }

    const handleCancelEditing = () => {
        setIsEditing(false)
        setValidationError(null)
    }

    const handleDeleteTodo = async (id: number) => {
        await deleteTodo(id)
        onChangeTodo();
        alert('сделано хозяин')
    }

    const handleEditTodoText = async (id: number, text: string) => {
        await updateTodo(id, {title: text})
        onChangeTodo();
    }

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
            <div className={todoItemClass}>
                <Checkbox
                    isEditing={isEditing}
                    onChecked={() => handleCompleteTodo(todoId, isComplete)}
                    isComplete={isComplete}
                >{!isEditing ? children :
                    <div>
                        <form id={formId} onSubmit={handleEditTask}>
                           <textarea
                               onChange={(e) => setEditValue(e.target.value)}
                               value={editValue}
                               className={cls.textarea}
                               ref={textareaRef}
                           />
                        </form>
                        <ErrorComponent textError={validationError}/>
                    </div>
                }</Checkbox>
                {!isEditing && <div className={cls.buttons}>
                        <Button
                            isDisabled={isDisabled}
                            square={true}
                            onClick={handleStartEditTask}
                        >
                            <img src={imgPencil} alt=""/>
                        </Button>
                        <Button
                            square={true}
                            onClick={handleRemove}
                            color={ButtonColor.error}
                        >
                            <img src={imgTrash} alt=""/>
                        </Button>
                    </div> }
                {isEditing &&
                    <div className={`${cls.buttons} ${cls.editingButtons}`}>
                        <Button
                            square={false}
                            form={formId}
                        >
                            Изменить
                        </Button>
                        <Button
                            square={false}
                            onClick={handleCancelEditing}
                            color={ButtonColor.error}
                        >
                            Отменить
                        </Button>
                    </div>
                }
            </div>
    );
};

