import type { ICoursesByProgramTypeResp } from '@/services/courses/types';

export type CoursesState = {
  programs: ICoursesByProgramTypeResp['programs'];
  meta: ICoursesByProgramTypeResp['meta'] | null;
};
