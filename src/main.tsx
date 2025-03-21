import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/styles/index.scss'
import '@ant-design/v5-patch-for-react-19';
import { Provider } from 'react-redux';
import {store} from "@/app/providers/StoreProvoder/config/store.ts";
import {RouterProvider} from "react-router-dom";
import {router} from "@/app/providers/routes/ui/Routes.tsx";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <StrictMode>
             <RouterProvider router={router}/>
        </StrictMode>
    </Provider>

)
