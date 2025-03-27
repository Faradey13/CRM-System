import {useDispatch, useSelector} from "react-redux";
import {StateSchema} from "@/app/providers/StoreProvoder/config/StateSchema.ts";
import {Button, message} from "antd";
import {userApi} from "@/entities/User/api/userApi.ts";
import {AppDispatch} from "@/app/providers/StoreProvoder/config/store.ts";
import {logoutOnClient} from "@/features/Authentication/service/authService.ts";


export const UserPage = () => {
    const [logout, {isLoading}] = userApi.useLogoutMutation()
    const dispatch = useDispatch<AppDispatch>()
    const handleLogout = async () => {
        try {
            await logout(undefined)
            logoutOnClient(dispatch)
        } catch {
            message.error('ошибка выхода из системы, попробуйте позже')
        }


    }
    const user = useSelector((state: StateSchema) => state.auth.User);
    return (
        <div>
            <h3>Имя пользователя: {user?.username}</h3>
            <h3>Email: {user?.email}</h3>
            <h3>Телефон: {user? user.phoneNumber : 'Телефон не указан'}</h3>
            <Button
                onClick={handleLogout}
                loading={isLoading}
            >Logout</Button>
        </div>
    );
};
