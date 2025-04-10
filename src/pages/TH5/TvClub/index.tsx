import React, { useState } from 'react';
import { Table, Button, Modal, Select, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SwapOutlined } from '@ant-design/icons';
import useClubMemberStore from '@/models/useClubModel'; // Giả sử bạn lưu hook ở đây

export default function ClubMemberManager() {
	const { clubs, members, changeMemberClub } = useClubMemberStore();

	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [targetClubId, setTargetClubId] = useState<string>('');
	const [selectedClubId, setSelectedClubId] = useState<string>('');

	// Lọc danh sách thành viên được duyệt theo CLB
	const approvedMembers = members;
	const filteredMembers = selectedClubId ? approvedMembers.filter((m) => m.clubId === selectedClubId) : [];

	const handleChangeClub = () => {
		changeMemberClub(selectedRowKeys as string[], targetClubId);
		message.success(`${selectedRowKeys.length} thành viên đã được chuyển đến CLB mới.`);
		setIsModalOpen(false);
		setSelectedRowKeys([]);
	};

	const columns: ColumnsType<(typeof members)[0]> = [
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
					value={selectedClubId || undefined}
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
