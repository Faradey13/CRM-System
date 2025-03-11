import {FC, useEffect, useState} from "react";
import cls from './TodoList.module.scss'
import {type Todo, TodoFilter, TodoInfo} from '../../model/types'
import {getTodos} from "../../model/api/api.ts";
import {TodoItem} from "../TodoItem/TodoItem.tsx";

interface TodoListProps {
    isChangingTodos: boolean;
    filteredTodo: TodoFilter;
    onChangeTodo: () => void
    onChangeTodoInfo: (todoInfo: TodoInfo) => void
}

const TodoList: FC<TodoListProps> = (props) => {

        const {
            isChangingTodos,
            filteredTodo,
            onChangeTodo,
            onChangeTodoInfo
        } = props

        const [todos, setTodos] = useState<Todo[]>([])
        const [todoInfo, setTodoInfo] = useState<TodoInfo>()


        useEffect(() => {
            if (filteredTodo === 'all') {
                fetchTodos(setTodos, TodoFilter.ALL)
            }
            if (filteredTodo === 'inWork') {
                fetchTodos(setTodos, TodoFilter.IN_WORK)
            }
            if (filteredTodo === 'completed') {
                fetchTodos(setTodos, TodoFilter.COMPLETED)
            }
            if(todoInfo)
            onChangeTodoInfo(todoInfo)
        }, [filteredTodo, isChangingTodos])

        useEffect(() => {

        }, []);

        const fetchTodos = async (setData: (data: Todo[]) => void, type: TodoFilter) => {
            const data = await getTodos(type)
            if (data) {
                setData(data.data)
                setTodoInfo(data.info)
            }
        }


        return (
                <section className={cls.todoSection}>
                    {todos.map((todo) =>
                        <TodoItem
                            isDisabled={todo.isDone}
                            key={`${todo.id}-${todo.isDone}`}
                            isComplete={todo.isDone}
                            todoId={todo.id}
                            onChangeTodo={onChangeTodo}
                            title={todo.title}
                        >
                            <span>{todo.title}</span>
                        </TodoItem>
                    )}
                </section>
        );
    }
;

export default TodoList;