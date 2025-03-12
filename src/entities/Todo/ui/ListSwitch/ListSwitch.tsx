import cls from "./ListSwitch.module.scss";
import {TodoFilter, TodoInfo} from "../../model/types";
import {FC} from "react";

interface ListSwitchProps {
    onFilterChange: (filter: TodoFilter) => void
    todoInfo: TodoInfo | undefined
    filteredTodo: TodoFilter
}
export const ListSwitch:FC<ListSwitchProps> = (props) => {

    const {todoInfo, onFilterChange, filteredTodo} = props

    const handleFilterTodos = (filter: TodoFilter) => {
        onFilterChange(filter)
    }

    return (
        <nav className={cls.filter}>
                <span
                    className={filteredTodo === TodoFilter.ALL ? cls.currentTodo : ''}
                    onClick={() => handleFilterTodos(TodoFilter.ALL)}
                >
                    {`Все (${todoInfo ? todoInfo.all : 0})`}
                </span>
            <span
                className={filteredTodo === TodoFilter.IN_WORK ? cls.currentTodo : ''}
                onClick={() => handleFilterTodos(TodoFilter.IN_WORK)}
            >
                    {`В работе (${todoInfo ? todoInfo.inWork : 0})`}
                </span>
            <span
                className={filteredTodo === TodoFilter.COMPLETED ? cls.currentTodo : ''}
                onClick={() => handleFilterTodos(TodoFilter.COMPLETED)}
            >
                    {`Сделано (${todoInfo ? todoInfo.completed : 0})`}
                </span>
        </nav>
    );
};

