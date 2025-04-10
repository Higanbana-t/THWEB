import { useEffect, useMemo, useState } from 'react';
import type {
	Club,
	Member,
	Registration,
	ClubStatistic,
	ActionLog,
	RegistrationStatus,
} from '@/services/TH5/interfaces';

export default () => {
	// ======= Khởi tạo từ localStorage =======
	const loadFromStorage = <T>(key: string, defaultValue: T): T => {
		try {
			const stored = localStorage.getItem(key);
			return stored ? JSON.parse(stored) : defaultValue;
		} catch {
			return defaultValue;
		}
	};

	const saveToStorage = (key: string, value: any) => {
		localStorage.setItem(key, JSON.stringify(value));
	};

	// Danh sách các CLB
	const [clubs, setClubsState] = useState<Club[]>(() => loadFromStorage('clubs', []));
	const setClubs = (newClubs: Club[] | ((prev: Club[]) => Club[])) => {
		setClubsState((prev) => {
			const updated = typeof newClubs === 'function' ? (newClubs as (prev: Club[]) => Club[])(prev) : newClubs;
			saveToStorage('clubs', updated);
			return updated;
		});
	};

	// Danh sách đơn đăng ký
	const [registrations, _setRegistrations] = useState<Registration[]>(() => loadFromStorage('registrations', []));

	const setRegistrations = (newRegs: Registration[] | ((prev: Registration[]) => Registration[])) => {
		_setRegistrations((prev) => {
			const updated = typeof newRegs === 'function' ? newRegs(prev) : newRegs;
			saveToStorage('registrations', updated);
			return updated;
		});
	};

	// Danh sách thành viên
	const [members, setMembersState] = useState<Member[]>(() => loadFromStorage('members', []));
	const setMembers = (newMembers: Member[] | ((prev: Member[]) => Member[])) => {
		setMembersState((prev) => {
			const updated =
				typeof newMembers === 'function' ? (newMembers as (prev: Member[]) => Member[])(prev) : newMembers;
			saveToStorage('members', updated);
			return updated;
		});
	};

	// Dữ liệu thống kê (nếu cần lưu)
	const [statistics, setStatisticsState] = useState<ClubStatistic[]>(() => loadFromStorage('statistics', []));
	const setStatistics = (newStats: ClubStatistic[]) => {
		setStatisticsState(newStats);
		saveToStorage('statistics', newStats);
	};

	// ============ CLB ============
	const addClub = (club: Club) => {
		const updated = [...clubs, club];
		setClubs(updated);
	};

	const updateClub = (club: Club) => {
		const updated = clubs.map((c) => (c.id === club.id ? club : c));
		setClubs(updated);
	};

	const deleteClub = (id: string) => {
		const updated = clubs.filter((c) => c.id !== id);
		setClubs(updated);
	};

	// ============ Đơn đăng ký ============
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
					setMembers([...members, newMember]);
				}

				return updatedReg;
			}
			return reg;
		});

		setRegistrations(updated);
	};

	// ============ Thành viên ============
	const changeMemberClub = (ids: string[], newClubId: string) => {
		const updated = members.map((m) => (ids.includes(m.id) ? { ...m, clubId: newClubId } : m));
		setMembers(updated);
	};

	// ============ Thống kê ============
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
