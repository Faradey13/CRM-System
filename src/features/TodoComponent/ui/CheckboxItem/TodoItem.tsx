import cls from './TodoItem.module.scss'
import {FC, useEffect, useRef, useState} from "react";
import {Checkbox} from "@/shared/ui/Checkbox/Checkbox.tsx";
import {Button} from "@/shared/ui/Button/Button.tsx";
import imgTrash from '@/shared/assets/icons/trash.svg'
import imgPencil from '@/shared/assets/icons/pensil-paper.svg'
import {ButtonColor} from "@/shared/ui/Button/model/types.ts";


export interface CheckboxComponentProps {
    children: string
    onClickDell: () => void
    onClickEdit: (text: string) => void
    onChecked: () => void
    isComplete: boolean


}

export const TodoItem: FC<CheckboxComponentProps> = (props) => {
    const {
        children,
        onClickDell,
        onClickEdit,
        isComplete,
        onChecked
    } = props

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editValue, setEditValue] = useState<string>('')
    const [isRemoving, setIsRemoving] = useState<boolean>(false);
    const [validationError, setValidationError] = useState<null | string>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null);


    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "0px";
            textarea.style.height = `${5 + textarea.scrollHeight}px`;
        }
    }, [children, isEditing, editValue]);

    const handleRemove = () => {
        setIsRemoving(true);
        setTimeout(() => {
            onClickDell();
        }, 100);
    };

    const handleStartEditTask = () => {
        setIsEditing(true)
        setEditValue(children)

    }

    const handleEditTask = () => {
        if (editValue.length < 2) {
            setValidationError('Длинна задачи должна быть больше 2')
            return;
        }
        if (editValue.length > 64) {
            setValidationError('Длинна задачи должна быть меньше 64')
            return;
        }
        setValidationError(null)
        onClickEdit(editValue)
        setIsEditing(false)
    }

    const handleCancelEditing = () => {
        setIsEditing(false)
        setValidationError(null)
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
                    onChecked={onChecked}
                    isComplete={isComplete}
                >{!isEditing ? children :
                    <div>
                        <textarea
                            onChange={(e) => setEditValue(e.target.value)}
                            value={editValue}
                            className={cls.textarea}
                            ref={textareaRef}

                        />
                        {validationError && <span className={cls.error}>{validationError}</span>}
                    </div>
                }</Checkbox>

                {!isEditing ? <div className={cls.buttons}>
                        <Button
                            square={true}
                            onClick={handleStartEditTask}
                        >
                            <img src={imgPencil} alt=""/>
                        </Button>
                        <Button
                            square={true}
                            onClick={handleRemove}
                            color={ButtonColor.red}
                        >
                            <img src={imgTrash} alt=""/>
                        </Button>
                    </div> :
                    <div className={`${cls.buttons} ${cls.editingButtons}`}>
                        <Button
                            square={false}
                            onClick={handleEditTask}
                        >
                            Изменить
                        </Button>
                        <Button
                            square={false}
                            onClick={handleCancelEditing}
                            color={ButtonColor.red}
                        >
                            Отменить
                        </Button>
                    </div>
                }
            </div>
    );
};

