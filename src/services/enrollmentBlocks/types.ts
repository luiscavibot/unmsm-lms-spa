import { AttendanceStatus } from '../attendance/types';

export interface EnrolledStudentDto {
  userId: string;
  enrollmentId: string;
  userName: string;
  attendanceStatus: AttendanceStatus | null;
}

export interface EnrolledStudentsResponseDto {
  date: string | null;
  classSessionId: string | null;
  studentNumber: number;
  students: EnrolledStudentDto[];
}

export interface EnrolledStudentsResponseDto {
  /** Fecha de la sesión de asistencia (formato YYYY-MM-DD), o null si no hay sesión */
  date: string | null;
  /** ID de la sesión de clase relacionada, o null si no existe */
  classSessionId: string | null;
  /** Número total de estudiantes matriculados en este bloque */
  studentNumber: number;
  /** Array de estudiantes matriculados con su estado de asistencia */
  students: EnrolledStudentDto[];
}
