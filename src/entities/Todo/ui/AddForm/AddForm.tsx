import {ChangeEvent, FC, FormEvent, FormHTMLAttributes, useState} from "react";
import {addTodo} from "@/entities/Todo/api/api.ts";
import cls from './AddForm.module.scss'
import {ErrorComponent} from "../ErrorComponent/ErrorComponent.tsx";
import {MAX_LENGTH_TASK, MIN_LENGTH_TASK} from "../../model/constants";
import {Button} from "@/shared/ui/Button/Button.tsx";


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
        if (newTodoValue.length < MIN_LENGTH_TASK) {
            setValidationError(`Длинна задачи должна быть больше ${MIN_LENGTH_TASK}`)
            return;
        }
        if (newTodoValue.length > MAX_LENGTH_TASK) {
            setValidationError(`Длинна задачи должна быть меньше ${MAX_LENGTH_TASK}`)
            return;
        }
        setValidationError(null)
        await addTodo(newTodoValue)
        onAdded()
        setNewTodoValue('')

    }

    return (
        <form className={cls.formContainer} onSubmit={handleSubmit}>
            <section className={cls.form}>
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