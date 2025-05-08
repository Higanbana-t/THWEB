import { useState } from 'react';
import type { Destination, Itinerary, Budget } from '@/services/Dulich/typings'; // Định nghĩa các interface
import type { AdminStats, ChartData, BudgetChartData } from '@/services/Dulich/typings';

export default () => {
    // State quản lý dữ liệu
    const [destinations, setDestinations] = useState<Destination[]>([]); // Danh sách điểm đến
    const [itineraries, setItineraries] = useState<Itinerary[]>([]); // Danh sách lịch trình
    const [budget, setBudget] = useState<Budget>({ total: 0, accommodation: 0, food: 0, transportation: 0 }); // Ngân sách
    const [visible, setVisible] = useState<boolean>(false); // Hiển thị modal
    const [isEdit, setIsEdit] = useState<boolean>(false); // Trạng thái chỉnh sửa
    const [row, setRow] = useState<Destination | Itinerary | null>(null); // Dữ liệu đang chỉnh sửa
    const [isLoading, setIsLoading] = useState<boolean>(false); // Trạng thái loading
    const [adminStats, setAdminStats] = useState<AdminStats[]>([]);
    const [chartData, setChartData] = useState<ChartData>({ labels: [], data: [] });
    const [budgetChartData, setBudgetChartData] = useState<BudgetChartData>({ categories: [], values: [] });

    const generateStatistics = () => {
        const stats: AdminStats[] = [
            {
                month: 'Tháng 5',
                totalItinerariesCreated: itineraries.length,
                popularDestinations: destinations.slice(0, 3).map((d) => d.name),
                totalIncome: destinations.reduce((sum, d) => sum + d.price, 0),
                expenseByCategory: {
                    accommodation: destinations.reduce((sum, d) => sum + d.accommodationCost, 0),
                    food: destinations.reduce((sum, d) => sum + d.foodCost, 0),
                    transportation: destinations.reduce((sum, d) => sum + d.transportationCost, 0),
                },
            },
        ];
        setAdminStats(stats);

        setChartData({
            labels: stats.map((s) => s.month),
            data: stats.map((s) => s.totalItinerariesCreated),
        });

        setBudgetChartData({
            categories: ['Lưu trú', 'Ăn uống', 'Di chuyển'],
            values: [
                stats[0].expenseByCategory.accommodation,
                stats[0].expenseByCategory.food,
                stats[0].expenseByCategory.transportation,
            ],
        });
    };


    // Hàm lấy dữ liệu điểm đến từ localStorage
    const getDataDestinations = () => {
        setIsLoading(true);
        const dataLocal: Destination[] = JSON.parse(localStorage.getItem('destinations') as string) || [];
        setDestinations(dataLocal);
        setIsLoading(false);
    };

    // Hàm thêm điểm đến
    const addDestination = (destination: Destination) => {
        const updatedDestinations = [...destinations, destination];
        setDestinations(updatedDestinations);
        localStorage.setItem('destinations', JSON.stringify(updatedDestinations)); // Lưu vào localStorage
    };

    // Hàm cập nhật điểm đến
    const updateDestination = (updatedDestination: Destination) => {
        const updatedDestinations = destinations.map((item) =>
            item.id === updatedDestination.id ? updatedDestination : item
        );
        setDestinations(updatedDestinations);
        localStorage.setItem('destinations', JSON.stringify(updatedDestinations)); // Lưu vào localStorage
    };

    // Hàm xóa điểm đến
    const deleteDestination = (id: string) => {
        const updatedDestinations = destinations.filter((item) => item.id !== id);
        setDestinations(updatedDestinations);
        localStorage.setItem('destinations', JSON.stringify(updatedDestinations)); // Lưu vào localStorage
    };

    // Hàm tạo mới lịch trình
    const createItinerary = (newItinerary: Itinerary) => {
        const updatedItineraries = [...itineraries, newItinerary];
        setItineraries(updatedItineraries);
    };

    // Hàm tính toán ngân sách tổng
    const calculateBudget = (newBudget: Budget) => {
        setBudget(newBudget);
    };

    // Reset dữ liệu
    const resetData = () => {
        setDestinations([]);
        setItineraries([]);
        setBudget({ total: 0, accommodation: 0, food: 0, transportation: 0 });
        localStorage.removeItem('destinations');
    };

    return {
        destinations,
        itineraries,
        budget,
        visible,
        setVisible,
        isEdit,
        setIsEdit,
        row,
        setRow,
        isLoading,
        setIsLoading,
        getDataDestinations,
        addDestination,
        updateDestination,
        deleteDestination,
        createItinerary,
        calculateBudget,
        resetData,
        // Thống kê
        adminStats,
        chartData,
        budgetChartData,
        generateStatistics,
    };
};
