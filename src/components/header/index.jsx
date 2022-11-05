import React from 'react'
import {  useNavigate } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

import LinkButton from '../link-button';
import './index.less'
import storageUtils from '../../utils/storageUtils';

export default function Header(){
  const navigate = useNavigate();

  const getUserName =() =>{
    const {nombre_usuario} = storageUtils.getUser()
    // console.log(nombre_usuario);
    return nombre_usuario;
  }

  const logout =()=>{
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content:'¿Estás seguro de que quieres cerrar la sesión?',
      onOk:() =>{
        //eliminar los datos guardados en localstorage
        storageUtils.removeUser()
        //redirect to login page
        navigate('/login',{replace:true});
      },
    })
  }
  
  return (
    <div className='header'>
      <div className="header-top">
        {/* <span >Restaurante Maminco RestoBar</span> */}
        <span >Bienvenido,{getUserName()}</span>
        <LinkButton  onClick={logout}>Salir</LinkButton>
      </div>
    </div>
  )
  
}

