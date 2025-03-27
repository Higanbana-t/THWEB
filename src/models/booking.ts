import { useState, useEffect } from 'react';
import type { IAppointment } from '@/services/BookingSystem/types';

// Key lưu trong localStorage
const STORAGE_KEY = 'appointments';

// Lấy danh sách lịch hẹn từ localStorage
const getStoredAppointments = (): IAppointment[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export default function useBookingModel() {
  const [appointments, setAppointments] = useState<IAppointment[]>(getStoredAppointments());

  // Cập nhật localStorage khi appointments thay đổi
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  }, [appointments]);

  // Thêm lịch hẹn mới
  const addAppointment = (appointment: IAppointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  // Xóa lịch hẹn
  const removeAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
  };

  return {
    appointments,
    addAppointment,
    removeAppointment,
  };
}
