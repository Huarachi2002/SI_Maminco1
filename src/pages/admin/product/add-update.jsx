import React from 'react'
import {
    Button,
    Card,
    Form,
    Input,
    Select,
    message
} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import LinkButton from '../../../components/link-button'
import { useLocation, 
    useNavigate 
} from 'react-router-dom'
import { reqAddProducts, reqUpdateProducts } from '../../../api'

const {Item} = Form
const {Option} = Select

const layout = {
    labelCol: {
      xs:{span:24},
      sm:{span:4},
    },
    wrapperCol: {
        xs:{span:24},
        sm:{span:12},
    },
};
const tailLayout={
    wrapperCol:{
        xs: {
          span: 18,
          offset:6 ,
        },
        sm: {
          span: 14,
          offset: 10,
        },
    }
}

export default function AddUpdate() {
    const navigate = useNavigate()
    const location = useLocation()
    let product = location.state
    const isUpdate = !!product 
    product = isUpdate? location.state.product : {};
    
    const validatePrice = async (_, value) => {
        if (value *1 <= 0) {
            throw new Error('El precio tiene que ser mayor que 0 ');
        } else if (!/^[1-9]\d*$/.test(value)) {
            throw new Error('El precio tiene que ser entero');
        }
    }
    const onFinish = async (fieldsValue) =>{
        // console.log(fieldsValue)
        let response;
        if(isUpdate){
            fieldsValue.codigo = product.codigo
            response = await reqUpdateProducts(fieldsValue)    
        }else{
            response = await reqAddProducts(fieldsValue)    
        }
        const result = response.data;
        // console.log(result);
        if(result.status === 0){
            message.success(result.msg);
            navigate('/admin/producto')
        }else{
            message.error(result.msg);
        }
    }
    
    const title = (
        <span>
            <LinkButton onClick={() => navigate(-1)}>
                <ArrowLeftOutlined style={{color:'green',marginRight: 10, fontSize:20}}/>
            </LinkButton>
            <span>{isUpdate? 'Modificar Producto':'Añadir Producto'}</span>
        </span>
    )
  return (
    <Card title={title}>
        <Form {...layout} labelWrap onFinish={onFinish}>
            <Item label='Nombre del Producto'
                name="nombre"
                initialValue={product.nombre}
                rules={[
                    {required:true, message:'Introduzca el nombre del producto'}
                ]}
                normalize={(value, prevValue, prevValues) => {
                    return value.toUpperCase();
                }}
                >
                <Input placeholder='Introduzca el nombre del producto'/>
            </Item>
            <Item label='Precio'
                name="precio"
                initialValue={product.precio}
                rules={[
                 {required:true, message:'Introduzca el precio'},
                 {validator: validatePrice}
                ]}
            >
                <Input type='number' placeholder='Introduzca el precio' addonAfter='Bs'/>
            </Item>
            <Item
                name="tipo"
                label="tipo"
                initialValue={product.tipo === 'C'? 'C':'B'}
                rules={[
                {
                    required: true,
                    message: 'Seleccione un tipo!',
                },
                ]}
            >
                <Select placeholder="Seleccione un tipo">
                    <Option value="C">Comida</Option>
                    <Option value="B">Bebida</Option>
                </Select>
             </Item>
            < Item {...tailLayout}>
                <Button type='primary'  htmlType="submit" >
                    {isUpdate? 'Guardar':'Añadir'}
                </Button>
            </Item>
        </Form>
    </Card>
  )
}

