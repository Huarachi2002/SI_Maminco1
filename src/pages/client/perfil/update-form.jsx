import React from 'react'
import {
    Button,
    Card,
    Form,
    Input,
    DatePicker,
    message,
} from 'antd'
import moment from 'moment'
import {ArrowLeftOutlined} from '@ant-design/icons'

import {reqUpdateClientInfo } from '../../../api'
import { useLocation, useNavigate } from 'react-router-dom'
import LinkButton from '../../../components/link-button'

const {Item} = Form

const dateFormat = 'YYYY/MM/DD';
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

export default function UpdateInfo() {
    const navigate = useNavigate()
    const location = useLocation()
    const {person} = location.state
//    console.log(location.state.person)

    const onFinish = async (fieldsValue) =>{
        fieldsValue.id = person.id;
        const response = await reqUpdateClientInfo(fieldsValue)
        
        const result = response.data
        if(result.status === 0){
            message.success(result.msg)
            navigate('/client')
        }else{
            message.error(result.msg)
        }
        console.log(fieldsValue)
    }
    
    
    
    const onChange = (_,dateString)=>{
        person.fecha_nacimiento = dateString;
        
        // console.log('Formatted Selected Time: ', dateString);
    }

    const normalize = (value, prevValue, prevValues) => value.toUpperCase();
    
    const title = (
        <span>
            <LinkButton onClick={() => navigate(-1)}>
                <ArrowLeftOutlined style={{color:'green',marginRight: 10, fontSize:20}}/>
            </LinkButton>
            <span>Datos Personales</span>
        </span>
    )
    
  return (
    <Card title={title}>
        <Form  {...layout} labelWrap onFinish={onFinish}>
            <Item label='Nombres'
                name="nombres"
                initialValue={person.nombres}
                rules={[
                    {required:true, message:'Introducir nombres'},
                    {pattern:/^[a-zA-Z -'ñÑ]+$/,message:'existen caracteres invalidos'},
                    {max:30, message:'Maximo 40 caracteres'}
                ]}
                normalize={normalize}
                >
                <Input placeholder='Introduzca sus nombres'/>
            </Item>
            <Item label='Apellido Paterno'
                name="apellido_paterno"
                initialValue={person.apellido_paterno}
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
                initialValue={person.apellido_materno}
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
                initialValue={person.ci}
                rules={[
                    {pattern:/^[1-9]\d*$/,message:'solo se permiten numeros'},
                    // {max:9, message:'se permiten 9 digitos como maximo '}
                ]}
                >
                <Input type='number' placeholder='Introduzca su CI'/>
            </Item>
            <Item label='Sexo'
                name="sexo"
                initialValue={person.sexo}
                rules={[
                    {required:true, message:'Introducir su sexo'},
                    {max:1,message:'dato invalido'},
                    {pattern:/^[MmFf]$/,message:'introducir M o F'},
                ]}
                normalize={normalize}
                >
                <Input placeholder='Introduzca M para masculino, F para femenino'/>
            </Item>
            <Item
                label="Fecha Nacimiento" name="fecha_nacimiento"
                initialValue= {moment(person.fecha_nacimiento, dateFormat)}
                rules={[
                    {required: true,message: 'Seleccione su fecha de nacimiento!',},
                ]}
            >
                <DatePicker  onChange={onChange} format={dateFormat} />
            </Item>
            
            <Item label='Telefono'
                name="telefono"
                initialValue={person.telefono}
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
                initialValue={person.direccion}
                normalize={normalize}
                >
                <Input placeholder='Introduzca su direccion'/>
                
            </Item>
            <Item label='E-mail'
                name="e_mail"
                initialValue={person.e_mail}
                rules={[
                    {max:30,message:'solo se permiten hasta 30 caracteres'},
                    {pattern:/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/,message:'email invalido'},
                ]}
                >
                <Input placeholder='Introduzca su email'/>
            </Item>
            
            <Item {...tailLayout}>
                <Button type='primary'  htmlType="submit" >
                    Guardar
                </Button>
            </Item>
        </Form>
    </Card>
  )
}


