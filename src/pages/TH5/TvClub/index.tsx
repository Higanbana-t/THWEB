// File: src/pages/ClubMemberManager/index.tsx
import React, { useState } from 'react';
import { Table, Button, Modal, Select, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SwapOutlined } from '@ant-design/icons';

interface Club {
	id: string;
	name: string;
	foundedDate: string;
	avatar: string;
	description: string;
	leader: string;
	isActive: boolean;
}

interface Member {
	id: string;
	fullName: string;
	email: string;
	phone: string;
	gender: 'Nam' | 'Nữ' | 'Khác';
	clubId: string;
}

type RegistrationStatus = 'Pending' | 'Approved' | 'Rejected';

interface Registration {
	id: string;
	fullName: string;
	email: string;
	phone: string;
	gender: 'Nam' | 'Nữ' | 'Khác';
	address: string;
	skills: string;
	clubId: string;
	reason: string;
	status: RegistrationStatus;
	note?: string;
	history: ActionLog[];
}

interface ActionLog {
	action: 'Approved' | 'Rejected';
	by: string;
	at: string;
	note?: string;
}

// Dummy Data
const clubs: Club[] = [
	{
		id: '1',
		name: 'CLB Âm nhạc',
		foundedDate: '2023-01-01',
		avatar: '',
		description: '',
		leader: 'Nguyễn Văn A',
		isActive: true,
	},
	{
		id: '2',
		name: 'CLB Thể thao',
		foundedDate: '2023-01-01',
		avatar: '',
		description: '',
		leader: 'Nguyễn Văn B',
		isActive: true,
	},
];

let registrations: Registration[] = [
	{
		id: 'r1',
		fullName: 'Trần Thị B',
		email: 'a@gmail.com',
		phone: '0123456789',
		gender: 'Nữ',
		address: '',
		skills: '',
		clubId: '1',
		reason: '',
		status: 'Approved',
		history: [],
	},
	{
		id: 'r2',
		fullName: 'Ngô Văn C',
		email: 'b@gmail.com',
		phone: '0987654321',
		gender: 'Nam',
		address: '',
		skills: '',
		clubId: '1',
		reason: '',
		status: 'Pending',
		history: [],
	},
	// Thêm dữ liệu mới ở đây
	{
		id: 'r3',
		fullName: 'Lê Văn D',
		email: 'c@gmail.com',
		phone: '0111222333',
		gender: 'Nam',
		address: '',
		skills: '',
		clubId: '2',
		reason: '',
		status: 'Approved',
		history: [],
	},
	{
		id: 'r4',
		fullName: 'Phạm Thị E',
		email: 'd@gmail.com',
		phone: '0445566778',
		gender: 'Nữ',
		address: '',
		skills: '',
		clubId: '2',
		reason: '',
		status: 'Rejected',
		history: [],
	},
];

export default function ClubMemberManager() {
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [targetClubId, setTargetClubId] = useState<string>('');
	const [selectedClubId, setSelectedClubId] = useState<string>('');

	const approvedMembers: Member[] = registrations
		.filter((r) => r.status === 'Approved')
		.map((r) => ({
			id: r.id,
			fullName: r.fullName,
			email: r.email,
			phone: r.phone,
			gender: r.gender,
			clubId: r.clubId,
		}));

	const filteredMembers = selectedClubId ? approvedMembers.filter((m) => m.clubId === selectedClubId) : [];

	const handleChangeClub = () => {
		registrations = registrations.map((reg) => {
			if (selectedRowKeys.includes(reg.id)) {
				return {
					...reg,
					clubId: targetClubId,
				};
			}
			return reg;
		});
		message.success(`${selectedRowKeys.length} thành viên đã được chuyển đến CLB mới.`);
		setIsModalOpen(false);
		setSelectedRowKeys([]);
	};

	const columns: ColumnsType<Member> = [
		{ title: 'Họ tên', dataIndex: 'fullName' },
		{ title: 'Email', dataIndex: 'email' },
		{ title: 'SĐT', dataIndex: 'phone' },
		{ title: 'Giới tính', dataIndex: 'gender' },
		{ title: 'CLB', dataIndex: 'clubId', render: (id) => clubs.find((c) => c.id === id)?.name },
	];

	const sourceClubName = selectedClubId ? clubs.find((c) => c.id === selectedClubId)?.name : '';

	return (
		<div>
			<h1>Quản lý thành viên</h1>

			<div className='mb-4 flex gap-2 items-center'>
				<Select
					allowClear
					style={{ minWidth: 200 }}
					placeholder='Chọn CLB để lọc'
					onChange={(value) => setSelectedClubId(value)}
					options={clubs.map((c) => ({ label: c.name, value: c.id }))}
				/>
				<Button icon={<SwapOutlined />} disabled={selectedRowKeys.length === 0} onClick={() => setIsModalOpen(true)}>
					Đổi CLB
				</Button>
			</div>

			<Table
				rowKey='id'
				columns={columns}
				rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
				dataSource={filteredMembers}
			/>

			<Modal
				visible={isModalOpen}
				title={`Chuyển CLB cho ${selectedRowKeys.length} thành viên`}
				onCancel={() => setIsModalOpen(false)}
				onOk={handleChangeClub}
			>
				<p>
					Đổi từ <strong>{sourceClubName}</strong> sang:
				</p>
				<Select
					style={{ width: '100%' }}
					placeholder='Chọn CLB mới'
					onChange={setTargetClubId}
					options={clubs.filter((c) => c.id !== selectedClubId).map((c) => ({ label: c.name, value: c.id }))}
				/>
			</Modal>
		</div>
	);
}
