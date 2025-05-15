import { CoursesState } from '@/store/slices/courses/types';

export function getCountTotalCourses(programs: CoursesState['programs']): number {
  return programs.reduce((total, program) => {
    return total + program.courses.length;
  }, 0);
}
