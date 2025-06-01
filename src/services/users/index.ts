import { RootState } from '@/store/store';
import { baseApi } from '../baseApi';
import { ResumeResponseDto } from './types';
import lab from '@/services/apiLabels';
import { coursesApi } from '../courses/coursesSvc';

export const usersApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    uploadUserResume: build.mutation<ResumeResponseDto, { file: File; blockId: string }>({
      query: ({ file, blockId }) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('blockId', blockId);

        return {
          url: '/users/resume', // si tu baseApi ya tiene baseUrl: '/api', equivale a POST /api/users/resume
          method: 'POST',
          body: formData,
        };
      },
      async onQueryStarted(_arg, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled;

          const state = getState() as RootState;
          const courseOfferingId = state.courseOfferings.courseOfferingSelected?.courseId;

          if (courseOfferingId) {
            dispatch(coursesApi.util.invalidateTags([{ type: lab.Courses as const, id: courseOfferingId }]));
          }
        } catch (error) {
          console.error('Error uploading user resume:', error);
        }
      },
    }),
  }),
});

export const { useUploadUserResumeMutation } = usersApi;
