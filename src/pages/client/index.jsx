import { Layout, Modal } from 'antd';
import React from 'react';
import './index.less'

import ClientHeader from '../../components/client-header';
// import Header from '../../components/header'
import { Outlet, useNavigate } from 'react-router-dom';
import storageUtils from '../../utils/storageUtils';
import { ExclamationCircleOutlined} from '@ant-design/icons';
import LinkButton from '../../components/link-button';
const {Content, Footer } = Layout;


export default function ClientPage() {
  const navigate = useNavigate()
  const getUserName =() =>{
    const {nombre_usuario} = storageUtils.getUser()
    return nombre_usuario;
  }
  const logout =()=>{
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content:'¿Estás seguro de que quieres cerrar la sesión?',
      onOk:() =>{
        storageUtils.removeUser()
        navigate('/login',{replace:true});
      },
    })
  }

  return (
    <Layout style={{minHeight:'100vh'}}>

      <ClientHeader/>

      <div className="header-right">
            <span style={{fontFamily:'papyrus',fontWeight:'bold'}}>Bienvenido,{getUserName()}</span>
            <LinkButton style={{color:'#54e306'}}onClick={logout}>Salir</LinkButton>
      </div>

    <Content style={{padding: '0 50px',}}> 
      <div className="site-layout-content">
        <Outlet/>
      </div>
    </Content>
    <Footer
      style={{
        textAlign: 'center',
        color:'white',
      }}
    >
      Desarrollado por Grupo 8
    </Footer>
  </Layout>
  )
}

