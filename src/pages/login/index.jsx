import React, { useEffect } from "react";
import "./index.less";
import { useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input,message, Row } from "antd";
import { reqLogin } from "../../api";
import storageUtils from "../../utils/storageUtils";
import LinkButton from "../../components/link-button";
const {Item} = Form
export default function Login() {

  const  navigate = useNavigate()
  
  const onFinish = async (values) => {
    const {nombre_usuario,contraseña} = values
    
      // response is an Object, response.data = {status: , data/msg: }
      const response = await reqLogin(nombre_usuario,contraseña)

      const result = response.data

      if(result.status === 0){
        message.success('Inicio de sesión con éxito');
        //guardar datos del usuario 
        const user = result.data
        storageUtils.saveUser(user); // guardar en localStorage
        if(user.id_tipo_usuario !== 3){
          //redirect to path '/admin'
          navigate('/admin',{replace:true});
        }else{
          navigate('/client',{replace:true});
        }
        
      }else{
        message.error(result.msg);
      }
    
  }

  useEffect(()=>{
    let isAuth = storageUtils.getUser().token
    const {id_tipo_usuario} = storageUtils.getUser()
    if(isAuth){
      if(id_tipo_usuario !== 3){
        navigate('/admin')
      }else{
        navigate('/client')
      }
      
    }
  })
  const validateUser = async (_, value) => {
    if (!value) {
        throw new Error('Introducir un nombre usuario');
    } else if (value.length < 6 || value.length > 40) {
        throw new Error('Tu nombre de usuario debe tener entre 6 y 40 caracteres');
    }else if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
        throw new Error('Solo se permiten letras(a-z), números(0-9),subrayado(_) y guion(-)');
    }
  }

  const validatePwd = async (_, value) => {
    if (!value) {
        throw new Error('Introducir una contraseña');
    } else if (value.length < 8) {
        throw new Error('Usa 8 caracteres como mínimo para la contraseña');
    } else if (value.length > 30) {
        throw new Error('Usa 30 caracteres como maximo para la contraseña');
    } 
  }

  
  return (
    <div className="login">
      {/* <Row gutter={{xs:8,sm:16,md:24,lg:32}} wrap>
        <Col span={24}> */}
          <header className="login-header">
            <h1>Restaurante Maminco RestoBar</h1>
          </header>
        {/* </Col>
      </Row> */}
      <Row gutter={{xs:8,sm:16,md:24,lg:32}}>
      <Col span={7} offset={8}>
        <section className="login-content">
          <h2>Iniciar Sesión</h2>
          <Form name="normal_login" className="login-form" 
              onFinish={onFinish}>
            <Item
            name="nombre_usuario"
            rules={[
              {validator: validateUser}
            ]}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" style={{color:'rgba(0,0,0,.25)'}}/>}
                placeholder="Nombre de Usuario"
              />
            </Item>
            <Item
            name="contraseña" 
            rules={[
              {validator: validatePwd}
            ]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Contraseña"/>
            </Item>

            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Iniciar Sesión
              </Button>
            </Item>
            
            <Item>
              <LinkButton style={{color:'white'}} onClick={()=> navigate('/login/password')}>
                ¿Has olvidado tu contraseña?
              </LinkButton>  
            </Item>
          </Form>
        </section>
      </Col>
    </Row>
      
    </div>
  );
}

