import { baseApi } from '../baseApi';
import { CreateOrUpdateEvaluationDto, Evaluation } from './types';
import lab from '@/services/apiLabels';
export const evaluationsApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    // ————————————————————————————————————————————
    // GET /evaluations?blockId={blockId}
    // Devuelve un array de “Evaluation” para el bloque dado.
    // ————————————————————————————————————————————
    getEvaluationsByBlock: build.query<Evaluation[], { blockId: string }>({
      query: ({ blockId }) => ({
        url: '/evaluations',
        method: 'GET',
        params: { blockId },
      }),
      providesTags: (_result, _error, { blockId }) => [{ type: lab.Evaluations as const, id: blockId }],
    }),

    // ————————————————————————————————————————————
    // POST /evaluations
    // Crea una nueva evaluación. Recibe CreateOrUpdateEvaluationDto.
    // ————————————————————————————————————————————
    createEvaluation: build.mutation<Evaluation, CreateOrUpdateEvaluationDto>({
      query: (body) => ({
        url: '/evaluations',
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error, { blockId }) => [{ type: lab.Evaluations as const, id: blockId }],
    }),

    // —————————————————————————————————————————————
    // PUT /evaluations/{id}
    // Actualiza una evaluación existente. Recibe CreateOrUpdateEvaluationDto en el body.
    // —————————————————————————————————————————————
    updateEvaluation: build.mutation<Evaluation, { id: string } & CreateOrUpdateEvaluationDto>({
      query: ({ id, blockId, title, evaluationDate, weight }) => ({
        url: `/evaluations/${id}`,
        method: 'PUT',
        body: { blockId, title, evaluationDate, weight },
      }),
      invalidatesTags: (_result, _error, { blockId }) => [{ type: lab.Evaluations as const, id: blockId }],
    }),

    // ——————————————————————————————————————————————
    // DELETE /evaluations/{id}
    // Elimina una evaluación. Respuesta: {}
    // ——————————————————————————————————————————————
    deleteEvaluation: build.mutation<{}, { id: string; blockId: string }>({
      query: ({ id }) => ({
        url: `/evaluations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { blockId }) => [{ type: lab.Evaluations as const, id: blockId }],
    }),
  }),
});

export const {
  useGetEvaluationsByBlockQuery,
  useCreateEvaluationMutation,
  useUpdateEvaluationMutation,
  useDeleteEvaluationMutation,
} = evaluationsApi;
