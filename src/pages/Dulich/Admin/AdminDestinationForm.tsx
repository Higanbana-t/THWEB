// AdminDestinationForm.tsx
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, Select, InputNumber, message, Rate } from 'antd';
import { AdminDestination } from '../../../services/Dulich/typings'; // Import interface
import { ImageUpload } from './ImageUpload'; // Import component xử lý ảnh base64

const { TextArea } = Input;
const { Option } = Select;

interface AdminDestinationFormProps {
    initialData?: AdminDestination;
    onSubmit: (values: AdminDestination) => void;
}

const AdminDestinationForm: React.FC<AdminDestinationFormProps> = ({ initialData, onSubmit }) => {
    const [form] = Form.useForm();
    const [imageBase64, setImageBase64] = useState<string | null>(null);

    useEffect(() => {
        // Nếu có initialData, điền vào form và set base64 ảnh
        if (initialData) {
            form.setFieldsValue(initialData);
            setImageBase64(typeof initialData.image === 'string' ? initialData.image : null); // Giả sử image là base64 từ backend
        }
    }, [initialData, form]);

    const handleFinish = (values: any) => {
        console.log("Dữ liệu form trước khi submit:", values); // Kiểm tra giá trị form
        console.log("Ảnh trong form (base64):", imageBase64); // Kiểm tra base64 ảnh
        // Gửi dữ liệu sau khi hoàn thành form
        onSubmit({ ...values, image: imageBase64 });
    };

    const handleImageChange = (base64: string) => {
        console.log("Ảnh đã thay đổi (base64):", base64); // Kiểm tra base64 ảnh khi thay đổi
        setImageBase64(base64); // Lưu base64 khi ảnh thay đổi
    };

    return (
        <Form
            form={form}
            initialValues={initialData}
            layout="vertical"
            onFinish={handleFinish}
        >
            <Form.Item
                label="Tên điểm đến"
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập tên điểm đến!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Mô tả"
                name="description"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả điểm đến!' }]}
            >
                <TextArea rows={4} />
            </Form.Item>

            <Form.Item label="Hình ảnh" name="image">
                <ImageUpload onChange={handleImageChange} />
            </Form.Item>

            <Form.Item
                label="Loại điểm đến"
                name="category"
                rules={[{ required: true, message: 'Vui lòng chọn loại điểm đến!' }]}
            >
                <Select>
                    <Option value="bbeach">Biển</Option>
                    <Option value="mountain">Núi</Option>
                    <Option value="city">Thành phố</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Giá chuyến đi"
                name="price"
                rules={[{ required: true, message: 'Vui lòng nhập giá chuyến đi!' }]}
            >
                <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                label="Đánh giá"
                name="rating"
                rules={[{ required: true, message: 'Vui lòng nhập đánh giá!' }]}
            >
                <Rate style={{ width: '100%' }} />
            </Form.Item>


            <Form.Item
                label="Thời gian tham quan (Giờ)"
                name="visitTime"
                rules={[{ required: true, message: 'Vui lòng nhập thời gian tham quan!' }]}
            >
                <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                label="Chi phí lưu trú"
                name="accommodationCost"
                rules={[{ required: true, message: 'Vui lòng nhập chi phí lưu trú!' }]}
            >
                <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                label="Chi phí ăn uống"
                name="foodCost"
                rules={[{ required: true, message: 'Vui lòng nhập chi phí ăn uống!' }]}
            >
                <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                label="Chi phí di chuyển"
                name="transportationCost"
                rules={[{ required: true, message: 'Vui lòng nhập chi phí di chuyển!' }]}
            >
                <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Lưu điểm đến
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AdminDestinationForm;
