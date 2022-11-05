import { Button, 
    Card, 
    message,  
    Modal, 
    Table 
} from 'antd'
import React 
, { useEffect,
useRef,
useState }
from 'react'
import { reqAddRole, reqListRoles, reqUpdateRole } from '../../../api';
import AddRol from './add-rol';
import AuthForm from './auth-form';

export default function Role() {
    // const [loading,setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(true)
    const [roles, setRoles] = useState([])
    const [role,setRole] = useState({})
    const auth = useRef()
    const addForm = useRef()

    const columns = [
        {
            title: 'Descripcion',
            dataIndex: 'descripcion',
        },
    ]

    const getRoles = async () => {
        const result = (await reqListRoles()).data
        if (result.status === 0) {
          const { data } = result
          setRoles(data)
        }
    }
    useEffect(() =>{
        getRoles(); 
    },[])

    const showModal =  () => {
        setIsModalOpen(true);
    };

    const handleOk = async() => {
        if(isAdd){
            const {formFields} = addForm.current
        
            //validar los datos del formulario
            await formFields.validateFields()
            const {descripcion} = formFields.getFieldsValue()
            //resetear los campos del formulario
            addForm.current.formFields.resetFields()

            const result = (await reqAddRole(descripcion)).data
            if(result.status === 0){
                message.success('rol creado existosamente')
                const rol = result.data
                setRoles([...roles,rol])
            }else{
                message.error(result.msg)
            }      
        }else{
            const {id_tipo} = role
            //getMenu() ===  permisos asignados del rol
            const menu = auth.current.getMenu()
            const newRole = {id_tipo,menu}
            const result = (await reqUpdateRole(newRole)).data
            if (result.status === 0) {
                message.success(result.msg)
                role.menu = menu
                setRole(role)
                getRoles()
                handleCancel()
            }else {
                message.error(result.msg)
            }
        }
        
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        // console.log('cancel',role)
        // setRole(role)
        if(isAdd){
            addForm.current.formFields.resetFields()
        }else{
            auth.current.setMenu(role.menu)
        }
        
        setIsModalOpen(false);
        
    };

    // 
    const addRole = () => {
        setIsAdd(true)
        showModal()
    }
    // 
    const authRole = () => {
        setIsAdd(false)
        showModal()
    }
    const title =(
        <span>
            <Button type='primary' style={{marginRight: 15}} onClick={addRole}>Crear Rol</Button>&nbsp; &nbsp;
            <Button type='primary' disabled={!role.id_tipo} onClick={authRole}>Asignar permisos</Button>
        </span>
    )
    
    //fila seleccionada de la tabla
  const onRow = (record) =>{
    return {
        onClick: () =>{
            // console.log(record)
            setRole(record)
        }
    }
  }

  return (
    <Card title={title}>
        <Table 
            bordered={true} rowKey='id_tipo' 
            // loading={loading}
            dataSource={roles} columns={columns} 
            pagination={{defaultPageSize:5}} 
            rowSelection={{
                type: 'radio',
                selectedRowKeys: [role.id_tipo]
            }}
            onRow={onRow}
        />;
        <Modal
            title={isAdd ?'Crear Rol':'Asignar Permisos'}
            open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            {
                isAdd?
                <AddRol ref={addForm} />:
                <AuthForm ref={auth} role={role}/>
            }  
        </Modal>

    </Card>
  )
}
