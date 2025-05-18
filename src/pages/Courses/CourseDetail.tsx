import { MainLayout } from '@/components/layouts/MainLayout/MainLayout';
import { formatDate } from '@/helpers/formatDate';
import { useGetCoursesDetailCourseOfferingIdQuery as useGetCourse } from '@/services/courses/coursesSvc';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  clearCourseOfferingSelected,
  setCourseOfferingSelected,
} from '@/store/slices/coursesOfferings/courseOfferingsSlice';
import {
  Box,
  Breadcrumbs,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import React, { Suspense, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
const BloqueView = React.lazy(() => import('@/features/courses/courseDetail/components/BloqueView'));

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useAppDispatch();
  const { data: detail, isLoading, error } = useGetCourse({ courseOfferingId: courseId! }, { skip: !courseId });
  console.log('detail', detail);

  useEffect(() => {
    if (detail) {
      dispatch(setCourseOfferingSelected(detail));
    } else if (!isLoading) {
      dispatch(clearCourseOfferingSelected());
    }
  }, [detail, isLoading, dispatch]);

  const selected = useAppSelector((state) => state.courseOfferings.courseOfferingSelected);

  if (!courseId) {
    return <Navigate to="/404" replace />;
  }

  const bloques = [
    { value: 'teoria', label: 'Teoría' },
    { value: 'practica-grupo-2', label: 'Práctica (Grupo II)' },
  ];

  const [valueBloque, setValueBloque] = React.useState(bloques[0].value);

  const labelBloque = bloques.find((b) => b.value === valueBloque)?.label || '';

  const handleChange = (event: SelectChangeEvent) => {
    setValueBloque(event.target.value);
  };

  if (isLoading) {
    return <Typography>Cargando detalles del curso…</Typography>;
  }

  if (error || !selected) {
    return <Typography color="error">No se pudo cargar el curso.</Typography>;
  }

  const startDateFormatted = formatDate(selected?.startDate);
  const endDateFormatted = formatDate(selected?.endDate);

  return (
    <MainLayout>
      <Breadcrumbs sx={{ mb: 6 }} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/courses/posgrado">
          Inicio
        </Link>
        <Link underline="hover" color="inherit" href="/courses/posgrado">
          Cursos
        </Link>
        <Typography sx={{ color: 'text.primary' }}>{selected.name}</Typography>
      </Breadcrumbs>
      <Typography sx={{ color: 'secondary.dark', fontSize: '20px', fontWeight: '700', mb: 1 }} variant="h4">
        {selected.name}
      </Typography>
      <Typography sx={{ color: 'neutral.main', fontSize: '14px', fontWeight: '400', mb: 5 }} variant="body2">
        {selected.programName}
      </Typography>
      <Box sx={{ borderRadius: '8px', p: 3, bgcolor: 'neutral.lightest', display: 'inline-flex', gap: 5, mb: 5 }}>
        <Box
          sx={{
            display: 'inline-grid',
            gap: '16px 40px',
            gridTemplateColumns: 'repeat(2, auto)',
          }}
        >
          <Box>
            <Typography component="span" sx={{ fontWeight: 700, color: 'neutral.dark' }}>
              Fecha de inicio:{' '}
            </Typography>
            <Typography component="span" sx={{ fontWeight: 400, color: 'neutral.main' }}>
              {startDateFormatted}
            </Typography>
          </Box>
          <Box>
            <Typography component="span" sx={{ fontWeight: 700, color: 'neutral.dark' }}>
              Fecha de fin:{' '}
            </Typography>
            <Typography component="span" sx={{ fontWeight: 400, color: 'neutral.main' }}>
              {endDateFormatted}
            </Typography>
          </Box>
          <Box>
            <Typography component="span" sx={{ fontWeight: 700, color: 'neutral.dark' }}>
              Año-semestre:{' '}
            </Typography>
            <Typography component="span" sx={{ fontWeight: 400, color: 'neutral.main' }}>
              {selected.semester}
            </Typography>
          </Box>
          <Box>
            <Typography component="span" sx={{ fontWeight: 700, color: 'neutral.dark' }}>
              Docente responsable:{' '}
            </Typography>
            <Typography component="span" sx={{ fontWeight: 400, color: 'neutral.main' }}>
              {selected.teacher}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box sx={{ borderRadius: '7px', p: 1, bgcolor: 'primary.lightest', display: 'inline-block' }}>
            <Typography component="span" sx={{ fontWeight: 700, color: 'neutral.dark' }}>
              Nota final:{' '}
            </Typography>
            <Typography component="span" sx={{ fontWeight: 400, color: 'neutral.main' }}>
              {selected.endNote ? selected.endNote : 'Pendiente'}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Stack direction="row" spacing={2} mb={5} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body1">
          Este curso combina sesiones de teoría con grupos de práctica para reforzar el aprendizaje.
          <br />
          Explora los contenidos que necesitas para avanzar en tu formación.
        </Typography>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 220 }}>
          <InputLabel id="demo-simple-select-filled-label">Bloque</InputLabel>
          <Select
            sx={{
              backgroundColor: 'neutral.lightest',
              '&.Mui-focused': {
                backgroundColor: 'neutral.lightest',
              },
            }}
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={valueBloque}
            onChange={handleChange}
          >
            {bloques.map((bloque) => (
              <MenuItem key={bloque.value} value={bloque.value}>
                {bloque.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Suspense fallback={<Typography>Cargando bloque...</Typography>}>
        <BloqueView value={valueBloque} nombre={labelBloque} />
      </Suspense>
    </MainLayout>
  );
}
