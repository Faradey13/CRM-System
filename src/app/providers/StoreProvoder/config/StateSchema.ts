import {AuthState} from "@/features/Authentication/model/slice/authSlice.ts";
import {GlobalState} from "@/app/providers/StoreProvoder/config/globalSlice.ts";


export interface StateSchema {
    auth: AuthState,
    global: GlobalState,
}