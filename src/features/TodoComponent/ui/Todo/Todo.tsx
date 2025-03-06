import {ChangeEvent, useEffect, useState} from "react";
import {Button} from "@/shared/ui/Button/Button.tsx";
import {TodoItem} from "../CheckboxItem/TodoItem.tsx";
import cls from './Todo.module.scss'
import {MetaResponse, type Todo, TodoInfo, TodoRequest} from '../../model/types'


const Todo = () => {
        const [newTodoValue, setNewTodoValue] = useState('')
        const [todosAll, setTodosAll] = useState<Todo[]>([])
        const [todosInWork, setTodosInWork] = useState<Todo[]>([])
        const [todosCompleted, setTodosCompleted] = useState<Todo[]>([])
        const [todoInfo, setTodoInfo] = useState<TodoInfo>()
        const [filteredTodo, setFilteredTodo] = useState<'all' | 'completed' | 'inWork'>('all')
        const [isChangingTodos, setIsChangingTodos] = useState<boolean>(false)
        const [validationError, setValidationError] = useState<string | null>(null)

        useEffect(() => {
            if (filteredTodo === 'all') {
                fetch('https://easydev.club/api/v1/todos?filter=all', {method: 'GET'})
                    .then(res => res.json())
                    .then((data: MetaResponse<Todo, TodoInfo>) => {
                        setTodosAll(data.data)
                        setTodoInfo(data.info)
                    })
                    .catch(error => console.error(error));
            }
            if (filteredTodo === 'inWork') {
                fetch('https://easydev.club/api/v1/todos?filter=inWork', {method: 'GET'})
                    .then(res => res.json())
                    .then((data) => {
                        setTodosInWork(data.data)
                        setTodoInfo(data.info)
                    })
                    .catch(error => console.error(error));
            }
            if (filteredTodo === 'completed') {
                fetch('https://easydev.club/api/v1/todos?filter=completed', {method: 'GET'})
                    .then(res => res.json())
                    .then((data) => {
                        setTodosCompleted(data.data)
                        setTodoInfo(data.info)
                    })
                    .catch(error => console.error(error));
            }
        }, [filteredTodo, isChangingTodos])

        const handleFilter = (filter: 'all' | 'completed' | 'inWork') => {
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

        const updateTodo = async (id: number, data: TodoRequest) => {
            try {
                const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                })
                if (!response.ok) {
                    throw new Error('запрос изменения todo вернулся с ошибкой');
                }
                return response.json()
            } catch (error) {
                console.error(error, 'ошибка обновления todo')
            }

        }

        const handleCompleteTodo = async (id: number) => {
            const response = await updateTodo(id, {isDone: true})
            if (response) {
                setIsChangingTodos(!isChangingTodos)
            }
        }

        const addNewTodo = async (title: string) => {
            try {
                const response = await fetch('https://easydev.club/api/v1/todos', {
                    method: 'POST',
                    body: JSON.stringify({title: title})
                })
                if (!response.ok) {
                    throw new Error('запрос добавления todo вернулся с ошибкой');
                }
                setIsChangingTodos(!isChangingTodos)
            } catch (error) {
                console.error(error, 'ошибка добавления todo')
            }

        }

        const handleDeleteTodo = async (id: number) => {
            try {
                const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
                    method: 'DELETE'
                })
                if (!response.ok) {
                    throw new Error('запрос удаления todo вернулся с ошибкой');
                }
                setIsChangingTodos(!isChangingTodos)
            } catch (error) {
                console.error(error, 'ошибка удаления todo')
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
                            key={todo.id}
                            isComplete={todo.isDone}
                            onChecked={() => handleCompleteTodo(todo.id)}
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