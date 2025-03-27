import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, InputNumber, Select } from 'antd';

interface StudyFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (name: string, log: { date: string; duration: number; content: string }) => void;
}

const predefinedSubjects = ["Toán", "Văn", "Anh", "Khoa học", "Công nghệ"];

const StudyForm: React.FC<StudyFormProps> = ({ visible, onClose, onSubmit }) => {
  const [form] = Form.useForm();
  const [customSubject, setCustomSubject] = useState("");

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const { subject, customSubject, date, duration, content } = values;
        const finalSubject = subject === "Khác" ? customSubject : subject;

        onSubmit(finalSubject, { date: date.format("YYYY-MM-DD"), duration, content });
        form.resetFields();
        onClose();
      })
      .catch((errorInfo) => {
        console.log('Validation Failed:', errorInfo);
      });
  };

  return (
    <Modal title="Thêm môn học" visible={visible} onCancel={onClose} onOk={handleOk}>
      <Form form={form} layout="vertical">
        <Form.Item name="subject" label="Môn học" rules={[{ required: true, message: 'Chọn môn học!' }]}>
          <Select onChange={(value) => setCustomSubject(value === "Khác" ? "" : value)}>
            {predefinedSubjects.map((subject) => (
              <Select.Option key={subject} value={subject}>{subject}</Select.Option>
            ))}
            <Select.Option value="Khác">Khác</Select.Option>
          </Select>
        </Form.Item>

        {customSubject === "" && (
          <Form.Item name="customSubject" label="Nhập môn học khác">
            <Input />
          </Form.Item>
        )}

        <Form.Item name="date" label="Ngày học" rules={[{ required: true, message: 'Chọn ngày học!' }]}>
          <DatePicker />
        </Form.Item>

        <Form.Item name="duration" label="Thời lượng học (giờ)" rules={[{ required: true, message: 'Nhập thời lượng!' }]}>
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item name="content" label="Nội dung học" rules={[{ required: true, message: 'Nhập nội dung!' }]}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StudyForm;
