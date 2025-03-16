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
        onFilterChange(filter)
    }

    return (

            <Segmented
                className={cls.filter}
                block
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

