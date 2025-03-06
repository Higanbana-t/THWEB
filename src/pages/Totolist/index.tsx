import React, { useState } from 'react';
import { useModel } from 'umi';
import { Card, Button, Row, Col } from 'antd';
import { CheckCircleTwoTone, DeleteTwoTone, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import TaskForm from './TaskForm';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  date?: string;
}

const TodoList: React.FC = () => {
  const { tasks, addTask, toggleComplete, deleteTask, editTask } = useModel('todo');
  const [formVisible, setFormVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddOrEdit = (task: { id?: number; text: string; date?: string }) => {
    if (task.id) {
      editTask(task.id, task.text, task.date);
    } else {
      addTask(task.text, task.date);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>

      {/* Nút mở form thêm công việc */}
      <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingTask(null); setFormVisible(true); }}>
        Add Task
      </Button>

      {/* Hiển thị danh sách công việc */}
      <Row gutter={[16, 16]} justify="center" style={{ marginTop: 20 }}>
        {tasks.map((task: Task) => (
          <Col key={task.id} span={8}>
            <Card
              title={task.completed ? '✅ Completed Task' : '📌 Task'}
              bordered
              actions={[
                <CheckCircleTwoTone key="complete" twoToneColor={task.completed ? '#52c41a' : '#ccc'} onClick={() => toggleComplete(task.id)} />,
                <EditTwoTone key="edit" onClick={() => { setEditingTask(task); setFormVisible(true); }} />,
                <DeleteTwoTone key="delete" onClick={() => deleteTask(task.id)} />,
              ]}
            >
              <p style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
              </p>
              {task.date && <p>📅 Due: {task.date}</p>}
            </Card>
          </Col>
        ))}
      </Row>

      {/* Form thêm/sửa công việc */}
      <TaskForm
        visible={formVisible}
        onClose={() => setFormVisible(false)}
        onSave={handleAddOrEdit}
        initialTask={editingTask ?? undefined}
      />
    </div>
  );
};

export default TodoList;
