import AppRoutes from "@/app/providers/routes";
import Sidebar from "@/widgets/Sidebar";
import './styles/index.scss'
import {Flex, Layout} from "antd";

function App() {
  return (
    <main className={'app'}>
        <Layout
            hasSider={true}
        >
            <Flex justify={'center'}>
                <AppRoutes/>
                <Sidebar/>
            </Flex>

        </Layout>
    </main>
  )
}

export default App
