import {FC} from "react";
import cls from './TodoList.module.scss'
import {type Todo} from '../../model/types'

import {TodoItem} from "../TodoItem/TodoItem.tsx";

interface TodoListProps {
    onChangeTodo: () => void;
    todos: Todo[] | undefined
}

export const TodoList: FC<TodoListProps> = ({
                                         onChangeTodo,
                                         todos
                                     }) => {

        return (
            <section className={cls.todoSection}>
                {todos?.map((todo) =>
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
