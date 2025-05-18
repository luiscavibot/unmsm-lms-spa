import { CoursesState } from '@/store/slices/coursesOfferings/types';

export function getCountTotalCourses(programs: CoursesState['programs']): number {
  return programs.reduce((total, program) => {
    return total + program.courses.length;
  }, 0);
}
