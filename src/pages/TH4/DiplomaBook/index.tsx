import { Button, Modal, Table } from 'antd';
import { useModel } from 'umi';
import DiplomaStudentForm from './DiplomaBookForm';

const DiplomaPage = () => {
    const { diplomas, visibleStudent, setVisibleStudent, visibleDiploma, setVisibleDiploma } = useModel('diplomaBook');

    const columns = [
        { title: 'Tên', dataIndex: 'studentName', key: 'studentName' },
        { title: 'Năm sinh', dataIndex: 'dob', key: 'dob' },
        { title: 'Xếp loại', dataIndex: 'classification', key: 'classification' },
        { title: 'Số hiệu văn bằng', dataIndex: 'diplomaNumber', key: 'diplomaNumber' },
    ];

    return (
        <div>
            <h1>Quản lý văn bằng</h1>
            <Button type="primary" onClick={() => setVisibleStudent(true)}>Thêm sinh viên</Button>
            <Button type="primary" onClick={() => setVisibleDiploma(true)} style={{ marginLeft: 10 }}>Thêm văn bằng</Button>

            <Table dataSource={diplomas} columns={columns} rowKey="diplomaNumber" />

            <Modal destroyOnClose footer={false} title="Thêm sinh viên" visible={visibleStudent} onCancel={() => setVisibleStudent(false)}>
                <DiplomaStudentForm type="student" />
            </Modal>

            <Modal destroyOnClose footer={false} title="Thêm văn bằng" visible={visibleDiploma} onCancel={() => setVisibleDiploma(false)}>
                <DiplomaStudentForm type="diploma" />
            </Modal>
        </div>
    );
};

export default DiplomaPage;
