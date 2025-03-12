import {
    MetaResponse,
    type Todo,
    TodoFilter,
    TodoInfo,
    TodoRequest
} from "../model/types";
import {BASE_URL} from "@/shared/config/constants";

export const getTodos = async (type: TodoFilter): Promise<MetaResponse<Todo, TodoInfo>> => {
    try {
        const response = await fetch(`${BASE_URL}/todos?filter=${type}`, {method: 'GET'})
        if (!response.ok) {
            throw new Error('запрос получения всех todo вернулся с ошибкой');
        }
            return await response.json();
    } catch (error) {
        console.error(error, 'ошибка получения todo')
        throw error
    }
}

export const addTodo = async (title: string) => {
    try {
        const response = await fetch(`${BASE_URL}/todos`, {
            method: 'POST',
            body: JSON.stringify({title: title})
        })
        if (!response.ok) {
            throw new Error('запрос добавления todo вернулся с ошибкой');
        }
    } catch (error) {
        console.error(error, 'ошибка добавления todo')
        throw error
    }

}

export const deleteTodo = async (id: number) => {
    try {
        const response = await fetch(`${BASE_URL}/todos/${id}`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error('запрос удаления todo вернулся с ошибкой');
        }
    } catch (error) {
        console.error(error, 'ошибка удаления todo')
    }
}

export const updateTodo = async (id: number, data: TodoRequest) => {
    try {
        const response = await fetch(`${BASE_URL}/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            throw new Error('запрос изменения todo вернулся с ошибкой');
        }
    } catch (error) {
        console.error(error, 'ошибка обновления todo')
    }

}