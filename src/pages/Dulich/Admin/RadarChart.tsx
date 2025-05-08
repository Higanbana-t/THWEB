import React from 'react';
import { Radar } from '@ant-design/plots';

const RadarChart: React.FC = () => {
    const data = [
        { name: 'Điểm đến 1', label: 'Địa lý', value: 0.8 },
        { name: 'Điểm đến 1', label: 'Văn hóa', value: 0.6 },
        { name: 'Điểm đến 1', label: 'Giá cả', value: 0.9 },
        { name: 'Điểm đến 1', label: 'Cảnh quan', value: 0.7 },
        { name: 'Điểm đến 1', label: 'Đánh giá', value: 0.85 },
    ];

    const config = {
        data,
        angleField: 'label',
        valueField: 'value',
        seriesField: 'name',
        radius: 0.8,
        meta: {
            label: {
                alias: 'Chỉ tiêu',
            },
            value: {
                alias: 'Điểm số',
            },
        },
        encode: {
            x: 'label',  // Đảm bảo encode cho trục x
            y: 'value',  // Đảm bảo encode cho trục y
        },
    };

    return (
        <div style={{ height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Radar {...config} />
        </div>
    );

};

export default RadarChart;
