import { 
    Form,
    Input,
    Button,
    message,
    Space,
    Row,
    Col,
} from 'antd'
import React, { useRef, useState } from 'react'
import {useNavigate } from 'react-router-dom';
import { reqChangePwd, reqVerCode } from '../../api';
const {Item} = Form

const layout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 15,
    },
};
const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
};

export default function Password() {
    const [nombre_usuario,setNombreUsuario] = useState('')
    const navigate = useNavigate()
    let btn = useRef()
   
    const onFinish = async(values)=>{
        // console.log(values)
        const response = await reqChangePwd(values)
        const result = response.data
        // console.log(result)
        if(result.status === 0){
            message.success(result.msg)
            setTimeout(()=>{
                navigate('/login')
            },2000) 
        }else{
            message.error(result.msg)
        }

    }
    const onChange =(e)=>{
        console.log(e.target.value)
        setNombreUsuario(e.target.value)
    }
    
    const onClick = async(e)=>{
        // console.log(btn)
        // console.log(e.target.innerHTML)
        btn.current.disabled = true
        let time = 60
        const tempor = setInterval(()=>{
            subs();
        },1000)
        const subs = ()=>{
            time--
            e.target.innerHTML ='Intente de nuevo después de '+time+' s'
            if(time === 0){
                clearInterval(tempor)
                e.target.innerHTML = 'Obtener Código'
                btn.current.disabled = false
            }

        } 
        const response = await reqVerCode(nombre_usuario)
        const result = response.data
        if(result.status === 0){
            message.success(result.msg);       
        }else{
            message.error(result.msg);
        }

    }

  return (
    <div className="login">

      <header className="login-header">
        <h1>Restaurante Maminco RestoBar</h1>
      </header>
      <Row>
        <Col span={10} offset={7}>
            <section className="pwd-content">
                <h2> Recuperar Contraseña </h2>
                    <Form  {...layout} name='form_pwd' labelWrap onFinish={onFinish}>
                        <Item label={<label style={{ color: "white" }}>Usuario</label>}
                            name="nombre_usuario"
                            rules={[
                                {required:true, message:'Introducir el nombre usuario'},
                                {min:6, message:'Tu nombre de usuario debe tener entre 6 y 40 caracteres'},
                                {max:40,message:'Tu nombre de usuario debe tener entre 6 y 40 caracteres'},
                                {pattern:/^[a-zA-Z0-9_]+$/,
                                    message:'Solo se permiten letras(a-z), números(0-9) y subrayado(_)',
                                }
                            ]}
                        >
                            <Input onChange={onChange} placeholder='Introduzca el nombre de usuario'/>
                        </Item>
                        <Item label={<label style={{ color: "white" }}>Código de Verificación</label>}>
                            <Space>
                                <Item 
                                    name='cod_verificacion'
                                    noStyle
                                    rules={[
                                        {required: true,message: 'Obten tu código de Verificación',},
                                    ]}
                                >
                                    <Input
                                        style={{width: 100,}}
                                    />
                                </Item>
                                <Button ref={btn} type="primary" 
                                    htmlType='button'
                                    disabled={false} onClick={onClick}
                                    style={{color:'white'}}>
                                    Obtener Código
                                </Button>
                            </Space>
                        </Item>
                        <Item label={<label style={{ color: "white" }}>Nueva Contraseña</label>}
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
                        <Item label={<label style={{ color: "white" }}>Confirmar Contraseña</label>}
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
                            <Input.Password placeholder='Vuelva a escribir la nueva contaseña'/>
                        </Item>
                    
                    <Item {...tailLayout}>
                        <Button type='primary'  htmlType="submit" >
                            Cambiar Contraseña
                        </Button>
                        <Button htmlType="button" style={{marginLeft:30}} onClick={()=>navigate('/login')}>
                            Cancelar
                        </Button>
                    </Item>
                </Form>    
            </section>
        </Col>
    </Row>
    </div>
  )
}
