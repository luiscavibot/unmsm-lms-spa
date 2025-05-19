export interface EvaluationGradeDto {
  name: string;
  weight: number;
  evaluationDate: string;
  grade: number;
}

export interface StudentGradesResponseDto {
  averageGrade: number;
  evaluations: EvaluationGradeDto[];
}
