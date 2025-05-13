import { baseApi } from '../baseApi';
import { ISemesterResp } from './types';
import lab from '@/services/apiLabels';

export const semestersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSemestersByUserEnrolled: build.query<ISemesterResp, void>({
      query: () => '/semesters/by-user/enrolled',
      providesTags: (result) =>
        result
          ? [...result.map((c) => ({ type: lab.Semesters as const, id: c.id })), lab.Semesters]
          : [lab.Semesters],
    }),
  }),
  overrideExisting: false,
});

export const { useGetSemestersByUserEnrolledQuery } = semestersApi;
