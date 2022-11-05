import React, {useState } from 'react'
import {
    Card,
    Input,
    Button,
    Table,
    Modal,
    // message,
    Row,
    Col
}from 'antd'
import {
    PlusOutlined,
    ExclamationCircleOutlined} from '@ant-design/icons'
// import LinkButton from '../../../components/link-button'
// import { useNavigate } from 'react-router-dom'
import AddQuantity from './add-quantity'
import { useRef } from 'react'
import LinkButton from '../../../components/link-button'
const {Search} = Input

const productos =[
    {
        "codigo": 12,
        "nombre": "PATO CANTONESA",
        "tipo": "C",
        "precio": 200,
        "eliminado": false,
        "producto_menu": {
            "id_menu": 1,
            "codigo_producto": 12,
            "cantidad": 0
        }
    },
    {
        "codigo": 13,
        "nombre": "PATO BBQ",
        "tipo": "C",
        "precio": 205,
        "eliminado": false,
        "producto_menu": {
            "id_menu": 1,
            "codigo_producto": 13,
            "cantidad": 0
        }
    },
    {
        "codigo": 14,
        "nombre": "PATO LIMEÑA",
        "tipo": "C",
        "precio": 210,
        "eliminado": false,
        "producto_menu": {
            "id_menu": 1,
            "codigo_producto": 14,
            "cantidad": 0
        }
    },
    {
        "codigo": 15,
        "nombre": "GASEOSA",
        "tipo": "B",
        "precio": 15,
        "eliminado": false,
        "producto_menu": {
            "id_menu": 1,
            "codigo_producto": 15,
            "cantidad": 0
        }
    },
    {
        "codigo": 16,
        "nombre": "JARRA JUGO",
        "tipo": "B",
        "precio": 29,
        "eliminado": false,
        "producto_menu": {
            "id_menu": 1,
            "codigo_producto": 16,
            "cantidad": 0
        }
    },
]

export default function Menu() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const addForm = useRef()
  
    // const [loading, setLoading] = useState(false);
    // const [productos, setProductos] = useState([]);
    // const navigate = useNavigate();

    const deleteProduct = (codigo)=>{
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content:'¿Estás seguro de eliminar este producto del menu de hoy?',
            // onOk:async() =>{
            //     const response = await reqDeleteProduct(codigo)
            //     const result = response.data
            //     if(result.status === 0){
            //         message.success(result.msg);
            //         getProducts(); 
            //     }else{
            //         message.error(result.msg);
            //     }
            // }
        })
    }

    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        const {form} = addForm.current
        const {cantidad}= form.getFieldsValue()
        console.log(cantidad)
        setIsModalOpen(false);
        form.resetFields()
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
      
    const onSearch = async (value) => {
        // const response = await reqSearchProduct(value)
        // getProducts(response)
    };
    
    const columns = [
        {
            title: 'Nombre del Producto',
            dataIndex: 'nombre',
        },
        {
            title:'Tipo',
            dataIndex:'tipo',
            render:(tipo) => tipo === 'C' ? 'COMIDA':'BEBIDA',
        },
        {
            title: 'Precio',
            dataIndex: 'precio',
            render: (precio)=> 'Bs '+precio 
        },
        {
            title:'Cantidad',
            dataIndex:'producto_menu',
            render: (producto_menu) => {
                return (
                    <span>
                        <span>{producto_menu.cantidad}</span>&nbsp; &nbsp;
                        <Button type='primary' onClick={showModal}>Añadir</Button>
                    </span>
                )
            }
        },
        {
            title:'Accion',
            dataIndex:'codigo',
            render: (codigo)=>
                <LinkButton type='primary' onClick={()=>deleteProduct(codigo)}>Eliminar</LinkButton>
            
        }
    ]
    

    // const getProducts =async (response) =>{
    //     // console.log('get product')
    //     setLoading(true)
    //     if(response){
            
    //     }else{
    //         response = await reqListProducts()
    //     }
    //     const result = response.data
    //     // console.log(result)
    //     setLoading(false)
    //     if(result.status === 0){
    //         setProducto(result.data)
    //         // console.log(producto)
    //     }else{
    //         message.error('error')
    //     }  
    // }
    // useEffect(() =>{
    //     // console.log('useeeffect')
    //     getProducts(); 
    // },[])

    const title =(
        
    <Row
        gutter={{
            xs: 8,
            sm: 16,
        }}
    >
        <Col className="gutter-row" span={16}>
        <Search 
                placeholder="Introduzca el nombre del producto"
                onSearch={onSearch} enterButton />
      </Col>
    </Row> 
        
    )

    const extra =(
        <Button type='primary' onClick={()=>{}}>
            <PlusOutlined/>
            Generar Menu
        </Button>
    )
    // useComponentWillMount(() => initColumns);
    return (
      <Card title={title} extra={extra}>
        <Table 
            bordered={true} rowKey='codigo' 
            // loading={loading}
            dataSource={productos} columns={columns} 
            pagination={{defaultPageSize:6}} />
        <Modal
            title={'Añadir Cantidad'}
            open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <AddQuantity ref={addForm}/>
        </Modal>
      </Card>
    )
  
}
