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
import {
    PlusOutlined,
    ExclamationCircleOutlined
    } from '@ant-design/icons'
import LinkButton from '../../../../components/link-button'
import Register from '../register'
import { reqDeleteEmp, reqListEmp, reqSearchEmp } from '../../../../api'
const {Search} = Input

export default function EmployeeHome () {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emps, setEmps] = useState([]);
  const [roles,setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id,setId] = useState(0);
  const navigate = useNavigate();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSearch = async (value) => {
    const response = await reqSearchEmp(value)
    getEmployees(response)
  };

  const deleteEmp = (id_empleado)=>{
    Modal.confirm({
        icon: <ExclamationCircleOutlined />,
        content:'¿Estás seguro de eliminar este empleado?',
        onOk:async() =>{
            const response = await reqDeleteEmp(id_empleado)
            const result = response.data
            if(result.status === 0){
                message.success(result.msg);
                getEmployees(); 
            }else{
                message.error(result.msg);
            }
        }
    })
  }

  const columns = [
        {
            title: 'Nombres',
            dataIndex: 'empleado',
            render:(empleado) => empleado.Persona.nombres
        },
        {
            title:'Apellidos',
            dataIndex:'empleado',
            render:(empleado)=> empleado.Persona.apellido_paterno + " " + (empleado.Persona.apellido_materno !== null? empleado.Persona.apellido_materno:'')
        },
        {
            title: 'Sexo',
            dataIndex: 'empleado',
            render:(empleado) => empleado.Persona.sexo
        },
        {
          title: 'Cargo',
          dataIndex: 'empleado',
          render:(empleado) => empleado.tipo === 'M'?'Mesero':empleado.tipo === 'A'?'Administrativo':'Cocinero'
        },
      {
            title: 'Accion',
            render: (emp)=>{
                return(
                    <span>
                        <LinkButton type='primary' onClick={()=>navigate('/admin/empleado/detalles',{state:{emp}})}>Detalle</LinkButton>
                        <LinkButton type='primary' onClick={()=>navigate('/admin/empleado/modreg',{state:{emp}})}>Modificar</LinkButton>
                        <LinkButton type='primary' onClick={()=>deleteEmp(emp.id)}>Eliminar</LinkButton>
                        <LinkButton type='primary' onClick={()=>{setId(emp.id);setIsModalOpen(true)}}>Crear usuario</LinkButton>
                    </span>
                )
            }      
      },
    ];

    const getEmployees = async(response)=>{
      setLoading(true)
      if(response){
      }else{
          response = await reqListEmp()
      }
      const result = response.data

      setLoading(false)
      if(result.status === 0){
          setEmps(result.data.emp)
          setRoles(result.data.roles)
      }else{
          message.error(result.msg)
      }  
  }

    useEffect(() =>{
      getEmployees()
    },[])

    const title =(
      <Row
        gutter={{
            xs: 8,
            sm: 12,
        }}
      >
        <Col className="gutter-row" span={12}>
          <Search 
            placeholder="Introduzca nombres/apellidos del empleado"
            onSearch={onSearch} enterButton />
        </Col>
      </Row>   
            
        
    )

    const extra =(
        <Button type='primary' onClick={()=>navigate('/admin/empleado/modreg')}>
            <PlusOutlined/>
            Registrar Empleado
        </Button>
    )


    return (
      <Card title={title} extra={extra}>
        <Table bordered={true} rowKey='id' 
        dataSource={emps} columns={columns} 
        loading={loading}
        pagination={{defaultPageSize:6, showQuickJumper:true}} />;

      {isModalOpen? <Modal title="Registrar Usuario" open={isModalOpen} onOk={handleOk}
        onCancel={handleCancel} footer={null}>
        <Register id_persona={id} roles={roles}/>
      </Modal>:null}
      </Card>
    )
}



