import { Form, Input } from 'antd'
import React, { forwardRef, useImperativeHandle } from 'react'

const {Item} = Form

const AddRol = forwardRef((props,ref) => {
    const [form] = Form.useForm()

    useImperativeHandle(ref,()=> ({
        formFields: form,
    }))
    const normalize = (value, prevValue, prevValues) => value.toUpperCase();
  return (
    <Form 
        form={form}
        labelCol
        initialValues={{descripcion:''}}
    >
        <Item name='descripcion' label='Tipo de Usuario'
            rules={[
               {required:true,message:'Introducir el tipo de usuario'}
            ]}
            normalize={normalize}>
            <Input placeholder='Introduzca el tipo de usuario que desea crear' />
        </Item>
    </Form>
  )
})

export default AddRol
