import { Modal, Form, Input, DatePicker, Upload, Switch } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import type { UploadFile } from 'antd/es/upload/interface';
import type { Club } from '@/services/TH5/typings';
import dayjs from 'dayjs';
import TinyEditor from '@/components/TinyEditor';

interface Props {
	open: boolean;
	onClose: () => void;
	onFinish: (club: Club) => void;
	initialValues?: Club;
}

const ClubForm: React.FC<Props> = ({ open, onClose, onFinish, initialValues }) => {
	const [form] = Form.useForm();
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [imageUrl, setImageUrl] = useState<string>();

	useEffect(() => {
		if (initialValues) {
			form.setFieldsValue({
				...initialValues,
				foundedDate: initialValues.foundedDate ? dayjs(initialValues.foundedDate) : undefined,
			});
			setImageUrl(initialValues.avatar);
			setFileList(
				initialValues.avatar
					? [
							{
								uid: '-1',
								name: 'avatar.png',
								status: 'done',
								url: initialValues.avatar,
							},
					  ]
					: [],
			);
		} else {
			form.resetFields();
			setImageUrl(undefined);
			setFileList([]);
		}
	}, [initialValues, form]);

	const handleSubmit = async () => {
		const values = await form.validateFields();
		onFinish({
			...values,
			foundedDate: values.foundedDate?.toISOString(),
			avatar: imageUrl || '',
			id: initialValues?.id || Date.now().toString(),
		});
		onClose();
	};

	const customUpload = ({ onSuccess }: any) => {
		setTimeout(() => {
			const url = 'https://via.placeholder.com/150';
			setImageUrl(url);
			onSuccess('ok');
		}, 1000);
	};

	return (
		<Modal
			visible={open}
			onCancel={onClose}
			onOk={handleSubmit}
			title={initialValues ? 'Cập nhật CLB' : 'Thêm CLB'}
			destroyOnClose
			width={600}
		>
			<Form layout='vertical' form={form}>
				<Form.Item name='name' label='Tên CLB' rules={[{ required: true, message: 'Bắt buộc' }]}>
					<Input />
				</Form.Item>
				<Form.Item name='foundedDate' label='Ngày thành lập' rules={[{ required: true, message: 'Bắt buộc' }]}>
					<DatePicker style={{ width: '100%' }} />
				</Form.Item>
				<Form.Item label='Ảnh đại diện'>
					<Upload
						customRequest={customUpload}
						listType='picture'
						fileList={fileList}
						onChange={({ fileList: newFileList }) => setFileList(newFileList)}
						showUploadList={{ showRemoveIcon: false }}
					>
						<UploadOutlined /> Tải ảnh
					</Upload>
				</Form.Item>
				<Form.Item name='description' label='Mô tả CLB' rules={[{ required: true, message: 'Bắt buộc' }]}>
					<TinyEditor />
				</Form.Item>
				<Form.Item name='leader' label='Người phụ trách' rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name='isActive' label='Trạng thái hoạt động' valuePropName='checked' initialValue={true}>
					<Switch />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default ClubForm;
