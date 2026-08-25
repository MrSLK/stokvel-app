import { Outlet, Link, useLocation } from 'react-router-dom';
import { Layout as AntLayout, Button, Space, Menu } from 'antd';
import {
  PlusOutlined,
  TeamOutlined,
  DollarOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const { Header, Content } = AntLayout;

export default function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  // Determine active menu key from path
  const getActiveKey = () => {
    const path = location.pathname;
    if (path.startsWith('/stokvels')) return 'stokvels';
    if (path === '/create') return 'create';
    if (path === '/payments') return 'payments';
    return '';
  };

  return (
    <AntLayout className="min-h-screen">
      <Header className="flex items-center justify-between bg-white/80 backdrop-blur-md shadow-sm px-6 sticky top-0 z-50">
        <Link to="/" className="text-xl font-bold text-[#92400E]">
          StokvelApp
        </Link>

        {/* Navigation - only show when logged in and not on auth pages */}
        {user && !isAuthPage && (
          <Menu
            mode="horizontal"
            selectedKeys={[getActiveKey()]}
            className="flex-1 justify-center border-none bg-transparent"
          >
            <Menu.Item key="stokvels" icon={<TeamOutlined />}>
              <Link to="/stokvels">My Stokvels</Link>
            </Menu.Item>
            <Menu.Item key="create" icon={<PlusOutlined />}>
              <Link to="/create">Create Stokvel</Link>
            </Menu.Item>
            <Menu.Item key="payments" icon={<DollarOutlined />}>
              <Link to="/payments">My Payments</Link>
            </Menu.Item>
          </Menu>
        )}

        <Space>
          {user ? (
            <>
              <span className="text-[#78350F] font-medium hidden sm:inline">
                <UserOutlined className="mr-1" />
                {user.firstName}
              </span>
              <Button
                onClick={logout}
                icon={<LogoutOutlined />}
                className="border-[#D97706] text-[#D97706] hover:bg-[#FFF7ED]"
              >
                Logout
              </Button>
            </>
          ) : !isAuthPage ? (
            <>
              <Link to="/login">
                <Button type="text" className="text-[#78350F]">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  type="primary"
                  className="bg-[#D97706] hover:bg-[#B45309]"
                >
                  Get Started
                </Button>
              </Link>
            </>
          ) : null}
        </Space>
      </Header>

      <Content className={isAuthPage ? '' : 'max-w-6xl mx-auto w-full'}>
        <Outlet />
      </Content>
    </AntLayout>
  );
}