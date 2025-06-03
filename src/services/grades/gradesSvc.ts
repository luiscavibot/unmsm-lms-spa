// src/services/grades/gradesApi.ts

import { baseApi } from '../baseApi';
import lab from '@/services/apiLabels';

import { StudentGradesResponseDto, Grade, BlockGradeDto, BlockGradeResponseDto } from './types';

export const gradesApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    // ————————————————————————————————————————
    // GET /evaluations/student-grades/{blockId}
    // ————————————————————————————————————————
    getStudentGradesByBlockId: build.query<StudentGradesResponseDto, { blockId: string }>({
      query: ({ blockId }) => ({
        url: `/evaluations/student-grades/${blockId}`,
      }),
      providesTags: (_result, _error, { blockId }) => [{ type: lab.Grades as const, id: blockId }],
    }),

    // ————————————————————————————————————————————————
    // GET /grades?evaluationId={evaluationId}&enrollmentId={enrollmentId}
    // ————————————————————————————————————————————————
    getGrades: build.query<Grade[], { evaluationId?: string; enrollmentId?: string }>({
      query: ({ evaluationId, enrollmentId }) => ({
        url: '/grades',
        method: 'GET',
        params: {
          ...(evaluationId ? { evaluationId } : {}),
          ...(enrollmentId ? { enrollmentId } : {}),
        },
      }),
      providesTags: (_result, _error, { evaluationId, enrollmentId }) => {
        const tags: { type: typeof lab.Grades; id: string }[] = [];
        if (evaluationId) tags.push({ type: lab.Grades, id: evaluationId });
        if (enrollmentId) tags.push({ type: lab.Grades, id: enrollmentId });
        return tags.length ? tags : [{ type: lab.Grades as const, id: 'LIST' }];
      },
    }),

    // ————————————————————————————————————————————————
    // POST /grades/block/{blockId}
    // ————————————————————————————————————————————————
    postBlockGrades: build.mutation<BlockGradeResponseDto, BlockGradeDto>({
      query: (body) => ({
        url: `/grades/block/${body.blockId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error, { blockId }) => [{ type: lab.Grades as const, id: blockId }],
    }),
  }),
});

export const { useGetStudentGradesByBlockIdQuery, useGetGradesQuery, usePostBlockGradesMutation } = gradesApi;
