import { baseApi } from '../baseApi';
import lab from '@/services/apiLabels';
import { WeekWithMaterialsDto } from './types';

export const materialsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMaterialsByBlockId: build.query<WeekWithMaterialsDto[], { blockId: string }>({
      query: ({ blockId }) => ({ url: `/materials/block/${blockId}` }),
      providesTags: (_result, _error, { blockId }) => [{ type: lab.Materials as const, id: blockId }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetMaterialsByBlockIdQuery } = materialsApi;
