import axios from 'axios'
import storageUtils from '../utils/storageUtils'
import { Button, notification } from 'antd';

const instance = axios.create({
  baseURL: 'http://127.0.0.1/',
  timeout: 5000
});

  const openNotification = (placement) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" 
            onClick={()=>{notification.close(key)
                    setTimeout(()=>{
                        window.location='/login'
                    },2000)}}
      >
        Ingresar nuevamente
      </Button>
    );
    notification.open({
      message: 'La sesión expiró',
      description:
        'Su sesión ha excedido el tiempo límite. Por favor, entre de nuevo.',
      placement,
      btn,
      key,
      onClose: () => {}
      
    });
  };

// request interceptor
instance.interceptors.request.use(config => {
    const {token} = storageUtils.getUser();
    if (token) 
        config.headers.Authorization = token;
    return config;
    }, 
    error => {
        return Promise.reject(error);
    }
);
 
// response interceptor
instance.interceptors.response.use(
    response => response, 
    ({response}) => {
        // console.log(response)
        const {status} = response
        if(status === 401){
            storageUtils.removeUser();
            openNotification('top')  
        }
        // return Promise.reject(response)  
    }
  
);
 
export default instance;
