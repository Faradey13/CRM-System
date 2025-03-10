import {
    MetaResponse,
    type Todo,
    TodoFilter,
    TodoInfo,
    TodoRequest
} from "@/features/TodoComponent/model/types/types.ts";

export const getTodos = async (type: TodoFilter): Promise<MetaResponse<Todo, TodoInfo>> => {
    try {
        const response = await fetch(`https://easydev.club/api/v1/todos?filter=${type}`, {method: 'GET'})
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
        const response = await fetch('https://easydev.club/api/v1/todos', {
            method: 'POST',
            body: JSON.stringify({title: title})
        })
        if (!response.ok) {
            throw new Error('запрос добавления todo вернулся с ошибкой');
        }
        return response
    } catch (error) {
        console.error(error, 'ошибка добавления todo')
        throw error
    }

}

export const deleteTodo = async (id: number) => {
    try {
        const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error('запрос удаления todo вернулся с ошибкой');
        }
        return response
    } catch (error) {
        console.error(error, 'ошибка удаления todo')
    }
}

export const updateTodo = async (id: number, data: TodoRequest) => {
    try {
        const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            throw new Error('запрос изменения todo вернулся с ошибкой');
        }
        return response
    } catch (error) {
        console.error(error, 'ошибка обновления todo')
    }

}