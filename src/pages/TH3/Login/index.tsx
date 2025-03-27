import { useState } from 'react';
import { useHistory } from 'umi';
import { Button, Input, Form, Select } from 'antd';

const Login = () => {
  const history = useHistory();
  const [role, setRole] = useState('customer');

  const handleLogin = (values: { username: string; password: string }) => {
    localStorage.setItem('role', role); // Lưu quyền vào localStorage
    if (role === 'admin') {
      history.push('/admin');
    } else {
      history.push('/booking');
    }
  };

  return (
    <Form onFinish={handleLogin} layout="vertical">
      <Form.Item label="Tên đăng nhập" name="username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Mật khẩu" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item label="Vai trò">
        <Select value={role} onChange={setRole}>
          <Select.Option value="customer">Khách hàng</Select.Option>
          <Select.Option value="admin">Admin</Select.Option>
        </Select>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Đăng nhập
      </Button>
    </Form>
  );
};

export default Login;
