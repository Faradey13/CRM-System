import {setupListeners} from "@reduxjs/toolkit/query";
import {configureStore} from "@reduxjs/toolkit";
import {authApi} from "@/features/Authentication/api/authApi.ts";
import {todosApi} from "@/entities/Todo/api/api.ts";
import {authReducer} from "@/features/Authentication/model/slice/authSlice.ts";
import {globalReducer} from "@/app/providers/StoreProvoder/config/globalSlice.ts";
import {userApi} from "@/entities/User/api/userApi.ts";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        global: globalReducer,
        [userApi.reducerPath]:userApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [todosApi.reducerPath]: todosApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, todosApi.middleware, userApi.middleware ),
})
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;