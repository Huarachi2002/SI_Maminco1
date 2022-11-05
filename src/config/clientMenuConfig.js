import { AppstoreOutlined, MailOutlined, SettingOutlined  } from '@ant-design/icons';

const items = [
    {
      label: 'Perfil',
      key: true,
      icon: <MailOutlined />,
      children: [
        {
          label: 'Datos Personales',
          key:'/client',
          icon:<MailOutlined/>
        },
        {
          label: 'Cambiar Contraseña',
          key:'/client/pwd',
          icon:<MailOutlined/>
        },
      ]
    },
    {
      label: 'Menu',
      key: '/client/menu',
      icon: <AppstoreOutlined />,
    },
    {
      label: 'Pedidos',
      key: '/client/pedido',
      icon: <SettingOutlined />,
    },
    {
        label: 'Reserva',
        key: '/client/reserva',
        icon: <SettingOutlined />,
      },
];

export default items