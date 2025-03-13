import cls from "./ListSwitch.module.scss";
import {TodoFilter, TodoInfo} from "../../model/types";
import {FC} from "react";
import {Segmented} from "antd";

interface ListSwitchProps {
    onFilterChange: (filter: TodoFilter) => void
    todoInfo: TodoInfo | undefined
    filteredTodo: TodoFilter
}

export const ListSwitch: FC<ListSwitchProps> = ({todoInfo, onFilterChange, filteredTodo}) => {


    const handleFilterTodos = (filter: TodoFilter) => {
        console.log(filter)
        onFilterChange(filter)
    }

    return (
        <Segmented
            className={cls.filter}
            options={[
                { label: `Все (${todoInfo?.all})`, value: TodoFilter.ALL },
                { label: `В работе (${todoInfo?.inWork})`, value: TodoFilter.IN_WORK },
                { label: `Сделано (${todoInfo?.completed})`, value: TodoFilter.COMPLETED }
            ]}

            value={filteredTodo}
            onChange={(value) => handleFilterTodos(value as TodoFilter)}
        />
    );
};

// <span
//     className={filteredTodo === TodoFilter.ALL ? cls.currentTodo : ''}
//     onClick={() => handleFilterTodos(TodoFilter.ALL)}
// >
//                     {`Все (${todoInfo ? todoInfo.all : 0})`}
//                 </span>
// <span
//     className={filteredTodo === TodoFilter.IN_WORK ? cls.currentTodo : ''}
//     onClick={() => handleFilterTodos(TodoFilter.IN_WORK)}
// >
//                     {`В работе (${todoInfo ? todoInfo.inWork : 0})`}
//                 </span>
// <span
//     className={filteredTodo === TodoFilter.COMPLETED ? cls.currentTodo : ''}
//     onClick={() => handleFilterTodos(TodoFilter.COMPLETED)}
// >
//                     {`Сделано (${todoInfo ? todoInfo.completed : 0})`}
//                 </span>