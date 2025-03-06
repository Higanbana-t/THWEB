import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';

interface AddSubjectFormProps {
  onAddSubject: (subject: { id: number; name: string; goal: number }) => void;
}

const AddSubjectForm: React.FC<AddSubjectFormProps> = ({ onAddSubject }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    const newSubject = {
      id: Date.now(),
      name: values.name,
      goal: values.goal,
    };
    onAddSubject(newSubject);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="name" label="Tên môn học" rules={[{ required: true, message: 'Vui lòng nhập tên môn học!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="goal" label="Mục tiêu học (giờ/tháng)" rules={[{ required: true }]}>
        <InputNumber min={1} />
      </Form.Item>
      <Button type="primary" htmlType="submit">Thêm môn học</Button>
    </Form>
  );
};

export default AddSubjectForm;
