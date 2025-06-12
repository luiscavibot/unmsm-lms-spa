import { AttendanceStatus } from '../attendance/types';

export interface EnrolledStudentDto {
  userId: string;
  enrollmentId: string;
  userName: string;
  attendanceStatus: AttendanceStatus | null;
}

export interface EnrolledStudentsResponseDto {
  startDateTime: string | null;
  endDateTime: string | null;
  classSessionId: string | null;
  studentNumber: number;
  students: EnrolledStudentDto[];
  canEditAttendance: boolean;
  attendanceStatusMessage: string | null;
  messageType: string | null;
}

export interface ClassDaysResponseDto {
  classDays: string[];
}

export interface StudentEvaluationDto {
  /** ID de la evaluación */
  evaluationId: string;
  /** Nota obtenida en la evaluación */
  score: number;
}
export interface EnrolledStudentGradeDto {
  /** Nombre completo del estudiante */
  userName: string;
  /** ID de la matrícula del estudiante */
  enrollmentId: string;
  /** Promedio de notas del estudiante */
  averageScore: number;
  /** Lista de evaluaciones con su nota */
  evaluations: StudentEvaluationDto[];
}
export interface EnrolledStudentsGradesResponseDto {
  /** Número total de estudiantes matriculados */
  studentNumber: number;
  /** Arreglo de estudiantes con sus notas */
  students: EnrolledStudentGradeDto[];
}
