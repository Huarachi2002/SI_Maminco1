import React, { useRef } from 'react'
import {
    Button,
    Card,
    Form,
    Input,
    message,
} from 'antd'

import storageUtils from '../../../utils/storageUtils'
import { reqChangePwdC } from '../../../api';

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

export default function ChangePwd() {

    const form = useRef()

    const onFinish = async (fieldsValue) =>{
        fieldsValue.nombre_usuario = storageUtils.getUser().nombre_usuario;
        // console.log(fieldsValue)
        const response = await reqChangePwdC(fieldsValue)
        
        const result = response.data
        if(result.status === 0){
            message.success(result.msg)
            form.current.resetFields()
        }else{
            message.error(result.msg)
        }
        // console.log(fieldsValue)
        
    }
     
    const title = (
            <span>Cambiar Contraseña</span>
    )
    
  return (
    <Card title={title}>
        <Form  {...layout} ref={form} labelWrap onFinish={onFinish}>
            
            <Item label={<label style={{ color: "white" }}>Contraseña Actual</label>}
                name="contraseña"
                rules={[
                    {required:true,message:'Introducir la contraseña actual'},
                ]}
            >
                <Input.Password placeholder='Introduzca la contraseña actual'/>
            </Item>

            <Item label={<label style={{ color: "white" }}>Nueva Contraseña</label>}
                name="nuevaContraseña"
                rules={[
                    {required:true,message:'Introducir la contraseña'},
                    {min:8, message:'Usa 8 caracteres como mínimo para la contraseña'},
                    {max:30,message:'Usa 30 caracteres como maximo para la contraseña'},
                    {pattern:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,30}$/,
                    message:'La contraseña debe tener al menos una letra y un numero.Solo se permiten letras(a-z), números(0-9) y simbolos como @$!%*#?& '}
                ]}
                hasFeedback
            >
                <Input.Password placeholder='La contraseña debe tener al menos una letra y un numero.'/>
            </Item>
            <Item label={<label style={{ color: "white" }}>Confirmar Contraseña</label>}
                name="confirm"
                dependencies={['nuevaContraseña']}
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
                <Input.Password placeholder='Vuelva a escribir la nueva contaseña'/>
            </Item>
        
            <Item {...tailLayout}>
                <Button type='primary'  htmlType="submit" >
                    Cambiar Contraseña
                </Button>
            </Item>
        </Form>
    </Card>
  )
}





