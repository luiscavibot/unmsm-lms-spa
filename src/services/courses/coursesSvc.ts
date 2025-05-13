import { baseApi } from '../baseApi';
import { ICourseResp } from './types';

export const coursesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCourses: build.query<ICourseResp[], void>({
      query: () => '/courses',
      providesTags: (result) =>
        result ? [...result.map((c) => ({ type: 'Course' as const, id: c.id })), 'Course'] : ['Course'],
    }),

    getCourseById: build.query<ICourseResp, string>({
      query: (id) => `/courses/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Course', id }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCoursesQuery, useGetCourseByIdQuery } = coursesApi;
