import React, { Fragment, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Autocomplete,
  Box,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Search } from '@mui/icons-material';
import CardCourse from '@/components/common/CardCourse';
import ChipsFilter from '../components/ChipsFilter';
import { useAppSelector } from '@/store/hooks';
import { getCountTotalCourses } from '../helpers';
import type { CourseStatus, ProgramType } from '@/services/courses/types';
import { useGetCoursesByProgramTypeQuery } from '@/services/courses/coursesSvc';

interface SemesterOption {
  id: string;
  year: number;
  name: string;
}

interface FormValues {
  search: string;
  semester: string;
}

type StatusFilter = 'vigentes' | 'finalizados';

const DiplomasView: React.FC = () => {
  const theme = useTheme();
  const semesters = useAppSelector((state) => state.semesters.list) as SemesterOption[];

  const [activeChip, setActiveChip] = useState<StatusFilter>('vigentes');

  const { control, watch } = useForm<FormValues>({
    defaultValues: { search: '', semester: '' },
  });
  const { search, semester } = watch();

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const statusMap: Record<StatusFilter, CourseStatus> = {
    vigentes: 'current',
    finalizados: 'completed',
  };
  const status = statusMap[activeChip];

  const programType: ProgramType = 'POSGRADO-DIPLOMADO';

  const { data, error, isLoading, isFetching } = useGetCoursesByProgramTypeQuery({
    status,
    programType,
    semester: semester || undefined,
    keyword: debouncedSearch || undefined,
    page: 1,
    limit: 20,
  });

  const programs = data?.programs ?? [];
  const countTotalCourses = data
    ? `${getCountTotalCourses(programs)} ${programs.length > 1 ? 'diplomados' : 'diplomado'}`
    : '';

  return (
    <Box sx={{ bgcolor: theme.palette.neutral.lightest, p: 3, borderRadius: '8px' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        spacing={{ xs: 2, sm: 0 }}
        mb={5}
      >
        <ChipsFilter active={activeChip} onChange={setActiveChip} />

        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl
            variant="standard"
            size="medium"
            sx={{ m: 1, width: { xs: '100%', sm: '309px' } }}
          >
            <InputLabel htmlFor="search-input">Buscar</InputLabel>
            <Controller
              name="search"
              control={control}
              render={({ field }) => (
                <Input
                  id="search-input"
                  {...field}
                  autoComplete="off"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
          </FormControl>

          <Controller
            name="semester"
            control={control}
            render={({ field }) => {
              const selected = semesters.find((s) => s.id === field.value) || null;
              return (
                <Autocomplete
                  options={semesters}
                  getOptionLabel={(option) => `${option.year}-${option.name}`}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  value={selected}
                  onChange={(_, option) => field.onChange(option ? option.id : '')}
                  disablePortal
                  sx={{ width: { xs: '100%', sm: 300 } }}
                  renderInput={(params) => (
                    <TextField {...params} label="Semestre" variant="standard" />
                  )}
                />
              );
            }}
          />
        </Stack>
      </Stack>

      <Typography sx={{ textAlign: 'right', mb: 4 }} variant="body2">
        <Typography component="span" sx={{ color: theme.palette.neutral.main, fontSize: '14px', fontWeight: '700' }}>
          Resultados:
        </Typography>{' '}
        <Typography component="span" sx={{ color: theme.palette.neutral.main, fontSize: '14px', fontWeight: '400' }}>
          {isLoading || isFetching
            ? ' Buscando…'
            : programs.length
            ? ` ${countTotalCourses}`
            : ' Sin registros encontrados'}
        </Typography>
      </Typography>

      {isLoading || isFetching ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">Error al cargar cursos.</Typography>
      ) : (
        programs.map((program) => (
          <Fragment key={program.programId}>
            <Typography
              sx={{ color: theme.palette.secondary.dark, fontSize: '20px', fontWeight: '700', mb: 3 }}
              variant="h4"
            >
              {program.name}
            </Typography>
            <Stack direction="row" flexWrap="wrap" spacing={2} mb={4} useFlexGap>
              {program.courses.map((course) => (
                <Box
                  key={course.courseId}
                  sx={{
                    flex: { xs: '1 1 100%', md: '1 1 30%' },
                    minWidth: { xs: '100%', md: 280 },
                    maxWidth: { xs: '100%', md: '32%' },
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <CardCourse {...course} />
                </Box>
              ))}
            </Stack>
          </Fragment>
        ))
      )}
    </Box>
  );
};

export default DiplomasView;
