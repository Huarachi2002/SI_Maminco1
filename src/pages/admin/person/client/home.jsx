import React,{useEffect, useState} from 'react'
import {
    Card,
    Input,
    Button,
    Table,
    Modal,
    message,
    Row,
    Col
}from 'antd'
import { useNavigate} from 'react-router-dom'
import {PlusOutlined} from '@ant-design/icons'
import LinkButton from '../../../../components/link-button'
import Register from '../register'
import { reqListClients, reqSearchClient } from '../../../../api'

const {Search} = Input

export default function PersonClientHome () {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [roles,setRoles] = useState([])
  const [loading, setLoading] = useState(false);
  const [id,setId] = useState(0);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();
    
    const columns = [
      {
        title:'Nombres',
        dataIndex:'Persona',
        render:(Persona) => Persona.nombres
      },
      {
          title:'Apellidos',
          dataIndex:'Persona',
          render:(Persona) => Persona.apellido_paterno + " " + (Persona.apellido_materno !== null? Persona.apellido_materno:'')
      },
      {
        title: 'NIT',
        dataIndex: 'nit',
      },
      {
          title: 'accion',
          render: (client)=>{
              return(
                  <span>
                      <LinkButton type='primary' onClick={()=> navigate('/admin/cliente/detalles',{state:{client}})}>Detalle</LinkButton>
                      <LinkButton type='primary' onClick={()=>{navigate('/admin/cliente/modreg',{state:{client}})}}>Modificar</LinkButton>
                      <LinkButton type='primary' onClick={()=>{setId(client.id_cliente);setIsModalOpen(true)}}>Crear usuario</LinkButton>
                  </span>
              )
          }  
      },
    ];
    
    const getClients = async(response)=>{
      setLoading(true)
      if(response){ 
      }else{
          response = await reqListClients()
      }
      const result = response.data

      setLoading(false)
      if(result.status === 0){
          setClients(result.data.clients)
          setRoles(result.data.roles)
          // console.log(producto)
      }else{
          message.error(result.msg)
      }  
  }

    useEffect(() =>{
      getClients()
    },[])

    const onSearch = async (value) =>{
      const response = await reqSearchClient(value)
        getClients(response)
    }
    const title =(
      <Row
        gutter={{
            xs: 8,
            sm: 12,
        }}
      >
        <Col className="gutter-row" span={12}>
          <Search 
            placeholder="Introduzca nombres/apellidos del cliente"
            onSearch={onSearch} enterButton />
        </Col>
      </Row>     
        
    )

    const extra =(
        <Button type='primary' onClick={()=>{navigate('/admin/cliente/modreg')}}>
            <PlusOutlined/>
            Registrar Cliente
        </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table bordered={true} rowKey='id_cliente' 
        loading={loading}
        dataSource={clients} columns={columns} 
        pagination={{defaultPageSize:6, showQuickJumper:true}} />;

      {isModalOpen? <Modal title="Registrar Usuario" open={isModalOpen} onOk={handleOk}
        onCancel={handleCancel} footer={null}>
        <Register id_persona={id} roles={roles}/>
      </Modal>:null}
      </Card>
    )
}


