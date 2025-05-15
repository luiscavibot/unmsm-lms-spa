import { useGetCoursesByProgramTypeQuery } from '@/services/courses/coursesSvc';
import { useGetSemestersByUserEnrolledQuery } from '@/services/semesters/semestersSvc';
import { useAppDispatch } from '@/store/hooks';
import { setCourses } from '@/store/slices/courses/coursesSlice';
import { setSemesters } from '@/store/slices/semesters/semesterSlice';
import { FC, useEffect } from 'react';

const CoursesPageDataProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();

  const { data: semesters, isLoading: loadingSemesters, isError: errorSemesters } = useGetSemestersByUserEnrolledQuery();
  const { data: courses, isLoading: loadingCourses, isError: errorCourses } = useGetCoursesByProgramTypeQuery({});

  useEffect(() => {
    if (semesters) dispatch(setSemesters(semesters));
    if (courses) dispatch(setCourses(courses));
  }, [semesters, courses, dispatch]);

  if (loadingSemesters || loadingCourses) return <div>Loading...</div>;
  if (errorSemesters || errorCourses) return <div>Error loading data</div>;

  return <>{children}</>;
};
export default CoursesPageDataProvider;
