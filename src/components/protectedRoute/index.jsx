import { Navigate } from 'react-router-dom'
import storageUtils from '../../utils/storageUtils'

export default function ProtectedRoute({children, isAllowed,auth}) {
   //obtener token, tipo de usuario y menu de navigacion
  const {token,id_tipo_usuario,menu} = storageUtils.getUser()
  
  if (token) {
   //si existe token
    if(id_tipo_usuario === isAllowed ||menu.includes(auth))
      return <>{children}</>
    else
      return <h2 style={{fontSize:30}}> Protected Page: authenticated user required </h2>
  }
  else {
    //redirect to login
    return <Navigate to='/login'/>
  }
}
