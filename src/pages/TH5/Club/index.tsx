import { Button, Space, Table, Tag, message, Popconfirm, Modal } from 'antd';
import { useModel } from 'umi';
import { useState } from 'react';
import ClubForm from './ClubForm';
import type { Club } from '@/services/TH5/interfaces';
import dayjs from 'dayjs';

export default function ClubPage() {
	const { clubs, addClub, updateClub, deleteClub, members } = useModel('useClubModel');

	const [openModal, setOpenModal] = useState(false);
	const [editingClub, setEditingClub] = useState<Club | undefined>(undefined);
	const [selectedClub, setSelectedClub] = useState<Club | null>(null);
	const [showMembersModal, setShowMembersModal] = useState(false);

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
		if (editingClub) {
			updateClub({ ...club, id: editingClub.id });
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
				url ? (
					<img src={url} alt='avatar' style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} />
				) : (
					'—'
				),
		},
		{
			title: 'Tên CLB',
			dataIndex: 'name',
			sorter: (a: Club, b: Club) => a.name.localeCompare(b.name),
		},
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: 'Ngày thành lập',
			dataIndex: 'foundedDate',
			render: (val: string) => dayjs(val).format('DD/MM/YYYY'),
			sorter: (a: Club, b: Club) => dayjs(a.foundedDate).unix() - dayjs(b.foundedDate).unix(),
		},
		{
			title: 'Chủ nhiệm',
			dataIndex: 'leader',
		},
		{
			title: 'Hoạt động',
			dataIndex: 'isActive',
			render: (val: boolean) => <Tag color={val ? 'green' : 'red'}>{val ? 'Có' : 'Không'}</Tag>,
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
					<Button
						type='link'
						onClick={() => {
							setSelectedClub(club);
							setShowMembersModal(true);
						}}
					>
						Thành viên
					</Button>
					<Button type='link' onClick={() => handleEdit(club)}>
						Sửa
					</Button>
					<Popconfirm title='Xác nhận xóa CLB?' onConfirm={() => handleDelete(club.id)}>
						<Button type='link' danger>
							Xóa
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<div>
			<Space style={{ marginBottom: 16 }}>
				<Button type='primary' onClick={handleAdd}>
					Thêm CLB
				</Button>
			</Space>

			<Table rowKey='id' dataSource={clubs} columns={columns} pagination={{ pageSize: 5 }} />

			<ClubForm
				open={openModal}
				onClose={() => setOpenModal(false)}
				onFinish={handleSubmit}
				initialValues={editingClub}
			/>

			<Modal
				visible={showMembersModal}
				onCancel={() => setShowMembersModal(false)}
				title={`Danh sách thành viên của "${selectedClub?.name}"`}
				footer={null}
				width={700}
			>
				<Table
					rowKey='id'
					dataSource={members.filter((m) => m.clubId === selectedClub?.id)}
					columns={[
						{ title: 'Họ tên', dataIndex: 'fullName' },
						{ title: 'Email', dataIndex: 'email' },
						{ title: 'SĐT', dataIndex: 'phone' },
						{ title: 'Giới tính', dataIndex: 'gender' },
					]}
					pagination={false}
				/>
			</Modal>
		</div>
	);
}
