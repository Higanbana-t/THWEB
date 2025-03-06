import React, { useState } from 'react';
import { Button, Row, Col, Modal, Form, Input, InputNumber, List, Progress, Select } from 'antd';
import StudyCard from '@/components/StudyCard';
import StudyTable from '@/components/StudyTable';
import StudyForm from '@/components/StudyForm';

interface StudyLog {
  id: number;
  dateTime: string;
  duration: number;
  content: string;
  notes?: string;
}

interface SubjectData {
  name: string;
  logs: StudyLog[];
}

interface StudyGoal {
  subject?: string;
  targetHours: number;
}

const IndexPage: React.FC = () => {
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [selectedSection, setSelectedSection] = useState<'subjects' | 'progress' | 'goals'>('subjects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState<StudyGoal[]>([]);
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [goalForm] = Form.useForm();

  const handleAddStudy = (name: string, log: StudyLog) => {
    setSubjects((prev) => {
      const existingSubject = prev.find((subject) => subject.name === name);
      if (existingSubject) {
        return prev.map((subject) =>
          subject.name === name
            ? { ...subject, logs: [...subject.logs, { ...log, id: Date.now() }] }
            : subject
        );
      } else {
        return [...prev, { name, logs: [{ ...log, id: Date.now() }] }];
      }
    });
  };

  const handleUpdateLog = (updatedLog: StudyLog) => {
    setSubjects((prev) =>
      prev.map((subject) => ({
        ...subject,
        logs: subject.logs.map((log) => (log.id === updatedLog.id ? updatedLog : log)),
      }))
    );
  };

  const handleDeleteLog = (id: number) => {
    setSubjects((prev) =>
      prev.map((subject) => ({
        ...subject,
        logs: subject.logs.filter((log) => log.id !== id),
      }))
    );
  };

  const handleAddGoal = (values: { subject?: string; targetHours: number }) => {
    setGoals((prev) => [...prev, values]);
    setGoalModalOpen(false);
    goalForm.resetFields();
  };

  const calculateTotalHours = (subject?: string) => {
    return subjects
      .filter((s) => !subject || s.name === subject)
      .reduce((total, s) => total + s.logs.reduce((sum, log) => sum + log.duration, 0), 0);
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Thanh điều hướng */}
      <Button onClick={() => setSelectedSection('subjects')} type={selectedSection === 'subjects' ? 'primary' : 'default'}>
        Quản lý danh mục môn học
      </Button>
      <Button onClick={() => setSelectedSection('progress')} type={selectedSection === 'progress' ? 'primary' : 'default'} style={{ marginLeft: 10 }}>
        Quản lý tiến độ học tập
      </Button>
      <Button onClick={() => setSelectedSection('goals')} type={selectedSection === 'goals' ? 'primary' : 'default'} style={{ marginLeft: 10 }}>
        Thiết lập mục tiêu học tập
      </Button>

      {/* Quản lý danh mục môn học */}
      {selectedSection === 'subjects' && (
        <>
          <h2>Danh mục môn học</h2>
          <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginBottom: 20 }}>
            Thêm môn học
          </Button>

          <Row gutter={[16, 16]}>
            {subjects.map((subject) => (
              <Col key={subject.name}>
                <StudyCard name={subject.name} onClick={() => setSelectedSection('progress')} />
              </Col>
            ))}
          </Row>

          <StudyForm visible={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddStudy} />
        </>
      )}

      {/* Quản lý tiến độ học tập */}
      {selectedSection === 'progress' && (
        <>
          <h2>Quản lý tiến độ học tập</h2>
          {subjects.map((subject) => (
            <div key={subject.name}>
              <h3>{subject.name}</h3>
              <StudyTable studyLogs={subject.logs} onUpdateLog={handleUpdateLog} onDeleteLog={handleDeleteLog} />
            </div>
          ))}
        </>
      )}

      {/* Thiết lập mục tiêu học tập */}
      {selectedSection === 'goals' && (
        <>
          <h2>Thiết lập mục tiêu học tập</h2>
          <Button type="primary" onClick={() => setGoalModalOpen(true)} style={{ marginBottom: 20 }}>
            Đặt mục tiêu
          </Button>

          <List
            dataSource={goals}
            renderItem={(goal) => {
              const currentHours = calculateTotalHours(goal.subject);
              const percentage = Math.min((currentHours / goal.targetHours) * 100, 100);
              return (
                <List.Item>
                  <List.Item.Meta
                    title={goal.subject ? `Môn: ${goal.subject}` : 'Tổng thời gian học'}
                    description={`Mục tiêu: ${goal.targetHours} giờ`}
                  />
                  <Progress percent={percentage} status={percentage >= 100 ? 'success' : 'active'} />
                </List.Item>
              );
            }}
          />

          <Modal
            title="Đặt mục tiêu học tập"
            visible={goalModalOpen}
            onCancel={() => setGoalModalOpen(false)}
            onOk={() => goalForm.submit()}
          >
            <Form form={goalForm} onFinish={handleAddGoal} layout="vertical">
              <Form.Item label="Chọn môn học (Tùy chọn)" name="subject">
                <Select placeholder="Chọn môn học hoặc để trống">
                  {subjects.map((s) => (
                    <Select.Option key={s.name} value={s.name}>
                      {s.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Thời gian mục tiêu (giờ)" name="targetHours" rules={[{ required: true, message: 'Vui lòng nhập số giờ' }]}>
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </div>
  );
};

export default IndexPage;
