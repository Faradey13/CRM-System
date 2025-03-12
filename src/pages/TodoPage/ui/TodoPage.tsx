import {useEffect, useState} from "react";
import {type Todo, TodoFilter, TodoInfo} from "@/entities/Todo/model/types";
import cls from "./TodoPage.module.scss";
import AddForm from "@/entities/Todo/ui/AddForm/AddForm.tsx";
import {ListSwitch} from "@/entities/Todo/ui/ListSwitch/ListSwitch.tsx";
import TodoList from "@/entities/Todo/ui/TodoList/TodoList.tsx";
import {getTodos} from "@/entities/Todo/api/api.ts";


export const TodoPage = () => {
    const [isChangingTodos, setIsChangingTodos] = useState<boolean>(false)
    const [filteredTodo, setFilteredTodo] = useState<TodoFilter>(TodoFilter.ALL)
    const [todoInfo, setTodoInfo] = useState<TodoInfo>()
    const [todos, setTodos] = useState<Todo[]>()


    const handleUpdateAfterAddedTodo = () => {
        setIsChangingTodos(!isChangingTodos)
    }

    useEffect(() => {
        try {
            fetchTodos(setTodos, filteredTodo)
        } catch {
            alert('Ошибка загрузки всех задач')
        }

    }, [filteredTodo, isChangingTodos])


    const fetchTodos = async (setData: (data: Todo[]) => void, type: TodoFilter) => {
        const data = await getTodos(type)
        if (data) {
            setData(data.data)
            setTodoInfo(data.info)
        }
    }

    return (
        <main className={cls.wrapper}>
            <header className={cls.todoHeader}>
                <AddForm onAdded={handleUpdateAfterAddedTodo}/>
            </header>
            <ListSwitch
                todoInfo={todoInfo}
                onFilterChange={setFilteredTodo}
                filteredTodo={filteredTodo}
            />
            <TodoList
                onChangeTodo={handleUpdateAfterAddedTodo}
                todos={todos}
            />
        </main>
    );
};
