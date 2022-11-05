import Login from "../pages/login";
import Admin from "../pages/admin";

import { Navigate } from "react-router-dom";
import ProtectedRoute from "../components/protectedRoute";
import Client from "../pages/admin/person/client";
import Home from '../pages/admin/home';
import Product from '../pages/admin/product';
import User from '../pages/admin/user';
import Table from '../pages/admin/table';
import ProductHome from "../pages/admin/product/home";
import AddUpdate from "../pages/admin/product/add-update";
import Employee from "../pages/admin/person/employee";
import EmployeeHome from "../pages/admin/person/employee/home";
import EmpDetail from "../pages/admin/person/employee/detail";
import EmpAddUpdate from "../pages/admin/person/employee/addupdate";
import PersonClientHome from "../pages/admin/person/client/home";
import ClDetail from "../pages/admin/person/client/detail";
import ClAddUpdate from "../pages/admin/person/client/addupdate";
import ClientPage from "../pages/client";
import Role from "../pages/admin/role";
import Password from "../pages/login/password";
import Menu from "../pages/admin/menu";
import ClientInfo from "../pages/client/perfil/client-info";
import ChangePwd from "../pages/client/perfil/change-pwd";
import UpdateInfo from "../pages/client/perfil/update-form";
import CMenu from "../pages/client/menu";
import CPedido from '../pages/client/pedido'
import CReserva from '../pages/client/reserva'

const admin = '/admin'
const mesa = '/admin/mesa'
const producto = '/admin/producto'
const usuario = '/admin/usuario'
const empleado = '/admin/empleado'
const cliente = '/admin/cliente'
const role = '/admin/role'
const menu = '/admin/menu'

const r = [
    {
        path:'/login',
        element:<Login/>,
    },
    {
        path:'/login/password',
        element:<Password/>,
    },
    {
        path:'/admin',
        element:<ProtectedRoute isAllowed={1} auth={admin}><Admin/></ProtectedRoute>,
        children:[
            {
              index:true,
              element:<ProtectedRoute isAllowed={1} auth={admin}><Home/> </ProtectedRoute>
            },
            {
                path:'mesa',
                element:<ProtectedRoute isAllowed={1} auth={mesa}><Table/> </ProtectedRoute>
            },
            {
                path:'producto',
                element:<ProtectedRoute isAllowed={1} auth={producto}><Product/></ProtectedRoute>,
                children:[
                    {
                        index:true,
                        element:<ProtectedRoute isAllowed={1} auth={producto}><ProductHome/></ProtectedRoute>
                    },
                    {
                        path:'addupdate',
                        element:<ProtectedRoute isAllowed={1} auth={producto}><AddUpdate/></ProtectedRoute>
                    }
                ]
            },
            {
                path:'usuario',
                element:<ProtectedRoute isAllowed={1} auth={usuario}><User/></ProtectedRoute>
            },
            {
                path:'cliente',
                element:<ProtectedRoute isAllowed={1} auth={cliente}><Client /></ProtectedRoute>,
                children:[
                    {
                        index:true,
                        element:<ProtectedRoute isAllowed={1} auth={cliente}><PersonClientHome/></ProtectedRoute>
                    },
                    {
                        path:'detalles',
                        element:<ProtectedRoute isAllowed={1} auth={cliente}><ClDetail/></ProtectedRoute>,
                    },
                    {
                        path:'modreg',
                        element:<ProtectedRoute isAllowed={1} auth={cliente}><ClAddUpdate/></ProtectedRoute>
                    },

                ]
            },
            {
                path:'empleado',
                element:<ProtectedRoute isAllowed={1} auth={empleado}><Employee/></ProtectedRoute>,
                children:[
                    {
                        index:true,
                        element:<ProtectedRoute isAllowed={1} auth={empleado}><EmployeeHome/></ProtectedRoute>
                    },
                    {
                        path:'detalles',
                        element:<ProtectedRoute isAllowed={1} auth={empleado}><EmpDetail/></ProtectedRoute>,
                    },
                    {
                        path:'modreg',
                        element:<ProtectedRoute isAllowed={1} auth={empleado}><EmpAddUpdate/></ProtectedRoute>
                    },

                ]
            },
            {
                path:'menu',
                element:<ProtectedRoute isAllowed={1} auth={menu}><Menu/></ProtectedRoute>,
            },
            {
                path:'role',
                element:<ProtectedRoute isAllowed={1} auth={role}><Role/></ProtectedRoute>,
            }
            
        ]
    },
    {
        path:'/client',
        element:<ProtectedRoute isAllowed={3}><ClientPage/></ProtectedRoute>,
        children:[
            {
                index:true,
                element:<ProtectedRoute isAllowed={3}> <ClientInfo/> </ProtectedRoute>
            },
            {
                path:'pwd',
                element:<ProtectedRoute isAllowed={3}> <ChangePwd/> </ProtectedRoute>
            },
            {
                path:'editar',
                element:<ProtectedRoute isAllowed={3}> <UpdateInfo/> </ProtectedRoute>
            },
            {
                path:'menu',
                element:<ProtectedRoute isAllowed={3}> <CMenu/> </ProtectedRoute>
            },
            {
                path:'pedido',
                element:<ProtectedRoute isAllowed={3}> <CPedido/> </ProtectedRoute>
            },
            {
                path:'reserva',
                element:<ProtectedRoute isAllowed={3}> <CReserva/> </ProtectedRoute>
            },
        ]
    },
    {
        path:'/',
        element:<Navigate to="/login"/>
    },
    {
        path:'/admin/',
        element:<Navigate to="/admin/"/>
    },
    {
        path:'/admin/empleado/',
        element:<Navigate to="/admin/empleado"/>
    },
    {
        path:'/admin/cliente/',
        element:<Navigate to="/admin/cliente"/>
    },
    {
        path:'/admin/producto/',
        element:<Navigate to="/admin/producto"/>
    },
    {
        path:'*',
        element:<div style={{textAlign:'center'}}>
                    <p style={{fontSize:60, fontWeight:"bold",marginBottom:0}}>404</p>
                    <p style={{fontSize:30, fontWeight:"bold",marginBottom:0}}>Page not found</p>
                    <p style={{fontSize:20,marginBottom:0}}>We're sorry, the page you requested could not be found. Please go back to the homepage.</p>
                </div>
    }
]

export default r;

