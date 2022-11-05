import React, { forwardRef, useImperativeHandle, useState } from 'react'
import{
    Form,
    Input,
    Tree
}from 'antd'
import menuList from '../../../config/menuConfig'
const {Item} = Form

const layout = {
    labelCol: {
      xs:{span:24},
      sm:{span:7},
    },
    wrapperCol: {
        xs:{span:24},
        sm:{span:15},
    },
};

const AuthForm = forwardRef((props,_ref) => {
    const {role} = props
    const {menu} = role
    const [checkedKeys,setCheckedKeys] = useState(menu) 
    // console.log(role);
    let treeData = null
    const [prevRow, setPrevRow] = useState(null)
    const onCheck = (checkedKeys) => {
        // console.log('onCheck', checkedKeys);
        setCheckedKeys(checkedKeys);
    };

    const getDerivedStateFromProps = (row) =>{
        // console.log('row',row);
        // console.log('prerow',prevRow);
        if (row !== prevRow) {
            setCheckedKeys(row);
            setPrevRow(row);
        }
    }
    //proporcionar al componente padre Role el menu actualizado
    useImperativeHandle(_ref,()=>({
        getMenu,
        setMenu
    }))
    const getMenu = () => checkedKeys
    const setMenu = (menu) => {setCheckedKeys(menu)}
    
    // actualizar checkedKeys si se selecciono una nueva fila de rol
    getDerivedStateFromProps(menu);

    const getTreeData = (menuList) => {
        let newTreeData = []
        menuList.map((menu) =>{
            if(!menu.children){
                return newTreeData.push({title:menu.title,key:menu.key})
            }else{
                return newTreeData.push({title:menu.title,key:menu.key,children:getTreeData(menu.children)})
            }
        })
        return newTreeData
    }

    const setTree = ()=>{
        const data = getTreeData(menuList)
        treeData = [{
            title:'Permisos',
            key:'all',
            children:data
        }]
    }
    setTree()
  return (
    <Form {...layout} labelWrap>
        <Item label='nombre de rol' >
            <Input value={role.descripcion} disabled/>
        </Item>
        <Item>
            <Tree
                checkable
                defaultExpandAll
                checkedKeys={checkedKeys}
                // onSelect={onSelect}
                onCheck={onCheck}
                treeData={treeData}
            />
        </Item>
    </Form>
  )
})

export default AuthForm
