import { Layout } from 'antd';
import {Outlet} from 'react-router-dom'; 
import LeftNav from "../../components/left-nav";
import Header from '../../components/header';
// import bg from '../login/images/bg2.jfif'
import './index.less'
const {Footer, Sider, Content } = Layout;

export default function Admin() {
  
    return (
      <Layout style={{minHeight:'100vh'}}>
        <Sider width='230'
         breakpoint="lg"
         collapsedWidth="0">
          <LeftNav/>
        </Sider>
        <Layout>
          <Header/>
          <Content style={{
          margin: 20,
          overflow: 'initial',
        }}>
            <Outlet/>
          </Content>
          <Footer style={{textAlign:'center',color:'white'}}>Desarrollado por Grupo 8</Footer>
        </Layout>
      </Layout>
     
    )
  
}
