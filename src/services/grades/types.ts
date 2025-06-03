// src/services/grades/types.ts

export interface EvaluationGradeDtoForStudent {
  name: string;
  weight: number;
  evaluationDate: string;
  grade: number;
}

export interface StudentGradesResponseDto {
  averageGrade: number;
  evaluations: EvaluationGradeDtoForStudent[];
}

export interface Grade {
  id: string;
  evaluationId: string;
  enrollmentId: string;
  score: number;
}

export interface EvaluationGradeDto {
  evaluationId: string;
  score: number;
}

export interface StudentGradeDto {
  enrollmentId: string;
  gradeRecords: EvaluationGradeDto[];
}

export interface BlockGradeDto {
  blockId: string;
  studentGrades: StudentGradeDto[];
}

export interface StudentAverageDto {
  enrollmentId: string;
  blockAverage: number;
  courseAverage: number;
}

export interface BlockGradeResponseDto {
  grades: Grade[];
  totalProcessed: number;
  blockInfo: string;
  studentAverages: StudentAverageDto[];
}
