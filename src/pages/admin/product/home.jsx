import React, { useEffect, useState } from 'react'
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
import {
    PlusOutlined,
    ExclamationCircleOutlined} from '@ant-design/icons'
import LinkButton from '../../../components/link-button'
import { useNavigate } from 'react-router-dom'
import {reqDeleteProduct, reqListProducts, reqSearchProduct} from '../../../api/index.js'
const {Search} = Input

export default function ProductHome () {
    const [loading, setLoading] = useState(false);
    const [producto, setProducto] = useState([]);
    const navigate = useNavigate();

    const deleteProduct = (codigo)=>{
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content:'¿Estás seguro de eliminar este producto?',
            onOk:async() =>{
                const response = await reqDeleteProduct(codigo)
                const result = response.data
                if(result.status === 0){
                    message.success(result.msg);
                    getProducts(); 
                }else{
                    message.error(result.msg);
                }
            }
        })
    }
    
    const onSearch = async (value) => {
        const response = await reqSearchProduct(value)
        getProducts(response)
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
            title: 'accion',
            render: (product)=>{
                return(
                    <span>
                        <LinkButton type='primary' onClick={()=> navigate('/admin/producto/addupdate',{state:{product}})}>Modificar</LinkButton>
                        <LinkButton type='primary' onClick={()=>deleteProduct(product.codigo)}>Eliminar</LinkButton>
                    </span>
                )
            },
        }
    ]
    

    const getProducts =async (response) =>{
        // console.log('get product')
        setLoading(true)
        if(response){
            
        }else{
            response = await reqListProducts()
        }
        const result = response.data
        // console.log(result)
        setLoading(false)
        if(result.status === 0){
            setProducto(result.data)
            // console.log(producto)
        }else{
            message.error('error')
        }  
    }
    useEffect(() =>{
        // console.log('useeeffect')
        getProducts(); 
    },[])

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
        <Button type='primary' onClick={()=>{navigate('/admin/producto/addupdate')}}>
            <PlusOutlined/>
            Añadir Nuevo Producto
        </Button>
    )
    // useComponentWillMount(() => initColumns);
    return (
      <Card title={title} extra={extra}>
        <Table 
            bordered={true} rowKey='codigo' 
            loading={loading}
            dataSource={producto} columns={columns} 
            pagination={{defaultPageSize:6}} />;
      </Card>
    )
  
}
