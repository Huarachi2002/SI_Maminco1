import React, { useState } from 'react'
import {
    Button,
    Card,
    message,
    List,
    Row,
    Col
} from 'antd'

import { reqClientInfo } from '../../../api'
import storageUtils from '../../../utils/storageUtils'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const {Item} = List

export default function ClientInfo() {
    const navigate = useNavigate()
    const [person, setPerson] =useState({});
    
    const getInfo = async()=>{
        const {id_persona} = storageUtils.getUser()
        const response = await reqClientInfo(id_persona)
        const result = response.data
        if(result.status === 0){
            console.log(result)
            setPerson(result.data)
        }else{
            message.error(result.msg)
        }  
    }
    useEffect(() =>{
        getInfo()
    },[])
    
    
    const title = (
        <span>
            Datos Personales
        </span>
    )
    
  return (
    <Card title={title}>
        <Row justify='end'>
            <Col >
                <Button type='primary' style={{margin:'0 auto'}} onClick={()=>navigate('/client/editar',{state:{person}})}>Editar</Button>
            </Col>
        </Row>
        <List>
            <Item>
                <span>Nombres</span>
                <span> {person.nombres}</span>
            </Item>
            <Item>
                <span >Apellidos</span>
                <span>{person.apellido_paterno + " " + (person.apellido_materno !== null? person.apellido_materno: '')}</span>
            </Item>
            <Item>
                <span>CI</span>
                <span>{person.ci}</span>
            </Item>
            <Item>
                <span>Sexo</span>
                <span>{person.sexo}</span>
            </Item>
            <Item>
                <span>Fecha de Nacimiento</span>
                <span>{person.fecha_nacimiento}</span>
            </Item>
            <Item>
                <span>Telefono</span>
                <span>{person.telefono}</span>
            </Item>
            <Item>
                <span>Direccion</span>
                <span>{person.direccion}</span>
            </Item>
            <Item>
                <span>E-mail</span>
                <span>{person.e_mail}</span>
            </Item>
            
        </List>
        
    </Card>
  )
}

