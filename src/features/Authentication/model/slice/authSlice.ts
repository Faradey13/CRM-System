import {Profile} from "@/entities/User/model/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";



export interface AuthState {
    isAuth: boolean;
    User: Profile | null;
    isAdmin: boolean;
    isInitialized: boolean;

}

const initialAuthState: AuthState = {
    User: null,
    isAuth: false,
    isAdmin: false,
    isInitialized: false,

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
        },
        setIsAdmin(state, action: PayloadAction<boolean>) {
            state.isAdmin = action.payload;
        },
        setIsInitialized(state, action: PayloadAction<boolean>) {
            state.isInitialized = action.payload;
        }

    }

})

export const {setUser, setAuthStatus, setIsAdmin, setIsInitialized } = authSlice.actions;
export const authReducer =  authSlice.reducer;