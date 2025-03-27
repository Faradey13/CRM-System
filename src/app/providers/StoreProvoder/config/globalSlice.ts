import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface GlobalState {
    isTokenRefreshing: boolean;
}

const initialGlobalState = {
    isTokenRefreshing: false,
}

export const globalSlice = createSlice({
    name: 'global',
    initialState: initialGlobalState,
    reducers: {
        selIsTokenRefreshing(state, action: PayloadAction<boolean>) {
            state.isTokenRefreshing = action.payload;
        }
    }
})

export const {selIsTokenRefreshing} = globalSlice.actions
export const globalReducer =  globalSlice.reducer;
