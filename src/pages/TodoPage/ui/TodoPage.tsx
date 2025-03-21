import {useState} from "react";
import {

    TodoFilter,
} from "@/entities/Todo/model/types";
import cls from "./TodoPage.module.scss";
import {ListSwitch} from "@/entities/Todo/ui/ListSwitch/ListSwitch";
import {TodoList} from "@/entities/Todo/ui/TodoList/TodoList";
import AddTodo from "@/entities/Todo/ui/AddTodo/ui/AddTodo.tsx";
import {todosApi} from "@/entities/Todo/api/api.ts";


export const TodoPage = () => {



    const [filteredTodo, setFilteredTodo] = useState<TodoFilter>(TodoFilter.ALL)
    const {data} = todosApi.useGetTodosQuery(filteredTodo)
    const currentTodo = data?.data.filter((todo) => {
        if (filteredTodo === TodoFilter.ALL) {
            return true
        }
        if (filteredTodo === TodoFilter.COMPLETED) {
            return todo.isDone
        }
        if (filteredTodo === TodoFilter.IN_WORK) {
            return !todo.isDone
        }
    })


    return (
        <main className={cls.wrapper}>
            <header className={cls.todoHeader}>
                <AddTodo />
            </header>
            <ListSwitch
                todoInfo={data?.info}
                onFilterChange={setFilteredTodo}
                filteredTodo={filteredTodo}
            />
            <TodoList
                todos={currentTodo}
            />
        </main>
    );
};
