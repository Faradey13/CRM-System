
import cls from './TodoItem.module.scss'
import {FC, useEffect, useRef, useState} from "react";
import {Checkbox} from "../../../../shared/ui/Checkbox/Checkbox.tsx";
import {Button, ButtonColor} from "../../../../shared/ui/Button/Button.tsx";
import imgTrash from '../../../../shared/assets/icons/trash.svg'
import imgPencil from '../../../../shared/assets/icons/pensil-paper.svg'


export interface CheckboxComponentProps {
    children: string
    onClickDell: () => void
    onClickEdit: () => void
}
export const TodoItem: FC<CheckboxComponentProps> = (props) => {
    const {children,onClickDell, onClickEdit} = props
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editValue, setEditValue] = useState<string>('')
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if(textarea) {
            console.log(textarea.scrollHeight)
            textarea.style.height = "0px";
            textarea.style.height = `${5+textarea.scrollHeight}px`;
        }
    }, [children, isEditing]);



    const handleEditTask = () => {
        setIsEditing(true)
        setEditValue(children)
    }
    const handleCancelEditing = () => {
        setIsEditing(false)
    }
    return (
        <div className={cls.todoItem}>
            <Checkbox>{!isEditing ? children :
                <textarea
                onChange={(e) => setEditValue(e.target.value)}
                value={editValue}
                className={cls.textarea}
                ref={textareaRef}

            />}</Checkbox>

            {!isEditing ? <div className={cls.buttons}>
                    <Button
                        square={true}
                        onClick={handleEditTask}
                    >
                        <img src={imgPencil} alt=""/>
                    </Button>
                    <Button
                        square={true}
                        onClick={onClickDell}
                        color={ButtonColor.red}
                    >
                        <img src={imgTrash} alt=""/>
                    </Button>
                </div> :
                <div className={`${cls.buttons} ${cls.editing}`}>
                    <Button
                        square={false}
                        onClick={onClickEdit}
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

