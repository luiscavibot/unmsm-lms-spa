import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MainLayout } from '@/components/layouts/MainLayout/MainLayout';
import { Breadcrumbs, Link, Typography } from '@mui/material';
const allowedTypes = ['pregrado', 'posgrado'];
import AlertBanner from '@/features/courses/components/AlertBanner';
import CoursesTabs from '@/features/courses/components/CoursesTabs';
import TabPanel from '@/features/courses/components/TabPanel';
import MasterDegreesView from '@/features/courses/views/MasterDegreesView';
import DoctoratesView from '@/features/courses/views/DoctoratesView';
import DiplomasView from '@/features/courses/views/DiplomasView';
import SpecialtiesView from '@/features/courses/views/SpecialtiesView';
import CoursesPageDataProvider from '@/providers/CoursesPageDataProvider';

export default function CoursesList() {
  const { type } = useParams();
  if (!allowedTypes.includes(type || '')) {
    return <Navigate to="/404" replace />;
  }

  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState(2);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <MainLayout>
      <Breadcrumbs sx={{ mb: 6 }} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/courses/posgrado">
          Inicio
        </Link>
        <Typography sx={{ color: 'text.primary' }}>Cursos</Typography>
      </Breadcrumbs>
      <CoursesPageDataProvider>
        <AlertBanner open={open} onClose={() => setOpen(false)} />
        <CoursesTabs value={value} onChange={handleChange} />
        <TabPanel value={value} index={0}>
          <MasterDegreesView />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DoctoratesView />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <DiplomasView />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <SpecialtiesView />
        </TabPanel>
      </CoursesPageDataProvider>
    </MainLayout>
  );
}
