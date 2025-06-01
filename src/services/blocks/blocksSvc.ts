// src/services/blocksSvc.ts
import { RootState } from '@/store/store';
import { baseApi } from '../baseApi';
import lab from '@/services/apiLabels';
import { coursesApi } from '../courses/coursesSvc';
import { SyllabusResponseDto } from './types';

// ─── 1. Define la interfaz para la respuesta de syllabus ───────────────

// ─── 2. Inyecta nuevos endpoints en baseApi ────────────────────────────
export const blocksApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    // ── POST /api/blocks/{blockId}/syllabus ──────────────────────────────
    uploadBlockSyllabus: build.mutation<SyllabusResponseDto, { file: File; blockId: string }>({
      query: ({ file, blockId }) => {
        const formData = new FormData();
        formData.append('file', file);
        // Opcional: puedes omitir “blockId” en el formData, ya que va en la URL,
        // pero no hace daño incluirlo para consistencia:
        formData.append('blockId', blockId);

        return {
          url: `/blocks/${blockId}/syllabus`,
          method: 'POST',
          body: formData,
        };
      },
      async onQueryStarted(_arg, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Al subir syllabus, invalida la cache de detalle de curso
          const state = getState() as RootState;
          const courseOfferingId = state.courseOfferings.courseOfferingSelected?.courseId;
          if (courseOfferingId) {
            dispatch(coursesApi.util.invalidateTags([{ type: lab.Courses as const, id: courseOfferingId }]));
          }
        } catch (error) {
          console.error('Error uploading block syllabus:', error);
        }
      },
    }),

    // ── DELETE /api/blocks/{blockId}/syllabus ─────────────────────────────
    deleteBlockSyllabus: build.mutation<SyllabusResponseDto, { blockId: string }>({
      query: ({ blockId }) => ({
        url: `/blocks/${blockId}/syllabus`,
        method: 'DELETE',
      }),
      async onQueryStarted(_arg, { dispatch, getState, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Al eliminar syllabus, invalida la misma cache de detalle de curso
          const state = getState() as RootState;
          const courseOfferingId = state.courseOfferings.courseOfferingSelected?.courseId;
          if (courseOfferingId) {
            dispatch(coursesApi.util.invalidateTags([{ type: lab.Courses as const, id: courseOfferingId }]));
          }
        } catch (error) {
          console.error('Error deleting block syllabus:', error);
        }
      },
    }),
  }),
});

// ─── 3. Exporta los hooks generados ─────────────────────────────────────
export const { useUploadBlockSyllabusMutation, useDeleteBlockSyllabusMutation } = blocksApi;
