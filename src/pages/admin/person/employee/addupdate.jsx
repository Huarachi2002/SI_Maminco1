import React, { useState } from 'react'
import {
    Button,
    Card,
    Form,
    Input,
    Select,
    DatePicker,
    message
} from 'antd'
import moment from 'moment'
import {ArrowLeftOutlined} from '@ant-design/icons'
import LinkButton from '../../../../components/link-button'
import { useLocation, 
    useNavigate 
} from 'react-router-dom'
import { reqAddClient, reqUpdateEmp } from '../../../../api'

const {Item} = Form
const {Option} = Select
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

export default function EmpAddUpdate() {
    const navigate = useNavigate()
    const location = useLocation()
    let emp = location.state
    const isUpdate = !!emp 
    emp = isUpdate? location.state.emp : {};
    const emply = isUpdate? emp.empleado:{};
    const Persona = isUpdate? emply.Persona:{};
    const [type, setType] =useState(emply.tipo);
    const [flag, setFlag] = useState(false);
    
    const onFinish = async (fieldsValue) =>{
        if(flag){
            fieldsValue.fecha_nacimiento = Persona.fecha_nacimiento
        }else{
            fieldsValue.fecha_nacimiento = fieldsValue.fecha_nacimiento._i
        }
        let response
        if(isUpdate){
            fieldsValue.id = emp.id;
            response = await reqUpdateEmp(fieldsValue)
        }else{
            response = await reqAddClient(fieldsValue)
        }
        const result = response.data
        if(result.status === 0){
            message.success(result.msg)
            navigate('/admin/empleado')
        }else{
            message.error(result.msg)
        }
        // console.log(fieldsValue)
    }
    
    const onChange = (_,dateString)=>{
        Persona.fecha_nacimiento = dateString;
        setFlag(true);
        // console.log('Formatted Selected Time: ', dateString);
    }

    const onSelect = (value) =>{
        setType(value);
    }

    const normalize = (value, prevValue, prevValues) => value.toUpperCase();
    
    const title = (
        <span>
            <LinkButton onClick={() => navigate(-1)}>
                <ArrowLeftOutlined style={{color:'orange',marginRight: 10, fontSize:20}}/>
            </LinkButton>
            <span>{isUpdate? 'Modificar Empleado':'Registrar Empleado'}</span>
        </span>
    )
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
                <Input placeholder='Introduzca sus nombres'/>
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
                <Input placeholder='Introduzca M para masculino, F para femenino'/>
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
            <Item
            label="Cargo" name="tipo"
            initialValue={emply.tipo === 'A'? 'A':emply.tipo === 'M'? 'M':'C'}
            rules={[
                {required: true,message: 'Seleccione un tipo!',},
            ]}
        >
            <Select onSelect={onSelect} placeholder="Seleccione un tipo" disabled={isUpdate}>
                <Option value="A">Administrativo</Option>
                <Option value="C">Cocinero</Option>
                <Option value="M">Mesero</Option>
            </Select>
         </Item>
         {
                type === 'M'? 
                    <Item label='Nro'
                    name="nro"
                    initialValue={emp.nro}
                    rules={[
                        {required:true, message:'Introducir el nro del mesero'},
                        {pattern:/^[1-9]\d*$/,message:'solo se permiten numeros'},
                        // {max:4,message:'solo se permiten hasta 4 digitos'}
                    ]}
                    >
                        <Input type='number' placeholder='Introduzca el nro del mesero'/>
                    </Item>
                :
                type === 'A'?
                    <Item label='Codigo'
                    name="codigo"
                    initialValue={emp.codigo}
                    rules={[
                        {required:true, message:'Introducir el codigo del administrativo'},
                        {pattern:/^[1-9]\d*$/,message:'solo se permiten numeros'},
                    ]}
                    >
                        <Input type='number' placeholder='Introduzca el codigo del administrativo'/>
                    </Item>
                :
                <Item label='Puesto'
                name="puesto"
                initialValue={emp.puesto}
                rules={[
                    {required:true, message:'Introducir el puesto del cocinero'},
                ]}
                normalize={normalize}
                >
                    <Input placeholder='Introduzca el puesto del cocinero'/>
                </Item>
          }
          <Item label='Sueldo'
                name="sueldo"
                initialValue={Persona.telefono}
                rules={[
                    {required:true, message:'Introducir su sueldo'},
                    {pattern:/^[1-9]\d*$/,message:'solo se permiten numeros'},
                ]}
                >
                <Input type='number' placeholder='Introduzca su sueldo'/>
            </Item>
            <Item label='Hora de Llegada'
                name="hora_llegada"
                initialValue={emply.hora_llegada}
                rules={[
                    {required:true, message:'Introducir la hora de llegada'},
                    {pattern:/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/,message:'hora invalida'},
                ]}
                >
                <Input placeholder='Introduzca la hora de llegada'/>
            </Item>
            <Item label='Hora de Salida'
                name="hora_salida"
                initialValue={emply.hora_salida}
                rules={[
                    {required:true, message:'Introducir la hora de salida'},
                    {pattern:/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/,message:'hora invalida'},
                ]}
                >
                <Input placeholder='Introduzca la hora de salida'/>
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
                <Input placeholder='Introduzca su email'/>
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
