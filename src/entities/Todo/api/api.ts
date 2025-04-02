import {
    type Todo,
    TodoInfo,
    TodoRequest
} from "../model/types";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "@/shared/config/constants.ts";
import {MetaResponse} from "@/shared/types";



export const todosApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ['todo'],
    endpoints: (build) => ({
        getTodos: build.query<MetaResponse<Todo, TodoInfo>, string>({
            query: (filter) => ({
                url: '/todos',
                params: {filter},
                method: 'GET',
            }),
            keepUnusedDataFor: 0,
            providesTags: () => ['todo']
        }),
        addTodo: build.mutation<Todo,string>({
            query: (title) => ({
                url: '/todos',
                method: 'POST',
                body: {title: title}
            }),
            invalidatesTags: ['todo'],
        }),
        deleteTodo: build.mutation<Todo,number>({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE',

            }),
            invalidatesTags: ['todo'],
        }),
        updateTodo: build.mutation<Todo, [number, TodoRequest]>({
            query: ([id, TodoRequest]) => ({
                url: `/todos/${id}`,
                method: 'PUT',
                body: TodoRequest

            }),
            invalidatesTags: ['todo'],
        }),
    })
})

