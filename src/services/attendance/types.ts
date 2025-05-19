export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
}

export interface AttendanceDetailDto {
  date: string;
  formattedDate: string;
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
