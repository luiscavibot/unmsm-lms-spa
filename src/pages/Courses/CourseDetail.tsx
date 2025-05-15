import { MainLayout } from '@/components/layouts/MainLayout/MainLayout';
import { Box, Breadcrumbs, FormControl, InputLabel, Link, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import React, { Suspense } from 'react';
import { Navigate, useParams } from 'react-router-dom';
const BloqueView = React.lazy(() => import('@/features/courses/courseDetail/components/BloqueView'));

const allowedTypes = ['pregrado', 'posgrado'];
// const mockCourses = [
//   {
//     slug: '1',
//     type: 'posgrado',
//     name: 'Bioinformática Aplicada a la Vigilancia Genómica',
//   },
// ];

export default function CourseDetail() {
  const { type } = useParams();

  if (!allowedTypes.includes(type || '')) {
    return <Navigate to="/404" replace />;
  }

  //   const course = mockCourses.find((c) => c.slug === courseSlug && c.type === type);

  //   if (!course) {
  //     return <Navigate to="/404" replace />;
  //   }

  const bloques = [
    { value: 'teoria', label: 'Teoría' },
    { value: 'practica-grupo-2', label: 'Práctica (Grupo II)' },
  ];

  const [valueBloque, setValueBloque] = React.useState(bloques[0].value);

  const labelBloque = bloques.find((b) => b.value === valueBloque)?.label || '';

  const handleChange = (event: SelectChangeEvent) => {
    setValueBloque(event.target.value);
  };

  return (
    <MainLayout>
      <Breadcrumbs sx={{ mb: 6 }} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/courses/posgrado">
          Inicio
        </Link>
        <Link underline="hover" color="inherit" href="/courses/posgrado">
          Cursos
        </Link>
        <Typography sx={{ color: 'text.primary' }}>Bioinformática Aplicada a la Vigilancia Genómica</Typography>
      </Breadcrumbs>
      <Typography sx={{ color: 'secondary.dark', fontSize: '20px', fontWeight: '700', mb: 1 }} variant="h4">
        Epidemiología de las Enfermedades Transmitidas por Vectores I
      </Typography>
      <Typography sx={{ color: 'neutral.main', fontSize: '14px', fontWeight: '400', mb: 5 }} variant="body2">
        Bioinformática aplicada a la salud pública
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
              01/04/2025
            </Typography>
          </Box>
          <Box>
            <Typography component="span" sx={{ fontWeight: 700, color: 'neutral.dark' }}>
              Fecha de fin:{' '}
            </Typography>
            <Typography component="span" sx={{ fontWeight: 400, color: 'neutral.main' }}>
              16/06/2025
            </Typography>
          </Box>
          <Box>
            <Typography component="span" sx={{ fontWeight: 700, color: 'neutral.dark' }}>
              Año-semestre:{' '}
            </Typography>
            <Typography component="span" sx={{ fontWeight: 400, color: 'neutral.main' }}>
              2025-I
            </Typography>
          </Box>
          <Box>
            <Typography component="span" sx={{ fontWeight: 700, color: 'neutral.dark' }}>
              Docente responsable:{' '}
            </Typography>
            <Typography component="span" sx={{ fontWeight: 400, color: 'neutral.main' }}>
              Eduardo Romero
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box sx={{ borderRadius: '7px', p: 1, bgcolor: 'primary.lightest', display: 'inline-block' }}>
            <Typography component="span" sx={{ fontWeight: 700, color: 'neutral.dark' }}>
              Nota final:{' '}
            </Typography>
            <Typography component="span" sx={{ fontWeight: 400, color: 'neutral.main' }}>
              13
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
