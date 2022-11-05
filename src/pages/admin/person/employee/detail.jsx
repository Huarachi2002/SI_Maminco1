import React from 'react'
import {
    Card,
    List
}from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import LinkButton from '../../../../components/link-button'
import { useLocation, useNavigate } from 'react-router-dom'
const Item = List.Item

export default function EmpDetail() {
    const navigate = useNavigate()
    const location = useLocation()
    const {nro,puesto,codigo}=location.state.emp
    const {nombres,apellido_paterno,apellido_materno,ci,sexo,
        telefono,direccion,e_mail,fecha_nacimiento} = location.state.emp.empleado.Persona
    const empl = location.state.emp.empleado
    const title = (
        <span>
            <LinkButton>
                <ArrowLeftOutlined 
                    style={{color:'orange',marginRight: 10, fontSize:20}}
                    onClick ={()=> navigate(-1)}
                />
            </LinkButton>
            <span>Empleado</span>
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
                <span >Apellidos</span>
                <span>{apellido_paterno + " " + (apellido_materno !== null? apellido_materno: '')}</span>
            </Item>
            <Item>
                <span>CI</span>
                <span>{ci}</span>
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
                <span>Cargo</span>
                <span>{empl.tipo === 'M'? 'Mesero':empl.tipo === 'A'? 'Administrativo':'Cocinero'}</span>
            </Item>

            <Item>
                <span>{empl.tipo === 'M'? 'Nro':empl.tipo === 'A'?'Codigo':'Puesto'}</span>
                <span>{empl.tipo === 'M'? nro:empl.tipo === 'A'?codigo:puesto}</span>
            </Item>
            
            <Item>
                <span>Sueldo</span>
                <span>{empl.sueldo}</span>
            </Item>
            <Item>
                <span>Hora Llegada</span>
                <span>{empl.hora_llegada}</span>
            </Item>
            <Item>
                <span>Hora Salida</span>
                <span>{empl.hora_salida}</span>
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
