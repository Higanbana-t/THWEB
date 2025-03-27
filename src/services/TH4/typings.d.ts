export interface DiplomaBook {
    year: number;
    entryNumber: number;
    diplomas: Diploma[];
}

export interface Diploma {
    diplomaNumber: string;
    studentCode: string;
    studentName: string;
    dob: string;
    gpa: number;
    graduationDecisionId: string;
    classification: string; //
    customFields?: CustomField[];
}


export interface CustomField {
    name: string;
    type: 'String' | 'Number' | 'Date';
    value: string | number | Date;
}

export interface GraduationDecision {
    decisionNumber: string;
    decisionDate: string;
    summary: string;
    diplomaBookId: number;
}

export interface FormField {
    id: string;
    label: string;
    type: 'String' | 'Number' | 'Date';
    required: boolean;
}

export interface FormConfig {
    fields: FormField[];
}

export interface Student {
    id: number;
    name: string;  // 🔍 Có thể là name, không phải studentName
    dob: string;
    educationSystem: string;
    birthplace?: string;
    ethnicity?: string;
}


export interface SearchResult {
    entryNumber: number;
    diplomaNumber: string;
    studentCode: string;
    studentName: string;
    dob: string;
    decision: GraduationDecision;
}
