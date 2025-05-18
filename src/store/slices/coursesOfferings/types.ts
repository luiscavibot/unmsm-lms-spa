import type { ICoursesByProgramTypeResp } from '@/services/courses/types';

export type CourseOfferingsState = {
  programs: ICoursesByProgramTypeResp['programs'];
  meta: ICoursesByProgramTypeResp['meta'] | null;
};
