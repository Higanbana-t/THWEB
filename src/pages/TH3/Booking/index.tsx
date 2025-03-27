import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, TimePicker, message } from 'antd';
import dayjs from 'dayjs';
import useBookingModel from '@/models/booking';
import type { IAppointment, IService, IStaff } from '@/services/BookingSystem/types';

const services: IService[] = [
  { id: '1', name: 'Cắt tóc nam', price: 150000, duration: 30 },
  { id: '2', name: 'Gội đầu', price: 100000, duration: 20 },
];

const staff: IStaff[] = [
  { id: '1', name: 'Anh Tuấn', maxCustomersPerDay: 5, workingHours: [{ dayOfWeek: 1, startTime: '09:00', endTime: '17:00' }], services: ['1'] },
  { id: '2', name: 'Chị Linh', maxCustomersPerDay: 4, workingHours: [{ dayOfWeek: 3, startTime: '10:00', endTime: '18:00' }], services: ['2'] },
];

export default function BookingPage() {
  const { appointments, addAppointment } = useBookingModel();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [filteredStaff, setFilteredStaff] = useState<IStaff[]>(staff);

  // Hiển thị form đặt lịch
  const showModal = () => setVisible(true);

  // Đóng form đặt lịch
  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  // Khi chọn dịch vụ, lọc danh sách nhân viên phù hợp
  const handleServiceChange = (serviceId: string) => {
    const availableStaff = staff.filter((s) => s.services.includes(serviceId));
    setFilteredStaff(availableStaff);
    form.setFieldsValue({ staff: undefined });
  };

  // Xử lý đặt lịch
  const handleBooking = async (values: any) => {
    setLoading(true);
    try {
      if (!values.date || !values.time) {
        message.error('Vui lòng chọn ngày và giờ hợp lệ!');
        return;
      }

      const appointment: IAppointment = {
        id: String(Date.now()),
        customerId: 'guest',
        customerName: values.name,
        customerPhone: values.phone,
        serviceId: values.service,
        staffId: values.staff,
        date: values.date.format('YYYY-MM-DD'),
        time: values.time.format('HH:mm'),
        status: 'pending',
        createdAt: dayjs().format(),
      };

      addAppointment(appointment);
      message.success('Lịch hẹn đã được đặt thành công!');
      handleCancel();
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '20px auto', padding: 20, background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2>Quản lý Lịch Hẹn</h2>

      {/* Nút mở form đặt lịch */}
      <Button type="primary" onClick={showModal} style={{ marginBottom: 20 }}>
        Đặt lịch mới
      </Button>

      {/* Bảng danh sách lịch hẹn */}
      <Table
        dataSource={appointments}
        rowKey="id"
        columns={[
          { title: 'Khách hàng', dataIndex: 'customerName' },
          { title: 'Dịch vụ', dataIndex: 'serviceId', render: (id) => services.find((s) => s.id === id)?.name },
          { title: 'Nhân viên', dataIndex: 'staffId', render: (id) => staff.find((s) => s.id === id)?.name },
          { title: 'Ngày', dataIndex: 'date' },
          { title: 'Giờ', dataIndex: 'time' },
          { title: 'Trạng thái', dataIndex: 'status' },
        ]}
      />

      {/* Modal đặt lịch */}
      <Modal title="Đặt Lịch Hẹn" visible={visible} onCancel={handleCancel} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleBooking}>
          <Form.Item name="name" label="Tên khách hàng" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
            <Input placeholder="Nhập tên của bạn" />
          </Form.Item>

          <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item name="service" label="Chọn dịch vụ" rules={[{ required: true, message: 'Vui lòng chọn dịch vụ' }]}>
            <Select placeholder="Chọn dịch vụ" onChange={handleServiceChange}>
              {services.map((s) => (
                <Select.Option key={s.id} value={s.id}>
                  {s.name} - {s.price.toLocaleString()}đ
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="staff" label="Chọn nhân viên" rules={[{ required: true, message: 'Vui lòng chọn nhân viên' }]}>
            <Select placeholder="Chọn nhân viên">
              {filteredStaff.map((s) => (
                <Select.Option key={s.id} value={s.id}>
                  {s.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="date" label="Chọn ngày" rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="time" label="Chọn giờ" rules={[{ required: true, message: 'Vui lòng chọn giờ' }]}>
            <TimePicker format="HH:mm" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Xác nhận đặt lịch
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
