import { MainLayout } from '@/components/layouts/MainLayout/MainLayout';
import CourseContent from '@/features/courses/courseDetail/components/CourseContent';
import { useGetCoursesDetailCourseOfferingIdQuery as useGetCourse } from '@/services/courses/coursesSvc';
import { skipToken } from '@reduxjs/toolkit/query';
import { Navigate, useParams } from 'react-router-dom';

export default function CourseDetail() {
  const { courseOfferingId } = useParams<{ courseOfferingId: string }>();
  const { data: course, isLoading, error } = useGetCourse(courseOfferingId ? { courseOfferingId } : skipToken);

  if (isLoading) {
    return (
      <MainLayout>
        <p>Skeleton de sección…</p>
      </MainLayout>
    );
  }

  if (error || !course) {
    return <Navigate to="/404" replace />;
  }

  return (
    <MainLayout>
      <CourseContent course={course} />
    </MainLayout>
  );
}
