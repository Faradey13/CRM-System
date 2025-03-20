import {useCallback, useEffect, useState} from "react";
import {

    type Todo,
    TodoFilter,
    TodoInfo
} from "@/entities/Todo/model/types";
import cls from "./TodoPage.module.scss";
import {getTodos} from "@/entities/Todo/api/api.ts";
import {ListSwitch} from "@/entities/Todo/ui/ListSwitch/ListSwitch";
import {TodoList} from "@/entities/Todo/ui/TodoList/TodoList";
import AddTodo from "@/entities/Todo/ui/AddTodo/ui/AddTodo.tsx";


export const TodoPage = () => {

    const [filteredTodo, setFilteredTodo] = useState<TodoFilter>(TodoFilter.ALL)
    const [todoInfo, setTodoInfo] = useState<TodoInfo>()
    const [todos, setTodos] = useState<Todo[]>()


    const fetchTodos = useCallback(async () => {
        const data = await getTodos(filteredTodo)
        if (data) {
            setTodos(data.data)
            setTodoInfo(data.info)
        }
    },[filteredTodo])

    useEffect(() => {
        try {
            fetchTodos()
        } catch {
            alert('Ошибка загрузки всех задач')
        }

    }, [filteredTodo, fetchTodos])

    useEffect(() => {
        const fetchingInterval = setInterval(async () => {
            await fetchTodos()
        }, 5000)

        return () => clearInterval(fetchingInterval)
    }, [filteredTodo]);




    return (
        <main className={cls.wrapper}>
            <header className={cls.todoHeader}>
                <AddTodo onAdded={fetchTodos}/>
            </header>
            <ListSwitch
                todoInfo={todoInfo}
                onFilterChange={setFilteredTodo}
                filteredTodo={filteredTodo}
            />
            <TodoList
                onChangeTodo={fetchTodos}
                todos={todos}
            />
        </main>
    );
};
