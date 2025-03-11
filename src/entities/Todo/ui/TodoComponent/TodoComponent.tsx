import cls from './Todo.module.scss'
import AddForm from "../AddForm/AddForm.tsx";
import {useState} from "react";
import TodoList from "../TodoList/TodoList.tsx";
import {TodoFilter, TodoInfo} from "../../model/types";
import {ListSwitch} from "../ListSwitch/ListSwitch.tsx";

export const TodoComponent = () => {
    const [isChangingTodos, setIsChangingTodos] = useState<boolean>(false)
    const [filteredTodo, setFilteredTodo] = useState<TodoFilter>(TodoFilter.ALL)
    const [todoInfo, setTodoInfo] = useState<TodoInfo>()
    const handleUpdateAfterAddedTodo = () => {
        setIsChangingTodos(!isChangingTodos)
    }

    return (
        <main className={cls.todo}>
            <header className={cls.todoHeader}>
                <AddForm onAdded={handleUpdateAfterAddedTodo}/>
            </header>
            <ListSwitch
                todoInfo={todoInfo}
                onFilterChange={setFilteredTodo}
            />
            <TodoList
                onChangeTodo={handleUpdateAfterAddedTodo}
                isChangingTodos={isChangingTodos}
                filteredTodo={filteredTodo}
                onChangeTodoInfo={setTodoInfo}
            />
        </main>
    );
};

