import {
    MetaResponse,
    type Todo,
    TodoFilter,
    TodoInfo,
    TodoRequest
} from "../model/types";
import {api} from "@/shared/config/axios.ts";

export const getTodos = async (type: TodoFilter): Promise<MetaResponse<Todo, TodoInfo>> => {
    try {
        const response = await api.get<MetaResponse<Todo, TodoInfo>>(`/todos?filter=`, {
            params: {type}
        })
        return  response.data;
    } catch (error) {
        console.error(error, 'ошибка получения todo')
        throw new Error('запрос получения всех todo вернулся с ошибкой');
    }
}

export const addTodo = async (title: string) => {
    try {
      await api.post('/todos', {title: title})
    } catch (error) {
        console.error(error, 'ошибка добавления todo')
        throw new Error('запрос добавления todo вернулся с ошибкой');
    }
}

export const deleteTodo = async (id: number) => {
    try {
        await api.delete(`/todos/${id}`)
    } catch (error) {
        console.error(error, 'ошибка удаления todo')
        throw new Error('запрос удаления todo вернулся с ошибкой');
    }
}

export const updateTodo = async (id: number, data: TodoRequest) => {
    console.log(data, 'data')
    try {
        await api.put(`/todos/${id}`, data)
    } catch (error) {
        console.error(error, 'ошибка обновления todo')
        throw new Error('запрос обновления todo вернулся с ошибкой');
    }

}