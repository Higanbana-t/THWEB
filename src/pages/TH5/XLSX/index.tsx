// File: src/pages/ClubMemberManager/index.tsx
import React from 'react';
import { Card, Button } from 'antd';
import { Column } from '@ant-design/plots';
import * as XLSX from 'xlsx';

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

const registrations: Registration[] = [
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
	const countByStatus = registrations.reduce(
		(acc, reg) => {
			acc[reg.status]++;
			return acc;
		},
		{ Pending: 0, Approved: 0, Rejected: 0 },
	);

	const columnData = clubs.flatMap((club) => {
		const clubRegs = registrations.filter((r) => r.clubId === club.id);
		return [
			{ club: club.name, status: 'Pending', value: clubRegs.filter((r) => r.status === 'Pending').length },
			{ club: club.name, status: 'Approved', value: clubRegs.filter((r) => r.status === 'Approved').length },
			{ club: club.name, status: 'Rejected', value: clubRegs.filter((r) => r.status === 'Rejected').length },
		];
	});

	const columnConfig = {
		data: columnData,
		xField: 'club',
		yField: 'value',
		seriesField: 'status',
		isGroup: true,
		columnWidthRatio: 0.6,
		height: 320,
		legend: { position: 'top' },
		label: {
			position: 'middle',
			layout: [{ type: 'interval-adjust-position' }, { type: 'interval-hide-overlap' }, { type: 'adjust-color' }],
		},
	};

	const handleExport = () => {
		const exportData = clubs.flatMap((club) => {
			return registrations
				.filter((reg) => reg.status === 'Approved' && reg.clubId === club.id)
				.map((reg) => ({
					Họ_Tên: reg.fullName,
					Email: reg.email,
					SĐT: reg.phone,
					Giới_Tính: reg.gender,
					CLB: club.name,
				}));
		});

		const worksheet = XLSX.utils.json_to_sheet(exportData);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh_sach_thanh_vien');
		XLSX.writeFile(workbook, 'Danh_sach_thanh_vien.xlsx');
	};

	return (
		<div>
			<h1>Báo cáo và thống kê</h1>
			<Card className='my-4'>
				<p>Tổng số CLB: {clubs.length}</p>
				<p>Số đơn chờ duyệt: {countByStatus.Pending}</p>
				<p>Số đơn đã duyệt: {countByStatus.Approved}</p>
				<p>Số đơn bị từ chối: {countByStatus.Rejected}</p>
				<Button onClick={handleExport} className='mt-2'>
					Xuất danh sách Excel
				</Button>
			</Card>
			<Column {...columnConfig} />
		</div>
	);
}
