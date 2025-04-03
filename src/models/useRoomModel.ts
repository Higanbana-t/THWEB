import { useState } from 'react';
import type { Room, RoomForm } from '@/services/GK/typings';
import { RoomType } from '@/services/GK/typings';

const STORAGE_KEY = 'rooms'; // Dữ liệu sẽ được lưu trong localStorage

// Hàm lấy dữ liệu từ localStorage hoặc trả về mảng trống nếu chưa có
const getRoomsFromStorage = (): Room[] => {
  const rooms = localStorage.getItem(STORAGE_KEY);
  return rooms ? JSON.parse(rooms) : [];
};

export default function useRoomModel() {
  const [rooms, setRooms] = useState<Room[]>(getRoomsFromStorage());
  const [visible, setVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [form, setForm] = useState<RoomForm>({
    code: '',
    name: '',
    seats: 10,
    type: RoomType.LY_THUYET, // Mặc định là loại phòng lý thuyết
    manager: '',
  });

  // Lưu phòng vào localStorage
  const saveRoomsToStorage = (newRooms: Room[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRooms));
    setRooms(newRooms);
  };

  // Thêm phòng học mới
  const addRoom = (room: RoomForm) => {
    const newRoom: Room = {
      ...room,
      id: Date.now().toString(), // Tạo ID duy nhất
    };
    const updatedRooms = [newRoom, ...rooms];
    saveRoomsToStorage(updatedRooms);
    setVisible(false); // Đóng modal sau khi lưu
  };

  // Chỉnh sửa phòng học
  const editRoom = (room: RoomForm) => {
    if (!currentRoom) return;

    const updatedRooms = rooms.map(r =>
      r.id === currentRoom.id ? { ...r, ...room } : r
    );
    saveRoomsToStorage(updatedRooms);
    setVisible(false); // Đóng modal sau khi lưu
    setIsEdit(false); // Đặt lại trạng thái chỉnh sửa
    setCurrentRoom(null); // Reset phòng hiện tại
  };
  const deleteRoom = (roomId: string) => {
    // Filter out the room from the state (by ID)
    const updatedRooms = rooms.filter((room) => room.id !== roomId);
    // Save the updated list to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRooms));
    // Update the state with the new list
    setRooms(updatedRooms);
  };

  // Hàm xử lý lưu phòng (thêm mới hoặc chỉnh sửa)
  const saveRoom = () => {
    if (isEdit) {
      editRoom(form);
    } else {
      addRoom(form);
    }
  };

  // Mở modal chỉnh sửa phòng học
  const openEditModal = (room: Room) => {
    setCurrentRoom(room);
    setIsEdit(true);
    setForm({ ...room }); // Đặt lại form với thông tin phòng cần chỉnh sửa
    setVisible(true);
  };

  // Mở modal thêm phòng học
  const openAddModal = () => {
    setIsEdit(false); // Đảm bảo chế độ không phải chỉnh sửa
    setForm({
      code: '',
      name: '',
      seats: 10,
      type: RoomType.LY_THUYET, // Mặc định là Lý thuyết
      manager: '',
    });
    setVisible(true); // Mở modal
  };

  // Đóng modal
  const closeModal = () => {
    setVisible(false);
    setIsEdit(false);
    setCurrentRoom(null);
  };

  return {
    rooms,
    visible,
    setVisible,
    isEdit,
    form,
    setForm,
    saveRoom, // Thêm hàm saveRoom
    openAddModal,
    openEditModal,
    closeModal,
    deleteRoom,
    addRoom,
    editRoom,
  };
}
