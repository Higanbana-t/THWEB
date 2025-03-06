import React, { useEffect, useState } from 'react';
import { Modal, Input, DatePicker } from 'antd';
import moment from 'moment';

interface Task {
  id?: number;
  text: string;
  date?: string;
}

interface TaskFormProps {
  visible: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  initialTask?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ visible, onClose, onSave, initialTask }) => {
  const [text, setText] = useState('');
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);

  useEffect(() => {
    if (initialTask) {
      setText(initialTask.text);
      setSelectedDate(initialTask.date ? moment(initialTask.date) : null);
    } else {
      setText('');
      setSelectedDate(null);
    }
  }, [initialTask, visible]);

  const handleSubmit = () => {
    if (text.trim()) {
      onSave({ id: initialTask?.id, text, date: selectedDate ? selectedDate.format('YYYY-MM-DD') : undefined });
      onClose();
    }
  };

  return (
    <Modal
      title={initialTask ? 'Edit Task' : 'Add Task'}
      visible={visible}
      onOk={handleSubmit}
      onCancel={onClose}
      okText="Save"
    >
      <Input
        placeholder="Enter task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onPressEnter={handleSubmit}
      />
      <DatePicker
        style={{ width: '100%', marginTop: 10 }}
        value={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
    </Modal>
  );
};

export default TaskForm;
