import React from 'react'
import {
    Form,
    Select,
    Input,
    Button,
    message
}from 'antd'
import { reqRegUser } from '../../../api';

const Item = Form.Item
const Option = Select.Option

const layout = {
    labelCol: {
      xs:{span:24},
      sm:{span:8},
    },
    wrapperCol: {
        xs:{span:24},
        sm:{span:16},
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

export default function Register (props){
    // console.log(props)
    const {roles} = props
    const validateUser = async (_, value) => {
        if (value.length < 6 || value.length > 40) {
            throw new Error('Tu nombre de usuario debe tener entre 6 y 40 caracteres');
        }else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            throw new Error('Solo se permiten letras(a-z), números(0-9) y subrayado(_)');
        }
      }

    const onFinish = async (values)=>{
        values.id_tipo_usuario = parseInt(values.id_tipo_usuario)
        values.id_persona = props.id_persona
        // console.log(values)
        const response = await reqRegUser(values);
        const result = response.data;
        if(result.status === 0){
            message.success(result.msg);
        }else{
            message.error(result.msg);
        }    
    }
    return (
        <Form  {...layout} onFinish={onFinish}>
            <Item label='Usuario'
                name="nombre_usuario"
                rules={[
                    {required:true, message:'Introducir el nombre usuario'},
                    {validator:validateUser},
                ]}
                >
                <Input placeholder='Introduzca el nombre de usuario'/>
            </Item>
            <Item label='Contraseña'
            name="contraseña"
            rules={[
                {required:true,message:'Introducir la contraseña'},
                {min:8, message:'Usa 8 caracteres como mínimo para la contraseña'},
                {max:30,message:'Usa 30 caracteres como maximo para la contraseña'},
                {pattern:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,30}$/,
                message:'La contraseña debe tener al menos una letra y un numero.Solo se permiten letras(a-z), números(0-9) y simbolos como @$!%*#?& '}
            ]}
            hasFeedback
        >
            <Input.Password placeholder='Introduzca la contraseña'/>
        </Item>
        <Item label='Confirmar Contraseña'
            name="confirm"
            dependencies={['contraseña']}
            hasFeedback
            rules={[
                {required:true,message:'Introducir la contraseña'},
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('contraseña') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('Las dos contraseñas introducidas no coinciden!'));
                    },
                }),
            ]}
        >
            <Input.Password placeholder='Vuelva a escribir la contaseña'/>
        </Item>
        <Item
            label="tipo" name="id_tipo_usuario"
            rules={[
                {required: true,message: 'Seleccione un tipo!',},
            ]}
        >
            <Select placeholder='Seleccione un tipo de usuario' value={undefined}>
                {
                    roles.map(roles => <Option key={roles.id_tipo} value={roles.id_tipo}> {roles.descripcion}</Option>)
                }
            </Select>
         </Item>
        <Item {...tailLayout}>
            <Button type='primary'  htmlType="submit" >
                Registrar
            </Button>
        </Item>
    </Form>
    )  
}
