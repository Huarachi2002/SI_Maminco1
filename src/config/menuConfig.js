import {
    HomeOutlined,
    // MailOutlined,
    PieChartOutlined,
    createFromIconfontCN,
  } from '@ant-design/icons';
  const IconFont = createFromIconfontCN({
    scriptUrl: [
      '//at.alicdn.com/t/c/font_3697055_omb029z3ib.js',
    ],
  });
const menuList = [
    {
      title: 'Inicio', 
      key: '/admin', 
      icon: <HomeOutlined />, 
    },
    {
      title: 'Gestión de Producto',
      key: '/admin/producto',
      icon: <IconFont type="icon-product"/>,
    },
    {
      title: 'Gestión de menu',
      key: '/admin/menu',
      icon: <PieChartOutlined />,
    },
    {
      title: 'Gestión de Mesa',
      key: '/admin/mesa',
      icon: <PieChartOutlined />
    },
    {
      title: 'Gestión de Usuario',
      key: '/admin/usuario',
      icon: <PieChartOutlined />,
    },
  
    {
      title: 'Gestión de Persona',
      key: true,
      icon: <PieChartOutlined />,
      children: [
        {
          title: 'Empleado',
          key: '/admin/empleado',
          icon: <PieChartOutlined />
        },
        {
          title: 'Cliente',
          key: '/admin/cliente',
          icon: <PieChartOutlined />
        },
      ]
    },
    {
      title: 'Gestión de rol',
      key: '/admin/role',
      icon: <PieChartOutlined />,
    },
]
  
export default menuList
