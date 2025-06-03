// src/services/enrollmentBlocks/enrollmentBlocksApi.ts

import { baseApi } from '../baseApi';
import lab from '@/services/apiLabels';
import {
  ClassDaysResponseDto,
  EnrolledStudentsGradesResponseDto,
  EnrolledStudentsResponseDto, // ← Importamos el nuevo DTO
} from './types';

export const enrollmentBlocksApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    // 1) Obtiene asistencias por bloque y fecha opcional
    getEnrolledStudentsAttendance: build.query<EnrolledStudentsResponseDto, { blockId: string; date?: string }>({
      query: ({ blockId, date }) => ({
        url: `/enrollment-blocks/students/attendance/${blockId}`,
        method: 'GET',
        params: date ? { date } : {},
      }),
      providesTags: (_result, _error, { blockId }) => [{ type: lab.Attendance as const, id: blockId }],
    }),

    // 2) Obtiene las fechas disponibles de sesiones de clase para un bloque
    getClassSessionsDates: build.query<ClassDaysResponseDto, { blockId: string }>({
      query: ({ blockId }) => ({
        url: `/class-sessions/block/${blockId}/dates`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { blockId }) => [{ type: lab.Attendance as const, id: blockId }],
    }),

    // 3) =================== NUEVO ENDPOINT ===================
    //    GET /api/enrollment-blocks/students/grades/{blockId}
    getEnrolledStudentsGrades: build.query<EnrolledStudentsGradesResponseDto, { blockId: string }>({
      query: ({ blockId }) => ({
        url: `/enrollment-blocks/students/grades/${blockId}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { blockId }) => [{ type: lab.Attendance as const, id: blockId }],
    }),
    // ============================================================
  }),
});

export const {
  useGetEnrolledStudentsAttendanceQuery,
  useGetClassSessionsDatesQuery,
  useGetEnrolledStudentsGradesQuery, // ← Exportamos el nuevo hook
} = enrollmentBlocksApi;
