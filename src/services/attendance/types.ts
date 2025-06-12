export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  JUSTIFIED = 'JUSTIFIED',
}

export interface AttendanceDetailDto {
  startDateTime: string;
  endDateTime: string;
  status: AttendanceStatus;
}

export interface WeekAttendanceDto {
  weekId: string;
  weekName: string;
  weekNumber: number;
  attendances: AttendanceDetailDto[];
}

export interface AttendanceByWeekResponseDto {
  attendancePercentage: string;
  weeks: WeekAttendanceDto[];
}
export interface AttendanceEntity {
  id: string;
  classSessionId: string;
  enrollmentId: string;
  status: AttendanceStatus;
  timestamp: string;
}
export interface BulkAttendanceResponseDto {
  attendances: AttendanceEntity[];
  totalProcessed: number;
  sessionInfo: string;
}
export interface BulkAttendanceRecord {
  enrollmentId: string;
  status: AttendanceStatus;
}
export interface BulkAttendanceRequestDto {
  classSessionId: string;
  attendanceRecords: BulkAttendanceRecord[];
}
