import {useSelector} from "react-redux";
import {StateSchema} from "@/app/providers/StoreProvoder/config/StateSchema.ts";
import {Navigate, Outlet} from "react-router-dom";
import {RoutePath} from "@/app/providers/routes/model/constants";


const  AdminLayout = () => {
    const isAdmin = useSelector((state: StateSchema) => state.auth.isAdmin);


    return isAdmin ? <Outlet/> : <Navigate to = {RoutePath.MAIN} />
}
export default AdminLayout;