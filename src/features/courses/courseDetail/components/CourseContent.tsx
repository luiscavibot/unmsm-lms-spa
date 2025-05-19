import { formatDate } from '@/helpers/formatDate';
import { BlockType, CourseDetailResponseDto } from '@/services/courses/types';
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
import { FC, lazy, Suspense, useMemo, useState } from 'react';
import InfoItem from './InfoItem';

const BloqueView = lazy(() => import('@/features/courses/courseDetail/components/BloqueView'));

interface CourseContentProps {
  course: CourseDetailResponseDto;
}
const labelStyle = { fontWeight: 700, color: 'neutral.dark' };
const valueStyle = { fontWeight: 400, color: 'neutral.main' };

const CourseContent: FC<CourseContentProps> = ({ course }) => {
  const startDateFormatted = useMemo(() => formatDate(course.startDate), [course.startDate]);
  const endDateFormatted = useMemo(() => formatDate(course.endDate), [course.endDate]);

  const courseBlocks = useMemo(
    () => course.blocks.map((block) => ({ value: block.blockId, label: block.name })),
    [course.blocks],
  );

  const defaultBlock = useMemo(
    () => course.blocks.find((b) => b.blockType === BlockType.THEORY) ?? course.blocks[0],
    [course.blocks],
  );

  const [selectedBlockId, setSelectedBlockId] = useState(defaultBlock.blockId);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedBlockId(event.target.value as string);
  };

  const selectedBlock = useMemo(
    () => course.blocks.find((b) => b.blockId === selectedBlockId) ?? defaultBlock,
    [course.blocks, selectedBlockId, defaultBlock],
  );

  return (
    <>
      <Breadcrumbs sx={{ mb: 6 }} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/courses/posgrado">
          Inicio
        </Link>
        <Link underline="hover" color="inherit" href="/courses/posgrado">
          Cursos
        </Link>
        <Typography sx={{ color: 'text.primary' }}>{course.name}</Typography>
      </Breadcrumbs>
      <Typography sx={{ color: 'secondary.dark', fontSize: '20px', fontWeight: '700', mb: 1 }} variant="h4">
        {course.name}
      </Typography>
      <Typography sx={{ color: 'neutral.main', fontSize: '14px', fontWeight: '400', mb: 5 }} variant="body2">
        {course.programName}
      </Typography>
      <Box sx={{ borderRadius: '8px', p: 3, bgcolor: 'neutral.lightest', display: 'inline-flex', gap: 5, mb: 5 }}>
        <Box
          sx={{
            display: 'inline-grid',
            gap: '16px 40px',
            gridTemplateColumns: 'repeat(2, auto)',
          }}
        >
          <InfoItem label="Fecha de inicio: " value={startDateFormatted} />
          <InfoItem label="Fecha de fin: " value={endDateFormatted} />
          <Box>
            <Typography component="span" sx={{ ...labelStyle }}>
              Año-semestre:{' '}
            </Typography>
            <Typography component="span" sx={{ ...valueStyle }}>
              {course.semester}
            </Typography>
          </Box>
          <Box>
            <Typography component="span" sx={{ ...labelStyle }}>
              Docente responsable:{' '}
            </Typography>
            <Typography component="span" sx={{ ...valueStyle }}>
              {course.teacher}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box sx={{ borderRadius: '7px', p: 1, bgcolor: 'primary.lightest', display: 'inline-block' }}>
            <InfoItem label="Nota final: " value={course.endNote != null ? course.endNote : 'Pendiente'} />
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
            value={selectedBlockId}
            onChange={handleChange}
          >
            {courseBlocks.map((block) => (
              <MenuItem key={block.value} value={block.value}>
                {block.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Suspense fallback={<Typography>Cargando bloque...</Typography>}>
        <BloqueView selectedBlock={selectedBlock} />
      </Suspense>
    </>
  );
};

export default CourseContent;
