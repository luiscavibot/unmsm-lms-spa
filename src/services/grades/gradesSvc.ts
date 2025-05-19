import { baseApi } from '../baseApi';
import { StudentGradesResponseDto } from './types';
import lab from '@/services/apiLabels';

export const gradesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStudentGradesByBlockId: build.query<StudentGradesResponseDto, { blockId: string }>({
      query: ({ blockId }) => ({
        url: `/evaluations/student-grades/${blockId}`,
      }),
      providesTags: (_result, _error, { blockId }) => [{ type: lab.Grades as const, id: blockId }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetStudentGradesByBlockIdQuery } = gradesApi;
