import { Button, Form, Input, DatePicker, Select } from 'antd';
import { useModel } from 'umi';
import { useEffect, useState } from 'react';

const DiplomaStudentForm = ({ type }: { type: 'student' | 'diploma' }) => {
    const { students, addStudent, addDiploma, setVisibleStudent, setVisibleDiploma, diplomas } = useModel('diplomaBook');
    const [form] = Form.useForm();
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const graduationYears = [2020, 2021, 2022, 2023, 2024, 2025];

    useEffect(() => {
        form.resetFields();
    }, [type]);

    const handleSubmit = (values: any) => {
        if (type === 'student') {
            addStudent({
                id: Date.now(), 
                name: values.studentName, 
                dob: values.dob.format('YYYY-MM-DD'),
                educationSystem: values.educationSystem,
                birthplace: values.birthplace,
                ethnicity: values.ethnicity,
            });
            setVisibleStudent(false);
        } else {
            const student = students.find((s) => s.name === values.studentName);
            if (!student) return;

            addDiploma(
                values.year, 
                values.graduationDecisionId, 
                {
                    studentCode: student.id.toString(),
                    studentName: student.name,
                    dob: student.dob, // Include the dob field
                    classification: values.classification,
                    gpa: values.gpa,
                }
            );
            setVisibleDiploma(false);
        }
        form.resetFields();
    };

    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            {type === 'student' ? (
                <>
                    <Form.Item name="studentName" label="Họ tên" rules={[{ required: true }]}> 
                        <Input />
                    </Form.Item>
                    <Form.Item name="dob" label="Ngày sinh" rules={[{ required: true }]}> 
                        <DatePicker />
                    </Form.Item>
                    <Form.Item name="educationSystem" label="Hệ đào tạo" rules={[{ required: true }]}> 
                        <Select>
                            <Select.Option value="Chính quy">Chính quy</Select.Option>
                            <Select.Option value="Liên thông">Liên thông</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="birthplace" label="Nơi sinh"> 
                        <Input />
                    </Form.Item>
                    <Form.Item name="ethnicity" label="Dân tộc"> 
                        <Input />
                    </Form.Item>
                </>
            ) : (
                <>
                    <Form.Item name="studentName" label="Sinh viên" rules={[{ required: true }]}> 
                        <Select onChange={(value) => setSelectedStudent(students.find(s => s.name === value))}>
                            {students.map((student) => (
                                <Select.Option key={student.name} value={student.name}> 
                                    {student.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="year" label="Năm tốt nghiệp" rules={[{ required: true }]}> 
                        <Select>
                            {graduationYears.map((year) => (
                                <Select.Option key={year} value={year}>{year}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="classification" label="Xếp loại" rules={[{ required: true }]}> 
                        <Select>
                            <Select.Option value="Xuất sắc">Xuất sắc</Select.Option>
                            <Select.Option value="Giỏi">Giỏi</Select.Option>
                            <Select.Option value="Khá">Khá</Select.Option>
                            <Select.Option value="Trung bình">Trung bình</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="gpa" label="Điểm trung bình" rules={[{ required: true }]}> 
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="graduationDecisionId" label="Số quyết định tốt nghiệp" rules={[{ required: true }]}> 
                        <Input />
                    </Form.Item>
                </>
            )}
            <Form.Item>
                <Button type="primary" htmlType="submit">{type === 'student' ? 'Thêm sinh viên' : 'Thêm văn bằng'}</Button>
            </Form.Item>
        </Form>
    );
};

export default DiplomaStudentForm;
