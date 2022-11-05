import { ajax, ajaxToken } from "./ajax";
const BASE = 'http://127.0.0.1:80';
//login
export const reqLogin = (nombre_usuario,contraseña)=>{return ajax(BASE+'/api/login', {nombre_usuario,contraseña},'POST')}
//enviar codigo de verificacion al correo del usuario
export const reqVerCode = (nombre_usuario) => ajax(BASE+'/api/email',{nombre_usuario})
// cambiar contrasena
export const reqChangePwd = (user) =>ajax(BASE+'/api/change',user,'POST')

//register user
export const reqRegUser = (user) => ajaxToken('admin/usuario/reg',user,'POST')

//obtener lista de productos
export const reqListProducts = () => ajaxToken('admin/producto')
//anadir un nuevo producto
export const reqAddProducts = (product) => ajaxToken('admin/producto/addProduct',product,'POST')
//modificar un producto existente
export const reqUpdateProducts = (product) => ajaxToken('admin/producto/updateProduct',product,'POST')
//eliminar(set eliminado = true) un producto 
export const reqDeleteProduct = (codigo) => ajaxToken(`admin/producto/deleteProduct/${codigo}`)
//buscar un producto
export const reqSearchProduct = (busqueda) => ajaxToken('admin/producto/search',{busqueda})

// obtener lista de users
export const reqListUsers = () => ajaxToken('admin/usuario')
//eliminar  users definitivamente
export const reqDeleteUser = (nombre_usuario) => ajaxToken(`admin/usuario/deleteUser/${nombre_usuario}`)
// buscar usuario segun username, nombres, apellidos
export const reqSearchUser = (busqueda) => ajaxToken('admin/usuario/search',{busqueda})

// obtener lista de clients
export const reqListClients = () => ajaxToken('admin/cliente')
//modificar un cliente
export const reqUpdateClient = (client) => ajaxToken('admin/cliente/updateClient',client,'POST')
//anadir un cliente
export const reqAddClient = (client) => ajaxToken('admin/cliente/regClient',client,'POST')
// buscar un cliente segun su nombres/apellidos
export const reqSearchClient = (busqueda) => ajaxToken('admin/cliente/search',{busqueda})

//obtener lista de empleados
export const reqListEmp = () => ajaxToken('admin/empleado')
// modificar datos de un empleado
export const reqUpdateEmp = (emp)=>ajaxToken('admin/empleado/updateEmployee',emp,'POST')
// registrar  un empleado
export const reqRegEmp = (emp)=>ajaxToken('admin/empleado/regEmployee',emp,'POST')
//eliminar(set eliminado = true) un empleado
export const reqDeleteEmp = (id_empleado) => ajaxToken(`admin/empleado/deleteEmployee/${id_empleado}`)
//buscar un empleado segun sus nombres o apellidos
export const reqSearchEmp = (busqueda)=>ajaxToken('admin/empleado/search',{busqueda})

// obtener lista de roles
export const reqListRoles = ()=>ajaxToken('admin/rol')
//crear un nuevo tipo de usuario
export const reqAddRole = (descripcion) => ajaxToken('admin/rol/addRole',{descripcion},'POST')
//actualizar permisos
export const reqUpdateRole = (role) =>ajaxToken('admin/rol/updateRole',{...role},'POST')


//obtener info del usuario cliente para perfil
export const reqClientInfo = (id_persona)=>ajaxToken('client/perfil/info',{id_persona})
export const reqUpdateClientInfo = (client) => ajaxToken('client/perfil/updateInfo',client,'POST')
export const reqChangePwdC = (user) => ajaxToken('client/perfil/changePwd',user,'POST') 