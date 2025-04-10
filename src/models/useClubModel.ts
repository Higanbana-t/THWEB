import { useMemo, useState } from 'react';
import type { Club, Member, Registration, ClubStatistic, ActionLog, RegistrationStatus } from '@/services/TH5/typings';

export default () => {
	// Danh sách các CLB
	const [clubs, setClubs] = useState<Club[]>([]);

	// Danh sách đơn đăng ký
	const [registrations, setRegistrations] = useState<Registration[]>([]);

	// Danh sách thành viên (chỉ thành viên đã được duyệt)
	const [members, setMembers] = useState<Member[]>([]);

	// Dữ liệu thống kê
	const [statistics, setStatistics] = useState<ClubStatistic[]>([]);

	// ================== CLB =====================

	const addClub = (club: Club) => {
		setClubs([...clubs, club]);
	};

	const updateClub = (club: Club) => {
		setClubs(clubs.map((c) => (c.id === club.id ? club : c)));
	};

	const deleteClub = (id: string) => {
		setClubs(clubs.filter((c) => c.id !== id));
	};

	// ================== Đơn đăng ký =====================

	const updateRegistrationStatus = (
		ids: string[],
		status: RegistrationStatus,
		actionLog: ActionLog,
		rejectNote?: string,
	) => {
		const updated = registrations.map((reg) => {
			if (ids.includes(reg.id)) {
				const updatedReg: Registration = {
					...reg,
					status,
					note: status === 'Rejected' ? rejectNote : undefined,
					history: [...(reg.history || []), actionLog],
				};

				// Nếu là duyệt → thêm vào danh sách thành viên
				if (status === 'Approved') {
					const newMember: Member = {
						id: reg.id,
						fullName: reg.fullName,
						email: reg.email,
						phone: reg.phone,
						gender: reg.gender,
						clubId: reg.clubId,
					};
					setMembers((prev) => [...prev, newMember]);
				}

				return updatedReg;
			}
			return reg;
		});

		setRegistrations(updated);
	};

	// ================== Thành viên =====================

	const changeMemberClub = (ids: string[], newClubId: string) => {
		setMembers(members.map((m) => (ids.includes(m.id) ? { ...m, clubId: newClubId } : m)));
	};

	// ================== Thống kê tổng quan =====================

	const summaryStats = useMemo(() => {
		return {
			totalClubs: clubs.length,
			totalRegistrations: registrations.length,
			pending: registrations.filter((r) => r.status === 'Pending').length,
			approved: registrations.filter((r) => r.status === 'Approved').length,
			rejected: registrations.filter((r) => r.status === 'Rejected').length,
		};
	}, [registrations, clubs]);

	return {
		// CLB
		clubs,
		setClubs,
		addClub,
		updateClub,
		deleteClub,

		// Đơn đăng ký
		registrations,
		setRegistrations,
		updateRegistrationStatus,

		// Thành viên
		members,
		setMembers,
		changeMemberClub,

		// Thống kê
		statistics,
		setStatistics,
		summaryStats,
	};
};
