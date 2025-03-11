
import {Button} from "@/shared/ui/Button/Button.tsx";
import {ChangeEvent, FC, FormEvent, FormHTMLAttributes, useState} from "react";
import {addTodo} from "../../model/api/api.ts";
import {TODO_CONFIG} from "@/shared/config/constants.ts";
import cls from './AddForm.module.scss'
import {ErrorComponent} from "../ErrorComponent/ErrorComponent.tsx";


interface addForm extends FormHTMLAttributes<HTMLFormElement> {
    onAdded: () => void;


}

const AddForm:FC<addForm> = (props) => {

    const {onAdded} = props

    const [newTodoValue, setNewTodoValue] = useState<string>('')
    const [validationError, setValidationError] = useState<string | null>(null)

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTodoValue(e.target.value)

    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        if (newTodoValue.length < TODO_CONFIG.MIN_LENGTH_TASK) {
            setValidationError(`Длинна задачи должна быть больше ${TODO_CONFIG.MIN_LENGTH_TASK}`)
            return;
        }
        if (newTodoValue.length > TODO_CONFIG.MAX_LENGTH_TASK) {
            setValidationError(`Длинна задачи должна быть меньше ${TODO_CONFIG.MAX_LENGTH_TASK}`)
            return;
        }
        setValidationError(null)
        await addNewTodo(newTodoValue)
        setNewTodoValue('')

    }

    const addNewTodo = async (title: string) => {
       await addTodo(title)
        onAdded()
    }


    return (
        <form className={cls.formContainer} onSubmit={handleSubmit}>
            <section className={cls.addForm}>
                <input
                    onBlur={() => setValidationError(null)}
                    className={cls.input}
                    type="text"
                    value={newTodoValue}
                    onChange={handleChangeInput}
                    placeholder='Task To Be Done...'
                />
                <Button
                    square={false}
                >
                    Add
                </Button>
            </section>

            <ErrorComponent textError={validationError}/>
        </form>
    );
};

export default AddForm;