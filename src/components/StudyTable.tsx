import React, { useState } from 'react';
import { Table, Tag, Button, Popconfirm, Form, Input, DatePicker, InputNumber, Checkbox } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

interface StudyLog {
  id: number;
  dateTime: string; // Ngày và giờ học
  duration: number;
  content: string;
  notes?: string;
  completed: boolean; // Thêm trạng thái hoàn thành
}

interface StudyTableProps {
  studyLogs: StudyLog[];
  onUpdateLog: (updatedLog: StudyLog) => void;
  onDeleteLog: (id: number) => void;
}

const StudyTable: React.FC<StudyTableProps> = ({ studyLogs, onUpdateLog, onDeleteLog }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form] = Form.useForm();

  const handleEdit = (record: StudyLog) => {
    setEditingId(record.id);
    form.setFieldsValue({
      dateTime: dayjs(record.dateTime),
      duration: record.duration,
      content: record.content,
      notes: record.notes,
    });
  };

  const saveEdit = async () => {
    try {
      const values = await form.validateFields();
      onUpdateLog({
        id: editingId!,
        dateTime: values.dateTime.format("YYYY-MM-DD HH:mm"),
        duration: values.duration,
        content: values.content,
        notes: values.notes,
        completed: studyLogs.find(log => log.id === editingId)?.completed || false, // Giữ trạng thái hoàn thành
      });
      setEditingId(null);
    } catch (err) {
      console.log("Validation Failed:", err);
    }
  };

  const toggleCompleted = (id: number, completed: boolean) => {
    const updatedLog = studyLogs.find(log => log.id === id);
    if (updatedLog) {
      onUpdateLog({ ...updatedLog, completed });
    }
  };

  const columns: ColumnsType<StudyLog> = [
    {
      title: "Ngày & Giờ học",
      dataIndex: "dateTime",
      key: "dateTime",
      render: (text, record) =>
        editingId === record.id ? (
          <Form.Item name="dateTime">
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>
        ) : (
          dayjs(text).format("YYYY-MM-DD HH:mm") // Hiển thị ngay từ đầu
        ),
    },
    {
      title: "Thời lượng (giờ)",
      dataIndex: "duration",
      key: "duration",
      render: (text, record) =>
        editingId === record.id ? (
          <Form.Item name="duration">
            <InputNumber min={1} />
          </Form.Item>
        ) : (
          text
        ),
    },
    {
      title: "Nội dung học",
      dataIndex: "content",
      key: "content",
      render: (text, record) =>
        editingId === record.id ? (
          <Form.Item name="content">
            <Input />
          </Form.Item>
        ) : (
          text
        ),
    },
    {
      title: "Ghi chú",
      dataIndex: "notes",
      key: "notes",
      render: (text, record) =>
        editingId === record.id ? (
          <Form.Item name="notes">
            <Input />
          </Form.Item>
        ) : (
          text || "Không có"
        ),
    },

    {
      title: "Hành động",
      key: "action",
      render: (_, record) =>
        editingId === record.id ? (
          <span>
            <Button type="link" onClick={saveEdit}>Lưu</Button>
            <Button type="link" onClick={() => setEditingId(null)}>Hủy</Button>
          </span>
        ) : (
          <span>
            <Button type="link" onClick={() => handleEdit(record)}>Sửa</Button>
            <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => onDeleteLog(record.id)}>
              <Button type="link" danger>Xóa</Button>
            </Popconfirm>
          </span>
        ),
    },
  ];
  

  return (
    <Form form={form} component={false}>
      <Table dataSource={studyLogs} columns={columns} rowKey="id" pagination={false} bordered />
    </Form>
  );
};

export default StudyTable;
