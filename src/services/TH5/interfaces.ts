// ======================= Câu lạc bộ =======================
export interface Club {
	id: string;
	name: string;
	foundedDate: string; // ISO date string, ví dụ "2023-01-01"
	avatar: string; // Đường dẫn ảnh đại diện
	description: string; // Nội dung HTML (mô tả CLB)
	leader: string; // Tên người phụ trách/đại diện
	isActive: boolean; // Trạng thái hoạt động
}

// ======================= Thành viên =======================
export interface Member {
	id: string;
	fullName: string;
	email: string;
	phone: string;
	gender: 'Nam' | 'Nữ' | 'Khác';
	clubId: string;
}

// ======================= Đơn đăng ký =======================
export type RegistrationStatus = 'Pending' | 'Approved' | 'Rejected';

export interface Registration {
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
	note?: string; // lý do từ chối
	history: ActionLog[]; // nhật ký duyệt/từ chối
}

// ======================= Lịch sử thao tác =======================
export interface ActionLog {
	action: 'Approved' | 'Rejected';
	by: string; // tên người xử lý (Admin)
	at: string;
	note?: string; // lý do / ghi chú
}

// ======================= Báo cáo thống kê =======================
export interface ClubStatistic {
	clubId: string;
	clubName: string;
	pending: number;
	approved: number;
	rejected: number;
}
