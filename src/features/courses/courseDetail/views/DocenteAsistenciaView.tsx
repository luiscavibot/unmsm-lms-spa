import React, { FC, useState, useEffect } from 'react';
import { Dayjs } from 'dayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm, Controller } from 'react-hook-form';

import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useGetAttendanceByBlockIdQuery } from '@/services/attendance/attendanceSvc';
import { Search } from '@mui/icons-material';

interface DocenteAsistenciaViewProps {
  blockId: string;
}

interface FormValues {
  search: string;
}

type AttendanceOption = 'asistio' | 'noAsistio' | 'tardanza' | null;

interface StudentAttendance {
  id: string;
  nombre: string;
  asistencia: AttendanceOption;
}

const initialStudents: StudentAttendance[] = [
  { id: '1', nombre: 'Copa Vargas, Luciana Beatriz', asistencia: null },
  { id: '2', nombre: 'Chávez Huerta, Carlos Eduardo', asistencia: null },
];

const DocenteAsistenciaView: FC<DocenteAsistenciaViewProps> = ({ blockId }) => {
  const { data, isLoading, isFetching, error } = useGetAttendanceByBlockIdQuery({ blockId });
  console.log('data', data);
  const [value, setValue] = useState<Dayjs | null>(null);
  const [filterDate, setFilterDate] = useState<string | null>(null);
  const [students, setStudents] = useState<StudentAttendance[]>(initialStudents);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const canSave = students.every((s) => s.asistencia !== null) && !isSaving;

  const { control, watch } = useForm<FormValues>({
    defaultValues: { search: '' },
  });
  const { search } = watch();
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    if (value) {
      setFilterDate(value.format('DD/MM/YYYY'));
    } else {
      setFilterDate(null);
    }
  }, [value]);

  const handleAttendanceChange = (id: string, option: AttendanceOption) => {
    setStudents((prev) => prev.map((student) => (student.id === id ? { ...student, asistencia: option } : student)));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Aquí agregar lógica de guardado
    setTimeout(() => {
      console.log('Guardado:', students);
      setIsSaving(false);
      setIsSaved(true);
    }, 1000);
  };

  if (isLoading || isFetching) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error || !data) {
    return <Alert severity="error">Error al cargar asistencias.</Alert>;
  }

  return (
    <>
      <Alert sx={{ mb: 3 }} variant="outlined" severity="info">
        Solo se podrá ingresar o editar la asistencia marcada hasta un día después de la clase realizada, esto según lo
        consignado en el horario y calendario del curso
      </Alert>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: '24px' }}>
        {/* <DatePicker
          label="Seleccionar fecha"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          format="DD/MM/YYYY"
          slotProps={{
            field: {
              clearable: true,
              onClear: () => setValue(null),
            },
          }}
        /> */}
        <FormControl variant="standard" size="medium" sx={{ m: 1, width: '309px' }}>
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
      </Stack>

      <Box sx={{ display: 'flex', gap: '24px 16px' }}>
        <TableContainer component={Box}>
          <Table aria-label="Tabla de asistencia">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Nombre</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Asistió
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  No asistió
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Tardanza
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell component="th" scope="row">
                    {student.nombre}
                  </TableCell>
                  {(['asistio', 'noAsistio', 'tardanza'] as AttendanceOption[]).map((option) => (
                    <TableCell key={option} align="center">
                      <Checkbox
                        checked={student.asistencia === option}
                        onChange={() => handleAttendanceChange(student.id, option)}
                        color="secondary"
                        disabled={isSaved}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={!canSave}
          sx={{ width: '116.25px', height: '42.25px' }}
        >
          {isSaving ? <CircularProgress size={24} color="inherit" /> : 'Guardar'}
        </Button>
      </Box>
    </>
  );
};

export default DocenteAsistenciaView;
