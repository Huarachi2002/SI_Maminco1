import { Menu } from 'antd'
import React from 'react'

// import { AppstoreOutlined, MailOutlined, SettingOutlined  } from '@ant-design/icons';
import './index.less'
import logo from '../../assets/images/logo1.jpg'
import items from '../../config/clientMenuConfig.js'
import { NavLink } from 'react-router-dom'

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export default function ClientHeader() {
   
  const getMenuNodes = (menuList) =>{
    return menuList.map(item => {
      
        if (!item.children) {
          // console.log(item.key)
            return getItem(<NavLink to={item.key}>{item.label}</NavLink>,item.key,item.icon)
        }
        else { 
          return getItem(item.label,item.key,item.icon,getMenuNodes(item.children))
        }
      
  })
}

  return (
    <>
      <div className="header">

        <div className="header-logo">
            <img src={logo} alt="logo" />
        </div>

        <Menu  selectedKeys={['mail']} mode="horizontal" items={getMenuNodes(items)} />
        
      </div>

    </>
  )
}
