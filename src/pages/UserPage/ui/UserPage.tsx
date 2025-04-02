import {useDispatch, useSelector} from "react-redux";
import {Button, Flex, message} from "antd";
import {userApi} from "@/entities/User/api/userApi.ts";
import {AppDispatch} from "@/app/providers/StoreProvoder/config/store.ts";
import {logoutOnClient} from "@/features/Authentication/service/authService.ts";
import {useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {adminApi} from "@/features/Administration/api/adminApi.ts";
import Loader from "@/shared/ui/Loader/Loader.tsx";
import {EditUserForm} from "@/features/Administration";
import {RoutePath} from "@/app/providers/routes/model/constants";
import {StateSchema} from "@/app/providers/StoreProvoder/config/StateSchema.ts";




export const UserPage = () => {
    const [logout, {isLoading: logoutLoading}] = userApi.useLogoutMutation()
    const dispatch = useDispatch<AppDispatch>()
    const handleLogout = async () => {
        try {
            await logout(undefined)
            logoutOnClient(dispatch)
        } catch {
            message.error('ошибка выхода из системы, попробуйте позже')
        }
    }
    const locate = useLocation()
    const isFromAdminPage = locate.state?.isFromAdminPage ?? false
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate()
    const user = useSelector((state:StateSchema) => state.auth.User)
    const {data, isLoading, isSuccess, refetch} = adminApi.useGetUserByIdQuery(Number(id), {skip: !isFromAdminPage})

    const userData = isFromAdminPage ? data : user;
    console.log(userData)
    const closeEditing = () => {
        setIsEditing(false)
        refetch()
    }
    const startEditing =  () => {
        setIsEditing(true)
    }

    const handleGoBack = () => {
        navigate(RoutePath.ADMIN_USERS)
    }

    if(isFromAdminPage && isLoading) return <Loader/>
    if((isFromAdminPage && isSuccess )|| !isFromAdminPage)
        return (
            <Flex justify={'center'} align={'center'} gap={30} vertical>
                <h1>{`Пользователь ${userData?.id}`}</h1>
                {
                    isEditing && isFromAdminPage && data ?
                        <EditUserForm
                            id={Number(id)}
                            close={closeEditing}
                            initialValues={{
                                phoneNumber: data.phoneNumber ,
                                username: data.username,
                                email: data.email
                            }}
                        /> :
                        <Flex gap={20} vertical>
                            <h3>Имя пользователя: {userData?.username}</h3>
                            <h3>Email: {userData?.email}</h3>
                            <h3>Телефон: {userData?.phoneNumber}</h3>
                            {isFromAdminPage ? <Flex gap={10} justify={'space-between'}>
                                <Button
                                    onClick={startEditing}
                                >
                                    Редактировать
                                </Button>
                                {isFromAdminPage && <Button
                                    onClick={handleGoBack}
                                >
                                    Назад
                                </Button>}
                            </Flex> : null}

                        </Flex>
                }

                {!isFromAdminPage && <Button loading={logoutLoading} onClick={handleLogout}>Выйти</Button>}
            </Flex>
        );
};
