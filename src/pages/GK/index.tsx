import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Select, Space, Modal, message } from 'antd';
import { useModel } from 'umi';
import type { Room} from '@/services/GK/typings';
import { RoomType } from '@/services/GK/typings';
import RoomForm from './Form';

const { Option } = Select;

const RoomList: React.FC = () => {
  const { rooms, visible, setVisible, isEdit, deleteRoom, openAddModal, openEditModal, closeModal, saveRoom } = useModel('useRoomModel');
  const [searchText, setSearchText] = useState<string>('');
  const [filterType, setFilterType] = useState<string | undefined>(undefined);
  const [filterManager, setFilterManager] = useState<string | undefined>(undefined);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // Handle filter change
  const handleFilterTypeChange = (value: string) => {
    setFilterType(value);
  };

  const handleFilterManagerChange = (value: string) => {
    setFilterManager(value);
  };

  // Filter rooms based on search text and filters
  const filteredRooms = rooms.filter((room) => {
    const matchesSearchText = room.code.includes(searchText) || room.name.includes(searchText);
    const matchesFilterType = filterType ? room.type === filterType : true;
    const matchesFilterManager = filterManager ? room.manager.includes(filterManager) : true;
    return matchesSearchText && matchesFilterType && matchesFilterManager;
  });

  // Columns for the table
  const columns = [
    {
      title: 'Mã phòng',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Tên phòng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số chỗ ngồi',
      dataIndex: 'seats',
      key: 'seats',
    },
    {
      title: 'Loại phòng',
      dataIndex: 'type',
      key: 'type',
      
    },
    {
      title: 'Người phụ trách',
      dataIndex: 'manager',
      key: 'manager',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, room: Room) => (
        <Space size="middle">
          <Button type="primary" onClick={() => openEditModal(room)}>Chỉnh sửa</Button>
          <Button danger onClick={() => handleDeleteRoom(room)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  // Handle delete room
  const handleDeleteRoom = (room: Room) => {
    if (room.seats < 30) {
      Modal.confirm({
        title: 'Xác nhận',
        content: `Bạn có chắc chắn muốn xóa phòng ${room.name} không?`,
        onOk: () => {
          deleteRoom(room.id);
          message.success('Đã xóa phòng học');
        },
      });
    } else {
      message.error('Không thể xóa phòng có hơn 30 chỗ ngồi');
    }
  };

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={openAddModal}>Thêm phòng học</Button>
        <Input
          style={{ width: 200, marginLeft: 20 }}
          placeholder="Tìm kiếm theo mã hoặc tên"
          value={searchText}
          onChange={handleSearchChange}
        />
        <Select
          style={{ width: 150, marginLeft: 20 }}
          placeholder="Lọc theo loại phòng"
          value={filterType}
          onChange={handleFilterTypeChange}
        >
          {Object.values(RoomType).map((type) => (
            <Option key={type} value={type}>{type}</Option>
          ))}
        </Select>
        <Input
          style={{ width: 200, marginLeft: 20 }}
          placeholder="Lọc theo người phụ trách"
          value={filterManager}
          onChange={(e) => handleFilterManagerChange(e.target.value)}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredRooms}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        onChange={() => {}}
      />

      {/* Modal for Room Form */}
      <RoomForm visible={visible} />
    </>
  );
};

export default RoomList;
