import React, { useEffect, useState } from 'react'
import {
    Card,
    Input,
    Table,
    Modal,
    message,
    Row,
    Col
}from 'antd'
// import { useNavigate} from 'react-router-dom'
import {ExclamationCircleOutlined} from '@ant-design/icons'
import LinkButton from '../../../components/link-button'
import { reqDeleteUser, reqListUsers, reqSearchUser } from '../../../api'
const {Search} = Input

export default function User () {
  
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();

    const deleteUser = (value)=>{
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content:'¿Estás seguro de eliminar este usuario?',
            onOk:async() =>{
                const response = await reqDeleteUser(value);
                const result = response.data
                // console.log(result)
                if(result.status === 0){
                    message.success(result.msg);
                    getUsers();
                }else{
                    message.error(result.msg);
                }
            },
          })
    }

    const onSearch = async (value)=>{
        // if(value !== ''){
            const response = await reqSearchUser(value)
            getUsers(response)
        // }  
    }
    
    const columns = [
        {
            title: 'Nombre de Usuario',
            dataIndex: 'nombre_usuario',
        },
        {
            title:'Tipo',
            dataIndex:'tipo_Usuario',
            render:(tipo_Usuario)=> tipo_Usuario.descripcion
        },
        {
            title:'Nombres',
            dataIndex:'Persona',
            render:(Persona) => Persona.nombres
        },
        {
            title:'Apellidos',
            dataIndex:'Persona',
            render:(Persona) => Persona.apellido_paterno + " " + Persona.apellido_materno
        },
        {
            title: 'Accion',
            render: (user)=>{
                return(
                    <span>
                        <LinkButton type='primary' onClick={() =>deleteUser(user.nombre_usuario)}>Eliminar</LinkButton>
                    </span>
                )
            }
            
        },
    ];
    const getUsers = async(response)=>{
        setLoading(true)
        if(response){
            
        }else{
            response = await reqListUsers()
        }
        const result = response.data
        // console.log(result)
        setLoading(false)
        if(result.status === 0){
            setUsers(result.data)
            // console.log(producto)
        }else{
            message.error(result.msg)
        }  
    }

    useEffect(() =>{
        getUsers()
    },[])
    
    const title =(
        <Row
        gutter={{
            xs: 8,
            sm: 12,
        }}
        >
        <Col className="gutter-row" span={9}>
            <Search 
                placeholder="Introduzca nombre de usuario/nombres/apellidos " 
                onSearch={onSearch} enterButton />
        </Col>
    </Row>
        
    )

    return (
      <Card title={title} >
        <Table bordered={true} rowKey='nombre_usuario' 
        dataSource={users} columns={columns} 
        loading={loading}
        pagination={{defaultPageSize:6, showQuickJumper:true}} />;
      </Card>
    )
}

