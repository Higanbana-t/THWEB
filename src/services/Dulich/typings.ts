export interface Destination {
    id: string; // ID của điểm đến
    name: string; // Tên điểm đến
    description: string; // Mô tả điểm đến
    image: string; // URL của hình ảnh điểm đến
    category: 'beach' | 'mountain' | 'city'; // Loại điểm đến
    price: number; // Giá của chuyến đi (có thể chia thành các loại chi phí)
    rating: number; // Đánh giá điểm đến
    visitTime: number; // Thời gian tham quan (tính bằng giờ)
    accommodationCost: number; // Chi phí lưu trú
    foodCost: number; // Chi phí ăn uống
    transportationCost: number; // Chi phí di chuyển
}
export interface Itinerary {
    id: string; // ID của lịch trình
    destinations: Array<ItineraryItem>; // Danh sách các điểm đến trong lịch trình
    totalCost: number; // Tổng chi phí của lịch trình
    totalDuration: number; // Tổng thời gian của lịch trình
    createdDate: string; // Ngày tạo lịch trình
}
export interface ItineraryItem {
    destinationId: string; // ID của điểm đến
    day: number; // Ngày trong lịch trình
    startTime: string; // Thời gian bắt đầu tham quan
    endTime: string; // Thời gian kết thúc tham quan
}
 export interface Budget {
    total: number; // Tổng ngân sách
    accommodation: number; // Ngân sách dành cho lưu trú
    food: number; // Ngân sách dành cho ăn uống
    transportation: number; // Ngân sách dành cho di chuyển
}
export interface BudgetAlert {
    message: string; // Thông báo khi vượt ngân sách
    type: 'warning' | 'info' | 'success'; // Loại thông báo
    valueExceeded?: number; // Số tiền vượt ngân sách (nếu có)
}
export interface AdminDestination {
    id: string; // ID điểm đến
    name: string; // Tên điểm đến
    description: string; // Mô tả điểm đến
    image: File | string; // Hình ảnh điểm đến (File hoặc URL)
    category: 'beach' | 'mountain' | 'city'; // Loại điểm đến
    price: number; // Giá của chuyến đi
    rating: number; // Đánh giá điểm đến
    visitTime: number; // Thời gian tham quan
    accommodationCost: number; // Chi phí lưu trú
    foodCost: number; // Chi phí ăn uống
    transportationCost: number; // Chi phí di chuyển
}
export interface AdminStats {
    month: string; // Tháng
    totalItinerariesCreated: number; // Số lượt lịch trình được tạo
    popularDestinations: Array<string>; // Các điểm đến phổ biến
    totalIncome: number; // Tổng số tiền thu về
    expenseByCategory: {
        accommodation: number;
        food: number;
        transportation: number;
    }; // Số tiền theo từng hạng mục
}
 export interface ChartData {
    labels: string[]; // Các mốc thời gian (ngày, tháng)
    data: number[]; // Dữ liệu biểu đồ (số liệu thống kê)
}
 export interface BudgetChartData {
    categories: string[]; // Các hạng mục ngân sách (ăn uống, lưu trú...)
    values: number[]; // Giá trị tương ứng
}