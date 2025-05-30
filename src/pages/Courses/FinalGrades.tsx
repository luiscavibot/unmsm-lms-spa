import { MainLayout } from '@/components/layouts/MainLayout/MainLayout';
// import SkeletonView from '@/features/courses/courseDetail/components/SkeletonView';
import FinalGradeContent from '@/features/courses/courseDetail/finalGrades/components/FinalGradeContent';
// import { useGetCoursesDetailCourseOfferingIdQuery as useGetCourse } from '@/services/courses/coursesSvc';
// import { skipToken } from '@reduxjs/toolkit/query';
// import { Navigate, useParams } from 'react-router-dom';

export default function FinalGrades() {
  //   const { courseOfferingId } = useParams<{ courseOfferingId: string }>();
  //   const { data: course, isLoading, error } = useGetCourse(courseOfferingId ? { courseOfferingId } : skipToken);

  //   if (isLoading) {
  // 	return (
  // 	  <MainLayout>
  // 		<SkeletonView />
  // 	  </MainLayout>
  // 	);
  //   }

  //   if (error || !course) {
  // 	return <Navigate to="/404" replace />;
  //   }

  return (
    <MainLayout>
      {/* <FinalGradeContent course={course} /> */}
      <FinalGradeContent />
    </MainLayout>
  );
}
