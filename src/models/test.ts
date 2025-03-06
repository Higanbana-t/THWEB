import { useState, useEffect } from 'react';

interface StudySession {
  id: number;
  date: string;
  duration: number;
  notes: string;
  completed: boolean; // Trạng thái hoàn thành
}

interface Subject {
  id: number;
  name: string;
  goal: number; // Mục tiêu (giờ)
  completed: number; // Tổng thời gian đã học
  sessions: StudySession[];
}

export default function useStudyModel() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  // Load dữ liệu từ localStorage khi khởi động
  useEffect(() => {
    const savedSubjects = localStorage.getItem('subjects');
    if (savedSubjects) {
      setSubjects(JSON.parse(savedSubjects));
    }
  }, []);

  // Lưu dữ liệu vào localStorage khi subjects thay đổi
  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  // Thêm môn học (hoặc cập nhật nếu đã tồn tại)
  const addSubject = (name: string, goal: number) => {
    setSubjects((prevSubjects) => {
      const existingSubject = prevSubjects.find((sub) => sub.name === name);
      if (existingSubject) {
        return prevSubjects.map((sub) =>
          sub.name === name ? { ...sub, goal } : sub
        );
      } else {
        return [
          ...prevSubjects,
          { id: Date.now(), name, goal, completed: 0, sessions: [] },
        ];
      }
    });
  };

  // Thêm lịch học cho một môn
  const addStudySession = (subjectId: number, session: StudySession) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              completed: subject.completed + session.duration,
              sessions: [...subject.sessions, { ...session, id: Date.now(), completed: false }],
            }
          : subject
      )
    );
  };

  // Sửa lịch học
  const editStudySession = (subjectId: number, sessionId: number, updatedSession: Partial<StudySession>) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              sessions: subject.sessions.map((session) =>
                session.id === sessionId ? { ...session, ...updatedSession } : session
              ),
            }
          : subject
      )
    );
  };

  // Xóa lịch học
  const deleteStudySession = (subjectId: number, sessionId: number) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              sessions: subject.sessions.filter((session) => session.id !== sessionId),
            }
          : subject
      )
    );
  };

  // Chuyển trạng thái hoàn thành của lịch học
  const toggleCompletion = (subjectId: number, sessionId: number) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              sessions: subject.sessions.map((session) =>
                session.id === sessionId
                  ? { ...session, completed: !session.completed }
                  : session
              ),
            }
          : subject
      )
    );
  };

  return { subjects, addSubject, addStudySession, editStudySession, deleteStudySession, toggleCompletion };
}

