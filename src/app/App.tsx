import AppRoutes from "@/app/providers/routes";
import Sidebar from "@/widgets/Sidebar";
import './styles/index.scss'
import {Layout} from "antd";

function App() {
  return (
    <main className={'app'}>
        <Layout>
            <AppRoutes/>
            <Sidebar/>
        </Layout>
    </main>
  )
}

export default App
