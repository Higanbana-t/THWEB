import React from 'react';
import { Form, Input, InputNumber, Select, Button, Modal } from 'antd';
import { useModel } from 'umi';
import { RoomType } from '../../services/GK/typings';

const { Option } = Select;

interface RoomFormProps {
  visible: boolean;
}

const RoomForm: React.FC<RoomFormProps> = ({ visible }) => {
    const { form, setForm, saveRoom, closeModal, isEdit } = useModel('useRoomModel');
  
    const handleOk = () => {
      saveRoom(); // Lưu phòng học
    };
  
    const handleCancel = () => {
      closeModal(); // Đóng modal
    };
  
    return (
      <Modal
        title={isEdit ? 'Chỉnh sửa phòng học' : 'Thêm phòng học'} // Tiêu đề thay đổi tùy vào chế độ
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={form} // Giữ giá trị form ban đầu
          onFinish={handleOk}
        >
          <Form.Item
            label="Mã phòng"
            name="code"
            rules={[{ required: true, message: 'Vui lòng nhập mã phòng!' }]}>
            <Input
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })} // Cập nhật code
            />
          </Form.Item>
  
          <Form.Item
            label="Tên phòng"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên phòng!' }]}>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} // Cập nhật name
            />
          </Form.Item>
  
          <Form.Item
            label="Số chỗ ngồi"
            name="seats"
            rules={[{ required: true, message: 'Vui lòng nhập số chỗ ngồi!' }]}>
            <InputNumber
              min={10}
              max={200}
              value={form.seats}
              onChange={(value) => setForm({ ...form, seats: value ?? 0 })} // Cập nhật seats
            />
          </Form.Item>
  
          <Form.Item
            label="Loại phòng"
            name="type"
            rules={[{ required: true, message: 'Vui lòng chọn loại phòng!' }]}>
            <Select
              value={form.type}
              onChange={(value) => setForm({ ...form, type: value })} // Cập nhật type
            >
              {Object.values(RoomType).map((type) => (
                <Option key={type} value={type}>
                  {type} {/* Hiển thị tên loại phòng */}
                </Option>
              ))}
            </Select>
          </Form.Item>
  
          <Form.Item
            label="Người phụ trách"
            name="manager">
            <Input
              value={form.manager}
              onChange={(e) => setForm({ ...form, manager: e.target.value })} // Cập nhật manager
            />
          </Form.Item>
  
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  

export default RoomForm;
