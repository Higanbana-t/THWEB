import { useState, useEffect } from 'react';

export default function useTodoModel() {
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean; date?: string }[]>(() => {
    // Lấy dữ liệu từ localStorage khi khởi động
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    // Cập nhật localStorage khi danh sách công việc thay đổi
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string, date?: string) => {
    const newTasks = [...tasks, { id: Date.now(), text, completed: false, date }];
    setTasks(newTasks);
  };

  const editTask = (id: number, newText: string, newDate?: string) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, text: newText, date: newDate } : task)));
  };

  const toggleComplete = (id: number) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return { tasks, addTask, editTask, toggleComplete, deleteTask };
}
