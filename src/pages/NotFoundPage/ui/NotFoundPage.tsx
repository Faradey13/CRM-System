import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "@/app/providers/routes/model/constants";


const NotFoundPage = () => {
    const navigate = useNavigate()
    const handleGoToHome = () => {
        navigate(RoutePath.MAIN)
    }
    return (
        <div>
            NotFoundPage
            <Button onClick={handleGoToHome}>На главную</Button>
        </div>
    );
};

export default NotFoundPage;