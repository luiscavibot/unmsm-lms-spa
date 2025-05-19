import { baseApi } from '../baseApi';
import lab from '@/services/apiLabels';
import { AttendanceByWeekResponseDto } from './types';

export const attendanceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAttendanceByBlockId: build.query<AttendanceByWeekResponseDto, { blockId: string }>({
      query: ({ blockId }) => ({ url: `/attendance/block/${blockId}` }),
      providesTags: (_result, _error, { blockId }) => [{ type: lab.Attendance as const, id: blockId }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAttendanceByBlockIdQuery } = attendanceApi;
