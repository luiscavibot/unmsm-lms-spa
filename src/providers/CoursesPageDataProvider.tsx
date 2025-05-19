import SkeletonView from '@/features/courses/components/SkeletonView';
import { useGetSemestersByUserEnrolledQuery } from '@/services/semesters/semestersSvc';
import { useAppDispatch } from '@/store/hooks';
import { setSemesters } from '@/store/slices/semesters/semesterSlice';
import { FC, useEffect } from 'react';

const CoursesPageDataProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();

  const {
    data: semesters,
    isLoading: loadingSemesters,
    isError: errorSemesters,
  } = useGetSemestersByUserEnrolledQuery();

  useEffect(() => {
    if (semesters) dispatch(setSemesters(semesters));
  }, [semesters, dispatch]);

  if (loadingSemesters) return <SkeletonView />;
  if (errorSemesters) return <div>Error loading data</div>;

  return <>{children}</>;
};
export default CoursesPageDataProvider;
