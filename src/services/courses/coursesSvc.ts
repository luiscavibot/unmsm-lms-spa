import { baseApi } from '../baseApi';
import { ICourseResp } from './types';
import lab from '@/services/apiLabels';

export const coursesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCourses: build.query<ICourseResp[], void>({
      query: () => '/courses',
      providesTags: (result) =>
        result ? [...result.map((c) => ({ type: lab.Courses as const, id: c.id })), lab.Courses] : [lab.Courses],
    }),

    getCourseById: build.query<ICourseResp, string>({
      query: (id) => `/courses/${id}`,
      providesTags: (_result, _error, id) => [{ type: lab.Courses, id }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCoursesQuery, useGetCourseByIdQuery } = coursesApi;
