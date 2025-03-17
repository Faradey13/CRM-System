import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/styles/index.scss'
import App from './app/App.tsx'
import '@ant-design/v5-patch-for-react-19';
import {Provider} from "react-redux";
import {store} from "@/app/providers/StoreProvoder/config/strore.ts";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <StrictMode>
                <App />
        </StrictMode>,
    </Provider>

)
