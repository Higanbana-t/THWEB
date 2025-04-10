import React from 'react';
import { Form, Input, Button, Select, Radio } from 'antd';
import type { Registration, Club } from '@/services/TH5/interfaces';

const { TextArea } = Input;

interface Props {
	initialValues?: Partial<Registration>;
	clubs: Club[]; // Danh sách CLB để chọn
	onFinish: (values: Registration) => void;
	loading?: boolean;
	mode?: 'create' | 'edit';
}

const RegistrationForm: React.FC<Props> = ({ initialValues, clubs, onFinish, loading = false, mode = 'create' }) => {
	const [form] = Form.useForm();

	return (
		<Form form={form} layout='vertical' initialValues={initialValues} onFinish={onFinish}>
			<Form.Item label='Họ tên' name='fullName' rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
				<Input />
			</Form.Item>

			<Form.Item label='Email' name='email' rules={[{ type: 'email', message: 'Email không hợp lệ' }]}>
				<Input />
			</Form.Item>

			<Form.Item
				label='Số điện thoại'
				name='phone'
				rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item label='Giới tính' name='gender' rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}>
				<Radio.Group>
					<Radio value='Nam'>Nam</Radio>
					<Radio value='Nữ'>Nữ</Radio>
					<Radio value='Khác'>Khác</Radio>
				</Radio.Group>
			</Form.Item>

			<Form.Item label='Địa chỉ' name='address' rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}>
				<Input />
			</Form.Item>

			<Form.Item label='Sở trường' name='strengths' rules={[{ required: true, message: 'Vui lòng nhập sở trường' }]}>
				<Input />
			</Form.Item>

			<Form.Item label='Câu lạc bộ đăng ký' name='clubId' rules={[{ required: true, message: 'Vui lòng chọn CLB' }]}>
				<Select placeholder='Chọn CLB'>
					{clubs.map((club) => (
						<Select.Option key={club.id} value={club.id}>
							{club.name}
						</Select.Option>
					))}
				</Select>
			</Form.Item>

			<Form.Item label='Lý do đăng ký' name='reason' rules={[{ required: true, message: 'Vui lòng nhập lý do' }]}>
				<TextArea rows={3} />
			</Form.Item>

			<Form.Item>
				<Button type='primary' htmlType='submit' loading={loading}>
					{mode === 'create' ? 'Thêm mới' : 'Cập nhật'}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default RegistrationForm;
