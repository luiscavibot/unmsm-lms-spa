import { baseApi } from '../baseApi';
import type { ICoursesByProgramTypeResp, CourseStatus, ProgramType, CourseDetailResponseDto } from './types';
import lab from '@/services/apiLabels';

type GetCoursesByProgramTypeParams = {
  status?: CourseStatus;
  programType?: ProgramType;
  semester?: string;
  page?: number;
  limit?: number;
  keyword?: string;
};

export const coursesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCoursesByProgramType: build.query<ICoursesByProgramTypeResp, GetCoursesByProgramTypeParams>({
      query: ({ status = 'current', programType = 'POSGRADO-DIPLOMADO', semester, page = 1, limit = 20, keyword }) => ({
        url: '/courses/by-program-type',
        params: { status, programType, semester, page, limit, keyword },
      }),
      providesTags: (result) => (result ? [lab.Courses, ...result.programs.map((p) => ({ type: lab.Courses, id: p.programId }))] : [lab.Courses]),
    }),

    getCoursesDetailCourseOfferingId: build.query<CourseDetailResponseDto, { courseOfferingId: string }>({
      query: ({ courseOfferingId }) => ({
        url: `/courses/detail/${courseOfferingId}`,
      }),
      providesTags: (_result, _error, { courseOfferingId }) => [{ type: lab.Courses, id: courseOfferingId }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCoursesByProgramTypeQuery, useGetCoursesDetailCourseOfferingIdQuery } = coursesApi;
