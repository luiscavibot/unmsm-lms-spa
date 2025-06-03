import { baseApi } from '../baseApi';
import lab from '@/services/apiLabels';
import { ClassDaysResponseDto, EnrolledStudentsResponseDto } from './types';

export const enrollmentBlocksApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getEnrolledStudentsAttendance: build.query<EnrolledStudentsResponseDto, { blockId: string; date?: string }>({
      query: ({ blockId, date }) => ({
        url: `/enrollment-blocks/students/attendance/${blockId}`,
        method: 'GET',
        params: date ? { date } : {},
      }),
      providesTags: (_result, _error, { blockId }) => [{ type: lab.Attendance as const, id: blockId }],
    }),
    getClassSessionsDates: build.query<ClassDaysResponseDto, { blockId: string }>({
      query: ({ blockId }) => ({
        url: `/class-sessions/block/${blockId}/dates`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { blockId }) => [{ type: lab.Attendance as const, id: blockId }],
    }),
  }),
});

export const { useGetEnrolledStudentsAttendanceQuery, useGetClassSessionsDatesQuery } = enrollmentBlocksApi;
