import React, { useState } from 'react'
import {
    Button,
    Card,
    Form,
    Input,
    DatePicker,
    message
} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import LinkButton from '../../../../components/link-button'
import { useLocation, 
    useNavigate 
} from 'react-router-dom'
import moment from 'moment'
import { reqAddClient, reqUpdateClient } from '../../../../api'
const {Item} = Form

const layout = {
    labelCol: {
      xs:{span:24},
      sm:{span:6},
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
const dateFormat = 'YYYY/MM/DD';

export default function ClAddUpdate() {
    const navigate = useNavigate()
    const location = useLocation()
    let client = location.state
    const isUpdate = !!client 
    client = isUpdate? location.state.client : {};
    const Persona = isUpdate? location.state.client.Persona :{}
    const [flag,setFlag] = useState(false);
    const onFinish = async(fieldsValue) =>{
        if(flag){
            fieldsValue.fecha_nacimiento = fieldsValue.fecha_nacimiento._i
        }else{
            fieldsValue.fecha_nacimiento = Persona.fecha_nacimiento
        }
        let response;
        if(isUpdate){
            fieldsValue.id_cliente = client.id_cliente
            response = await reqUpdateClient(fieldsValue);
        }else{
            
            response = await reqAddClient(fieldsValue);
        }
        // console.log(fieldsValue)
        const result = response.data
        if(result.status === 0){
            message.success(result.msg)
            navigate('/admin/cliente')
        }else{
            message.error(result.msg)
        }      
    }
    
    const title = (
        <span>
            <LinkButton onClick={() => navigate(-1)}>
                <ArrowLeftOutlined style={{color:'orange',marginRight: 10, fontSize:20}}/>
            </LinkButton>
            <span>{isUpdate? 'Modificar Cliente':'Registrar Cliente'}</span>
        </span>
    )
    
    const onChange = (_,dateString)=>{
        Persona.fecha_nacimiento = dateString;
        setFlag(true);
        // console.log('Formatted Selected Time: ', dateString);
    }
    const normalize = (value, prevValue, prevValues) => value.toUpperCase();

    return (
    <Card title={title}>
        <Form  {...layout} labelWrap onFinish={onFinish}>
            <Item label='Nombres'
                name="nombres"
                initialValue={Persona.nombres}
                rules={[
                    {required:true, message:'Introducir nombres'},
                    {pattern:/^[a-zA-Z -'ñÑ]+$/,message:'existen caracteres invalidos'},
                    {max:30, message:'Maximo 40 caracteres'}
                ]}
                normalize={normalize}
                >
                <Input placeholder='Introduzca '/>
            </Item>
            <Item label='Apellido Paterno'
                name="apellido_paterno"
                initialValue={Persona.apellido_paterno}
                rules={[
                    {required:true,message:'Introducir su apellido paterno'},
                    {pattern:/^[a-zA-Z -'ñÑ]+$/,message:'existen caracteres invalidos'},
                    {max:30, message:'Maximo 30 caracteres'}
                ]}
                normalize={normalize}
            >
                <Input placeholder='Introduzca su apellido paterno'/>
            </Item>
            <Item label='Apellido Materno'
                name="apellido_materno"
                initialValue={Persona.apellido_materno}
                rules={[
                    {pattern:/^[a-zA-Z -'ñÑ]+$/,message:'existen caracteres invalidos'},
                    {max:30, message:'Maximo 30 caracteres'}
                ]}
                normalize={normalize}
            >
                <Input placeholder='Introduzca su apellido materno'/>
            </Item>
            <Item label='CI'
                name="ci"
                initialValue={Persona.ci}
                rules={[
                    {pattern:/^[1-9]\d*$/,message:'solo se permiten numeros'},
                    // {max:9, message:'se permiten 9 digitos como maximo '}
                ]}
                >
                <Input type='number' placeholder='Introduzca su CI'/>
            </Item>
            <Item label='NIT'
                name="nit"
                initialValue={client.nit}
                rules={[
                    {pattern:/^[1-9]\d*$/,message:'solo se permiten numeros'},
                    {max:12, message:'se permiten 12 digitos como maximo '}
                ]}
                >
                <Input placeholder='Introduzca su NIT'/>
            </Item>
            <Item label='Sexo'
                name="sexo"
                initialValue={Persona.sexo}
                rules={[
                    {required:true, message:'Introducir su sexo'},
                    {max:1,message:'dato invalido'},
                    {pattern:/^[MmFf]$/,message:'introducir M o F'},
                ]}
                normalize={normalize}
                >
                <Input placeholder='Introduzca su sexo'/>
            </Item>
            <Item
                label="Fecha Nacimiento" name="fecha_nacimiento"
                initialValue= {moment(Persona.fecha_nacimiento, dateFormat)}
                rules={[
                    {required: true,message: 'Seleccione su fecha de nacimiento!',},
                ]}
            >
                <DatePicker  onChange={onChange} format={dateFormat} />
            </Item>
            <Item label='Telefono'
                name="telefono"
                initialValue={Persona.telefono}
                rules={[
                    {required:true, message:'Introducir su telefono'},
                    // {max:8,message:'solo se permiten hasta 8 digitos'},
                    {pattern:/^[1-9]\d*$/,message:'solo se permiten numeros'},
                ]}
                >
                <Input type='number' placeholder='Introduzca su telefono'/>
            </Item>
            <Item label='Direccion'
                name="direccion"
                initialValue={Persona.direccion}
                normalize={normalize}
                >
                <Input placeholder='Introduzca su direccion'/>
            </Item>
            <Item label='E-mail'
                name="e_mail"
                initialValue={Persona.e_mail}
                rules={[
                    {max:30,message:'solo se permiten hasta 30 caracteres'},
                    {pattern:/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/,message:'email invalido'},
                ]}
                >
                <Input placeholder='Introduzca su e-mail'/>
            </Item>
            
            <Item {...tailLayout}>
                <Button type='primary'  htmlType="submit" >
                    {isUpdate? 'Guardar':'Registrar'}
                </Button>
            </Item>
        </Form>
    </Card>
  )
}
