import { createApi, fetchBaseQuery, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/store/store';
import lab from '@/services/apiLabels';
import { API_URL } from '@/configs/consts';
import { logoutAsync } from '@/store/thunks/logoutAsync';
import { refreshAsync } from '@/store/thunks/refreshAuthAsync';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
      headers.set('lms-timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: any, extraOptions: any) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && (result.error as FetchBaseQueryError).status === 401) {
    try {
      await api.dispatch(refreshAsync()).unwrap();

      result = await rawBaseQuery(args, api, extraOptions);
    } catch {
      api.dispatch(logoutAsync());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    lab.Courses,
    lab.Semesters,
    lab.Users,
    lab.Materials,
    lab.Attendance,
    lab.Grades,
    lab.BlockAssignments,
    lab.Evaluations,
  ],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
