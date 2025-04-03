// Loại phòng học (Enum)
export enum RoomType {
    LY_THUYET = "Lý thuyết",
    THUC_HANH = "Thực hành",
    HOI_TRUONG = "Hội trường",
  }
  
  // Interface cho phòng học
  export interface Room {
    id: string; // ID duy nhất của phòng
    code: string; // Mã phòng (tối đa 10 ký tự, không trùng)
    name: string; // Tên phòng (tối đa 50 ký tự, không trùng)
    seats: number; // Số chỗ ngồi (tối thiểu 10, tối đa 200)
    type: RoomType; // Loại phòng (Lý thuyết, Thực hành, Hội trường)
    manager: string; // Người phụ trách (chọn từ danh sách có sẵn)
  }
  
  // Interface cho danh sách kết quả tìm kiếm phòng học
  export interface SearchResult<T> {
    data: T[]; // Danh sách phòng học sau khi tìm kiếm/lọc
    total: number; // Tổng số kết quả tìm thấy
  }
  
  // Interface cho form nhập liệu phòng học
  export interface RoomForm {
    code: string;
    name: string;
    seats: number;
    type: RoomType;
    manager: string;
  }
  