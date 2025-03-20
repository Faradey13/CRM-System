import {RouterProvider} from "react-router-dom";
import {router} from "@/app/providers/routes/ui/Routes.tsx";


function App() {
    return <RouterProvider router={router}/>
}

export default App

