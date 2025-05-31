// src/services/blockAssignmentsSvc.ts
import { baseApi } from '../baseApi';
import lab from '@/services/apiLabels';
import { UserRole } from '@/roles';

export interface BlockAssignmentRoleDto {
  isAssigned: boolean;
  blockRol: UserRole;
  message: string;
}

export const blockAssignmentsApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getBlockAssignmentRole: build.query<BlockAssignmentRoleDto, { courseOfferingId: string }>({
      query: ({ courseOfferingId }) => ({
        url: `/block-assignments/role/${courseOfferingId}`,
      }),
      providesTags: (_res, _err, { courseOfferingId }) => [
        { type: lab.BlockAssignments as const, id: courseOfferingId },
      ],
    }),
  }),
});

export const { useGetBlockAssignmentRoleQuery } = blockAssignmentsApi;
