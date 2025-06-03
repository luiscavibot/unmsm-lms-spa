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
  canEditAttendance: boolean;
  attendanceStatusMessage: string | null;
}

export interface ClassDayInfo {
  date: string;
  startTime: string;
  endTime: string;
  sessionId: string;
  virtualRoomUrl?: string;
}

export interface ClassDaysResponseDto {
  classDays: ClassDayInfo[];
}
