import { Button, Space, Table, Tag, message, Popconfirm } from 'antd';
import { useModel } from 'umi';
import { useState } from 'react';
import ClubForm from './ClubForm';
import type { Club } from '@/services/TH5/interfaces';
import dayjs from 'dayjs';

export default function ClubPage() {
  const {
    clubs,
    addClub,
    updateClub,
    deleteClub,
  } = useModel('useClubModel');

  const [openModal, setOpenModal] = useState(false);
  const [editingClub, setEditingClub] = useState<Club | undefined>(undefined);

  const handleAdd = () => {
    setEditingClub(undefined);
    setOpenModal(true);
  };

  const handleEdit = (club: Club) => {
    setEditingClub(club);
    setOpenModal(true);
  };

  const handleDelete = (id: string) => {
    deleteClub(id);
    message.success('Đã xóa câu lạc bộ');
  };

  const handleSubmit = (club: Club) => {
    if (club.id) {
      updateClub(club);
      message.success('Cập nhật thành công');
    } else {
      addClub({ ...club, id: Date.now().toString() });
      message.success('Thêm mới thành công');
    }
    setOpenModal(false);
  };

  const columns = [
    {
      title: 'Ảnh đại diện',
      dataIndex: 'avatar',
      render: (url: string) =>
        url ? <img src={url} style={{ width: 60, height: 60, objectFit: 'cover' }} /> : '—',
    },
    {
      title: 'Tên CLB',
      dataIndex: 'name',
      sorter: (a: Club, b: Club) => a.name.localeCompare(b.name),
    },
    {
      title: 'Ngày thành lập',
      dataIndex: 'foundedDate',
      render: (val: string) => dayjs(val).format('DD/MM/YYYY'),
      sorter: (a: Club, b: Club) => dayjs(a.foundedDate).unix() - dayjs(b.foundedDate).unix(),
    },
    {
      title: 'Chủ nhiệm',
      dataIndex: 'president',
    },
    {
      title: 'Hoạt động',
      dataIndex: 'isActive',
      render: (val: boolean) => (
        <Tag color={val ? 'green' : 'red'}>{val ? 'Có' : 'Không'}</Tag>
      ),
      filters: [
        { text: 'Có', value: true },
        { text: 'Không', value: false },
      ],
      onFilter: (value: any, record: Club) => record.isActive === value,
    },
    {
      title: 'Thao tác',
      render: (_: any, club: Club) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(club)}>Sửa</Button>
          <Popconfirm
            title="Xác nhận xóa CLB?"
            onConfirm={() => handleDelete(club.id)}
          >
            <Button type="link" danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleAdd}>
          Thêm CLB
        </Button>
      </Space>
      <Table
        rowKey="id"
        dataSource={clubs}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />

      <ClubForm
        open={openModal}
        onClose={() => setOpenModal(false)}
        onFinish={handleSubmit}
        initialValues={editingClub}
      />
    </div>
  );
}
