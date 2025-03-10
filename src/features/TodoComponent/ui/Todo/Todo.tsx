import {ChangeEvent, useEffect, useState} from "react";
import {Button} from "@/shared/ui/Button/Button.tsx";
import cls from './Todo.module.scss'
import {type Todo, TodoFilter, TodoInfo} from '../../model/types/types.ts'
import {addTodo, deleteTodo, getTodos, updateTodo} from "@/features/TodoComponent/model/api/TodoServices.ts";
import {TodoItem} from "@/features/TodoComponent/ui/TodoItem/TodoItem.tsx";


const Todo = () => {
        const [newTodoValue, setNewTodoValue] = useState('')
        const [todosAll, setTodosAll] = useState<Todo[]>([])
        const [todosInWork, setTodosInWork] = useState<Todo[]>([])
        const [todosCompleted, setTodosCompleted] = useState<Todo[]>([])
        const [todoInfo, setTodoInfo] = useState<TodoInfo>()
        const [filteredTodo, setFilteredTodo] = useState<TodoFilter>('all')
        const [isChangingTodos, setIsChangingTodos] = useState<boolean>(false)
        const [validationError, setValidationError] = useState<string | null>(null)

        useEffect(() => {
            if (filteredTodo === 'all') {
                fetchTodos(setTodosAll,"all")
            }
            if (filteredTodo === 'inWork') {
                fetchTodos(setTodosInWork,'inWork')
            }
            if (filteredTodo === 'completed') {
                fetchTodos(setTodosCompleted,"completed")
            }
        }, [filteredTodo, isChangingTodos])

    const fetchTodos = async (setData: (data:Todo[])=>void,type: TodoFilter) => {
        const data = await getTodos(type)
        if(data){
            setData(data.data)
            setTodoInfo(data.info)
        }
    }

        const handleFilter = (filter: TodoFilter) => {
            setFilteredTodo(filter)
        }
        const getCurrentTodo = () => {
            if (filteredTodo == 'all') {
                return todosAll;
            }
            if (filteredTodo === 'completed') {
                return todosCompleted;
            }
            return todosInWork
        }

        const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
            setNewTodoValue(e.target.value)

        }

        const handleSubmit = async () => {
            if (newTodoValue.length < 2) {
                setValidationError('Длинна задачи должна быть больше 2')
                return;
            }
            if (newTodoValue.length > 64) {
                setValidationError('Длинна задачи должна быть меньше 64')
                return;
            }
            setValidationError(null)
            await addNewTodo(newTodoValue)
            setNewTodoValue('')

        }


        const handleCompleteTodo = async (id: number, status: boolean) => {
            const response = status? await updateTodo(id, {isDone: false}) : await updateTodo(id, {isDone: true})
            if (response) {
                setIsChangingTodos(!isChangingTodos);
            }
        }

        const addNewTodo = async (title: string) => {
                const response = await addTodo(title)
            if(response){
                setIsChangingTodos(!isChangingTodos)
            }

        }

        const handleDeleteTodo = async (id: number) => {
                const response = await deleteTodo(id)
            if (response) {
                setIsChangingTodos(!isChangingTodos)
            }
        }

        const handleEditTodoText = async (id: number, text: string) => {
            const response = await updateTodo(id, {title: text})
            if (response) {
                setIsChangingTodos(!isChangingTodos)
            }
        }


        return (
            <div className={cls.todo}>
                <header className={cls.todoHeader}>
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
                        onClick={handleSubmit}
                    >
                        Add
                    </Button>
                </header>
                {validationError ? <span className={cls.error}>{validationError}</span> : null}
                <section className={cls.todoSection}>
                    <nav className={cls.filter}>
                <span
                    className={filteredTodo === 'all' ? cls.currentTodo : ''}
                    onClick={() => handleFilter('all')}
                >
                    {`Все (${todoInfo ? todoInfo.all : 0})`}
                </span>
                        <span
                            className={filteredTodo === 'inWork' ? cls.currentTodo : ''}
                            onClick={() => handleFilter('inWork')}
                        >
                    {`В работе (${todoInfo ? todoInfo.inWork : 0})`}
                </span>
                        <span
                            className={filteredTodo === 'completed' ? cls.currentTodo : ''}
                            onClick={() => handleFilter('completed')}
                        >
                    {`Сделано (${todoInfo ? todoInfo.completed : 0})`}
                </span>
                    </nav>
                    {getCurrentTodo().map((todo) =>
                        <TodoItem
                            isDisabled={todo.isDone}
                            key={`${todo.id}-${todo.isDone}`}
                            isComplete={todo.isDone}
                            onChecked={() => handleCompleteTodo(todo.id, todo.isDone)}
                            onClickDell={() => handleDeleteTodo(todo.id)}
                            onClickEdit={(text) => handleEditTodoText(todo.id, text)}
                            children={todo.title}
                        />
                    )}
                </section>

            </div>
        );
    }
;

export default Todo;