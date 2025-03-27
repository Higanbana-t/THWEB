import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'umi';

const { Header, Content } = Layout;

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="home">
            <Link to="/">Trang chủ</Link>
          </Menu.Item>
          <Menu.Item key="Booking">
            <Link to="/booking">Đặt lịch</Link>
          </Menu.Item>
          <Menu.Item key="admin">
            <Link to="/admin">Admin</Link> {/* Chỉ admin mới vào được */}
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '24px' }}>{children}</Content>
    </Layout>
  );
};

export default PublicLayout;
