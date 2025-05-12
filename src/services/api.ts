import { RootState } from '@/store/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Course', 'User'],
  endpoints: (builder) => ({
    getCourses: builder.query<any[], void>({
      query: () => '/courses',
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: 'Course' as const, id })), 'Course'] : ['Course'],
    }),
    // …otros endpoints…
  }),
});

export const { useGetCoursesQuery } = api;
