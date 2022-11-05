import { Form, Input } from 'antd'
import React, { forwardRef, useImperativeHandle } from 'react'

const {Item} = Form

const AddQuantity = forwardRef((props,ref) => {
    const [form] = Form.useForm()

    useImperativeHandle(ref,()=> ({
        form,
    }))
    
    const checkQuantity =(_, value) => {
        if (value <= 0) {
            return Promise.reject(new Error('Cantidad debe ser mayor que 0!'));
        }else if(!/^[1-9]\d*$/.test(value)) {
            return Promise.reject(new Error('Cantidad debe ser un numero entero!'));
        }
    };
  return (
    <Form 
        form={form}
        labelCol
        initialValues={{cantidad:0}}
    >
        <Item name='cantidad' label='Cantidad'
            rules={[
                {required:true, message:'Introduzca la cantidad'},
                {validator:checkQuantity}
               ]}
            >
            <Input type='number' placeholder='Introduzca la cantidad que deseas anadir' />
        </Item>
    </Form>
  )
})

export default AddQuantity
