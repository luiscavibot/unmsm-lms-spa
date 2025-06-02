import { baseApi } from '../baseApi';
import lab from '@/services/apiLabels';
import { AttendanceByWeekResponseDto, BulkAttendanceRequestDto, BulkAttendanceResponseDto } from './types';

export const attendanceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAttendanceByBlockId: build.query<AttendanceByWeekResponseDto, { blockId: string }>({
      query: ({ blockId }) => ({ url: `/attendance/block/${blockId}` }),
      providesTags: (_result, _error, { blockId }) => [{ type: lab.Attendance as const, id: blockId }],
    }),
    postBulkAttendance: build.mutation<BulkAttendanceResponseDto, BulkAttendanceRequestDto>({
      query: (body) => ({
        url: '/attendance/bulk',
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error, _arg) => [{ type: lab.Attendance as const, id: _arg.classSessionId }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAttendanceByBlockIdQuery, usePostBulkAttendanceMutation } = attendanceApi;
