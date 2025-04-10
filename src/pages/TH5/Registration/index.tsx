import { Button, Modal, Space, Table, Tag, Tooltip, message, Popconfirm, Collapse, Timeline } from 'antd';
import { useModel } from 'umi';
import { useState } from 'react';
import RegistrationForm from '@/pages/TH5/Registration/RegistrationForm';
import type { Registration, ActionLog, RegistrationStatus } from '@/services/TH5/interfaces';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';

export default () => {
	const model = useModel('useClubModel'); // useModel đã chia các state
	const [openForm, setOpenForm] = useState(false);
	const [editing, setEditing] = useState<Registration | null>(null);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
	const [note, setNote] = useState('');

	const handleSubmit = (reg: Registration) => {
		if (editing) {
			model.setRegistrations((prev) => prev.map((r) => (r.id === editing.id ? { ...reg, id: editing.id } : r)));
			message.success('Cập nhật thành công');
		} else {
			const newReg: Registration = {
				...reg,
				id: Date.now().toString(),
				status: 'Pending' as RegistrationStatus,
				history: [],
			};
			model.setRegistrations((prev) => [...prev, newReg]);
			message.success('Thêm đơn thành công');
		}
		setOpenForm(false);
		setEditing(null);
	};

	const handleDelete = (id: string) => {
		model.setRegistrations((prev) => prev.filter((r) => r.id !== id));
		message.success('Đã xóa đơn');
	};

	const confirmAction = () => {
		if (actionType === 'reject' && !note) {
			message.error('Vui lòng nhập lý do từ chối');
			return;
		}

		const log: ActionLog = {
			action: actionType === 'approve' ? 'Approved' : 'Rejected',
			at: new Date().toISOString(),
			note,
			by: 'Admin',
		};

		model.updateRegistrationStatus(
			selectedRowKeys as string[],
			actionType === 'approve' ? 'Approved' : 'Rejected',
			log,
			actionType === 'reject' ? note : undefined,
		);

		setActionType(null);
		setSelectedRowKeys([]);
		setNote('');
		message.success('Cập nhật trạng thái thành công');
	};

	const columns: ColumnsType<Registration> = [
		{
			title: 'Họ tên',
			dataIndex: 'fullName',
		},
		{
			title: 'Email',
			dataIndex: 'email',
		},
		{
			title: 'SĐT',
			dataIndex: 'phone',
		},
		{
			title: 'Giới tính',
			dataIndex: 'gender',
		},
		{
			title: 'Địa chỉ',
			dataIndex: 'address',
		},
		{
			title: 'Sở trường',
			dataIndex: 'strengths',
		},
		{
			title: 'Câu lạc bộ',
			dataIndex: 'clubId',
			render: (id) => model.clubs.find((c) => c.id === id)?.name || '(N/A)',
		},
		{
			title: 'Lý do đăng ký',
			dataIndex: 'reason',
			ellipsis: true,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			render: (status) => {
				const color = status === 'Approved' ? 'green' : status === 'Rejected' ? 'red' : 'blue';
				return <Tag color={color}>{status}</Tag>;
			},
		},
		{
			title: 'Ghi chú',
			dataIndex: 'note',
			render: (text) => text || '-',
		},
		{
			title: 'Thao tác',
			render: (_, record) => (
				<Space>
					<a
						onClick={() => {
							setEditing(record);
							setOpenForm(true);
						}}
					>
						Sửa
					</a>
					<Popconfirm title='Xóa đơn này?' onConfirm={() => handleDelete(record.id)}>
						<a>Xóa</a>
					</Popconfirm>
					{record.status === 'Pending' && (
						<>
							<a
								onClick={() => {
									setSelectedRowKeys([record.id]);
									setActionType('approve');
								}}
							>
								Duyệt
							</a>
							<a
								onClick={() => {
									setSelectedRowKeys([record.id]);
									setActionType('reject');
								}}
							>
								Từ chối
							</a>
						</>
					)}
				</Space>
			),
		},
	];

	return (
		<>
			<Space style={{ marginBottom: 16 }}>
				<Button type='primary' onClick={() => setOpenForm(true)}>
					Thêm đơn mới
				</Button>
				{selectedRowKeys.length > 0 && (
					<>
						<Button onClick={() => setActionType('approve')} type='primary'>
							Duyệt {selectedRowKeys.length} đơn
						</Button>
						<Button danger onClick={() => setActionType('reject')}>
							Từ chối {selectedRowKeys.length} đơn
						</Button>
					</>
				)}
			</Space>

			<Table
				rowKey='id'
				dataSource={model.registrations}
				columns={columns}
				rowSelection={{
					selectedRowKeys,
					onChange: setSelectedRowKeys,
				}}
			/>

			{/* Modal xác nhận duyệt / từ chối */}
			<Modal
				visible={!!actionType}
				title={actionType === 'approve' ? 'Xác nhận duyệt đơn' : 'Từ chối đơn đăng ký'}
				onOk={confirmAction}
				onCancel={() => {
					setActionType(null);
					setNote('');
				}}
			>
				{actionType === 'reject' && (
					<textarea
						placeholder='Nhập lý do từ chối...'
						rows={4}
						value={note}
						onChange={(e) => setNote(e.target.value)}
						style={{ width: '100%' }}
					/>
				)}
				{actionType === 'approve' && <p>Bạn chắc chắn muốn duyệt {selectedRowKeys.length} đơn?</p>}
			</Modal>

			{/* Modal form tạo/sửa */}
			<Modal
				visible={openForm}
				title={editing ? 'Chỉnh sửa đơn' : 'Thêm đơn mới'}
				onCancel={() => {
					setOpenForm(false);
					setEditing(null);
				}}
				footer={null}
				destroyOnClose
			>
				<RegistrationForm
					mode={editing ? 'edit' : 'create'}
					initialValues={editing || undefined}
					onFinish={handleSubmit}
					clubs={model.clubs}
				/>

				{/*  phần này để hiện lịch sử thao tác nếu có */}
				{editing && Array.isArray(editing.history) && editing.history.length > 0 && (
					<Collapse className='mt-4'>
						<Collapse.Panel header='Lịch sử thao tác' key='history'>
							<Timeline>
								{editing.history.map((log, index) => (
									<Timeline.Item key={index} color={log.action === 'Approved' ? 'green' : 'red'}>
										<div>
											<b>{log.by}</b> đã <b>{log.action === 'Approved' ? 'duyệt' : 'từ chối'}</b> lúc{' '}
											{moment(log.at).format('HH:mm - DD/MM/YYYY')}
										</div>
										{log.note && <div>📝 {log.note}</div>}
									</Timeline.Item>
								))}
							</Timeline>
						</Collapse.Panel>
					</Collapse>
				)}
			</Modal>
		</>
	);
};
