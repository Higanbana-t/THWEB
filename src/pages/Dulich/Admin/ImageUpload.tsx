// ImageUpload.tsx
import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export const ImageUpload: React.FC<{ onChange: (base64: string) => void }> = ({ onChange }) => {
    const [imageBase64, setImageBase64] = useState<string | null>(null);

    const handleFileChange = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            console.log("Ảnh đã được chuyển thành base64:", base64); // Kiểm tra base64
            setImageBase64(base64);  // Lưu lại base64
            onChange(base64);        // Truyền base64 ra ngoài
        };
        reader.readAsDataURL(file); // Chuyển file thành base64
    };

    const handleUpload = (file: File) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('Chỉ hỗ trợ tải lên hình ảnh!');
            return false;
        }

        handleFileChange(file); // Xử lý file ảnh
        return false; // Tránh gửi ảnh đi trong form
    };

    return (
        <div>
            <Upload
                showUploadList={false} // Ẩn danh sách upload
                beforeUpload={handleUpload} // Kiểm tra trước khi upload
            >
                <Button icon={<UploadOutlined />}>Tải lên ảnh</Button>
            </Upload>

            {imageBase64 && (
                <div style={{ marginTop: '10px' }}>
                    <img src={imageBase64} alt="Uploaded" style={{ width: '100px', height: '100px' }} />
                </div>
            )}
        </div>
    );
};
