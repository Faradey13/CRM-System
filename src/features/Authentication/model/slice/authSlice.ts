import {Profile} from "@/entities/User/model/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface AuthState {
    isAuth: boolean;
    User: Profile | null;
}

const initialAuthState: AuthState = {
    User: null,
    isAuth: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setUser(state, action: PayloadAction<Profile | null>) {
            state.User = action.payload;
        },
        setAuthStatus(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        }
    }

})

export const {setUser, setAuthStatus } = authSlice.actions;
export const authReducer =  authSlice.reducer;