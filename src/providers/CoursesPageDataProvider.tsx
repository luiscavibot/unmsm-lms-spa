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
    if (semesters) {
      console.log('Semestersdesde provider:', semesters);
      dispatch(setSemesters(semesters));
    }
  }, [semesters, dispatch]);

  if (loadingSemesters) return <div>Loading...</div>;
  if (errorSemesters) return <div>Error loading data</div>;

  return <>{children}</>;
};
export default CoursesPageDataProvider;
