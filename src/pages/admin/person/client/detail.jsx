import React from 'react'
import {
    Card,
    List
}from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import LinkButton from '../../../../components/link-button'
import { useLocation, useNavigate } from 'react-router-dom'
const Item = List.Item

export default function ClDetail() {
    const navigate = useNavigate()
    const location = useLocation()
    const {nit}=location.state.client
    const {nombres,apellido_paterno,apellido_materno,ci,sexo,
        telefono,direccion,e_mail,fecha_nacimiento} = location.state.client.Persona
    const title = (
        <span>
            <LinkButton>
                <ArrowLeftOutlined 
                    style={{color:'orange',marginRight: 10, fontSize:20}}
                    onClick ={()=> navigate(-1)}
                />
            </LinkButton>
            <span>Cliente</span>
        </span>
    )
  return (
    <Card title={title} >
        <List>
            <Item>
                <span>Nombres</span>
                <span> {nombres}</span>
            </Item>
            <Item>
                <span >Apellido Paterno</span>
                <span>{apellido_paterno}</span>
            </Item>
            <Item>
                <span >Apellido Materno</span>
                <span>{apellido_materno}</span>
            </Item>
            <Item>
                <span>CI</span>
                <span>{ci}</span>
            </Item>
            <Item>
                <span >NIT</span>
                <span>{nit}</span>
            </Item>
            <Item>
                <span>Sexo</span>
                <span>{sexo}</span>
            </Item>
            <Item>
                <span>Fecha de Nacimiento</span>
                <span>{fecha_nacimiento}</span>
            </Item>
            <Item>
                <span>Telefono</span>
                <span>{telefono}</span>
            </Item>
            <Item>
                <span>Direccion</span>
                <span>{direccion}</span>
            </Item>
            <Item>
                <span>E-mail</span>
                <span>{e_mail}</span>
            </Item>
            
        </List>
    </Card>
  )
}
