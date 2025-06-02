// src/services/materials/materialsSvc.ts

import { baseApi } from '../baseApi';
import lab from '@/services/apiLabels';
import { WeekWithMaterialsDto, MaterialDto } from './types';

export const materialsApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    // ——————————————————————————
    // Query: getMaterialsByBlockId
    // ——————————————————————————
    getMaterialsByBlockId: build.query<WeekWithMaterialsDto[], { blockId: string }>({
      query: ({ blockId }) => ({ url: `/materials/block/${blockId}` }),
      providesTags: (_result, _error, { blockId }) => [{ type: lab.Materials as const, id: blockId }],
    }),

    // —————————————————————————————
    // Mutation: uploadMaterial
    // —————————————————————————————
    // Ahora esperamos FormData que contenga:
    //   - weekId       (para el backend)
    //   - blockId      (solo para invalidar luego)
    //   - title, type, url o file
    uploadMaterial: build.mutation<MaterialDto, FormData>({
      query: (formData) => ({
        url: '/materials/upload',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: (_result, _error, formData) => {
        // Extraemos blockId (no lo envía el backend, pero lo metimos en FormData para invalidar)
        const blockId = formData.get('blockId') as string;
        return [{ type: lab.Materials as const, id: blockId }];
      },
    }),

    // ————————————————————————————————
    // Mutation: deleteMaterialFile
    // ————————————————————————————————
    // Este mutation recibe { id: materialId, weekId, blockId }
    deleteMaterialFile: build.mutation<{}, { id: string; weekId: string; blockId: string }>({
      query: ({ id }) => ({
        url: `/materials/file/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { blockId }) => [{ type: lab.Materials as const, id: blockId }],
    }),
  }),
});

export const { useGetMaterialsByBlockIdQuery, useUploadMaterialMutation, useDeleteMaterialFileMutation } = materialsApi;
