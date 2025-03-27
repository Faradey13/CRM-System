import {FC, useState} from "react";
import {adminApi} from "@/features/Administration/api/adminApi.ts";
import Loader from "@/shared/ui/Loader/Loader.tsx";
import {Button, Flex} from "antd";

import {useLocation, useNavigate, useParams} from "react-router-dom";
import {RoutePath} from "@/app/providers/routes/model/constants";
import {EditUserForm} from "@/features/Administration";



const AdminUserPage:FC = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const loc = useLocation()
    console.log(loc.state)
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate()
    const {data, isLoading, isSuccess, refetch} = adminApi.useGetUserByIdQuery(Number(id))

    const closeEditing = () => {
        setIsEditing(false)
        refetch()
    }
    const startEditing =  () => {
        setIsEditing(true)
    }
    if(isLoading) return <Loader/>
    if(isSuccess)
    return (
        <Flex justify={'center'} align={'center'} gap={30} vertical>
            <h1>{`Пользователь ${data.id}`}</h1>
            {
                isEditing ?
                    <EditUserForm
                        id={Number(id)}
                        close={closeEditing}
                        userValues={{
                            phoneNumber: data.phoneNumber,
                            username: data.username,
                            email: data.email
                        }}
                    /> :
                    <Flex gap={20} vertical>
                        <h3>Имя пользователя: {data.username}</h3>
                        <h3>Email: {data.email}</h3>
                        <h3>Телефон: {data.phoneNumber}</h3>
                        <Flex gap={10} justify={'space-between'}>
                            <Button
                                onClick={startEditing}
                            >
                                Редактировать
                            </Button>
                            <Button
                                onClick={()=> navigate(RoutePath.ADMIN_USERS)}
                            >
                                Назад
                            </Button>
                        </Flex>

                    </Flex>
            }


        </Flex>
    );
};

export default AdminUserPage;