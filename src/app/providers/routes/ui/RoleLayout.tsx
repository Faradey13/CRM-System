import {useSelector} from "react-redux";
import {StateSchema} from "@/shared/config/StateSchema.ts";
import {Navigate, Outlet} from "react-router-dom";
import { RoutePath } from "@/shared/config/constants";



const  RoleLayout = () => {
    const isAdmin = useSelector((state: StateSchema) => state.auth.isAdmin);


    return isAdmin ? <Outlet/> : <Navigate to = {RoutePath.MAIN} />
}
export default RoleLayout;