// src/pages/AdminDestinationPage.tsx
import React, { useEffect, useState } from 'react';
import { Button, Modal, Card, Row, Col, Popconfirm, message, Rate } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AdminDestinationForm from './AdminDestinationForm';
import { useModel } from 'umi';
import { AdminDestination } from '@/services/Dulich/typings';
import RadarChart from './RadarChart'; // Import biểu đồ radar

const AdminDestinationPage: React.FC = () => {
    const {
        destinations,
        getDataDestinations,
        addDestination,
        updateDestination,
        deleteDestination,
        visible,
        setVisible,
        isEdit,
        setIsEdit,
    } = useModel('Dulich');
    const [row, setRow] = useState<AdminDestination | null>(null);
    const [showRadar, setShowRadar] = useState(false); // Trạng thái để hiển thị/ẩn Radar

    useEffect(() => {
        getDataDestinations();
    }, []);

    const handleCreate = () => {
        setIsEdit(false);
        setRow(null);
        setVisible(true);
    };

    const handleEdit = (record: AdminDestination) => {
        setIsEdit(true);
        setRow(record);
        setVisible(true);
    };

    const handleDelete = (id: string) => {
        deleteDestination(id);
        message.success('Đã xóa điểm đến!');
    };

    const handleSubmit = (values: any) => {
        const newData: AdminDestination = {
            ...values,
            id: isEdit && row ? row.id : Date.now().toString(),
            image: typeof values.image === 'string' ? values.image : '',
        };

        if (isEdit) {
            updateDestination({
                ...newData,
                image: typeof newData.image === 'string' ? newData.image : '',
            });
            message.success('Cập nhật thành công!');
        } else {
            addDestination({
                ...newData,
                image: typeof newData.image === 'string' ? newData.image : '',
            });
            message.success('Thêm mới thành công!');
        }

        setVisible(false);
        setRow(null);
        setIsEdit(false);
    };

    return (
        <div>
            <h2>Quản lý điểm đến</h2>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
                Thêm điểm đến
            </Button>

            <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
                {destinations.map((item) => (
                    <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            cover={
                                item.image ? (
                                    <img alt={item.name} src={item.image} style={{ height: 180, objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ height: 180, backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <span>Không có ảnh</span>
                                    </div>
                                )
                            }

                            actions={[
                                <EditOutlined key="edit" onClick={() => handleEdit(item)} />,
                                <Popconfirm
                                    title="Bạn có chắc muốn xóa?"
                                    onConfirm={() => handleDelete(item.id)}
                                    okText="Xóa"
                                    cancelText="Hủy"
                                >
                                    <DeleteOutlined key="delete" />
                                </Popconfirm>,
                            ]}
                        >
                            <Card.Meta
                                title={item.name}
                                description={
                                    <div>
                                        <div><strong>Loại:</strong> {item.category === 'beach' ? 'Beach' :
                                            item.category === 'mountain' ? 'Mountain' :
                                                item.category === 'city' ? 'City' : item.category}</div>
                                        <div><strong>Giá:</strong> {item.price?.toLocaleString()} VND</div>
                                        <div><strong>Đánh giá:</strong> <Rate disabled defaultValue={item.rating || 0} /></div>
                                    </div>
                                }
                            />
                        </Card>

                    </Col>
                ))}
            </Row>

            {/* Nút bấm để hiển thị/ẩn Radar Chart */}
            <Button
                style={{ marginTop: 20 }}
                type="primary"
                onClick={() => setShowRadar(!showRadar)}
            >
                {showRadar ? 'Ẩn Biểu Đồ Radar' : 'Hiển Thị Biểu Đồ Radar'}
            </Button>

            {/* Hiển thị biểu đồ Radar nếu trạng thái showRadar là true */}
            {showRadar && <RadarChart />}

            <Modal
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                title={isEdit ? 'Chỉnh sửa điểm đến' : 'Thêm điểm đến'}
                destroyOnClose
            >
                <AdminDestinationForm
                    initialData={isEdit && row && 'name' in row ? (row as AdminDestination) : undefined}
                    onSubmit={handleSubmit}
                />
            </Modal>
        </div>
    );
};

export default AdminDestinationPage;
