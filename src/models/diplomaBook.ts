import { useState } from 'react';
import type { Diploma as OriginalDiploma, Student } from '@/services/TH4/typings';

type Diploma = OriginalDiploma & {
    year: number;
};

export default function useDiplomaModel() {
    const [students, setStudents] = useState<Student[]>([]);
    const [diplomas, setDiplomas] = useState<Diploma[]>([]);
    const [visibleStudent, setVisibleStudent] = useState(false);
    const [visibleDiploma, setVisibleDiploma] = useState(false);

    const addStudent = (student: Student) => {
        setStudents((prev) => [...prev, student]);
    };

    const addDiploma = (year: number, graduationDecisionId: string, diploma: Omit<Diploma, 'diplomaNumber' | 'year' | 'graduationDecisionId'>) => {
        setDiplomas((prev) => {
            // Lọc các văn bằng thuộc năm được chọn
            const diplomasInYear = prev.filter(d => d.year === year);
            const nextEntryNumber = diplomasInYear.length + 1;
            const diplomaNumber = `${year}-${String(nextEntryNumber).padStart(3, '0')}-${graduationDecisionId}`; // VD: 2025-001
    
            return [...prev, { ...diploma, diplomaNumber, year, graduationDecisionId }];
        });
    };
    

    return {
        students,
        diplomas,
        addStudent,
        addDiploma,
        visibleStudent,
        setVisibleStudent,
        visibleDiploma,
        setVisibleDiploma,
    };
}
