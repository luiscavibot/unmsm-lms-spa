// src/components/DocenteAsistenciaView.tsx

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
import { Search } from '@mui/icons-material';

import { usePostBulkAttendanceMutation } from '@/services/attendance/attendanceSvc';
// import { useAbility } from '@/hooks/useAbility';
// import { BlockType } from '@/services/courses/types';
// import { useAppSelector } from '@/store/hooks';
// import { UserRole } from '@/roles';
import { showToast } from '@/helpers/notifier';
import { useGetEnrolledStudentsAttendanceQuery } from '@/services/enrollmentBlocks/enrollmentBlocksApi';
import { AttendanceStatus } from '@/services/attendance/types';

interface DocenteAsistenciaViewProps {
  blockId: string;
}

interface FormValues {
  search: string;
}

type AttendanceOption = 'asistio' | 'noAsistio' | 'tardanza' | null;

interface StudentAttendance {
  id: string; // enrollmentId
  nombre: string; // userName
  asistencia: AttendanceOption;
}

const DocenteAsistenciaView: FC<DocenteAsistenciaViewProps> = ({ blockId }) => {
  // Fecha seleccionada (Dayjs) para filtrar
  const [value, setValue] = useState<Dayjs | null>(null);
  // filterDate en YYYY-MM-DD
  const [filterDate, setFilterDate] = useState<string | null>(null);

  // Hook para buscar estudiantes + asistencia
  const { data, isLoading, isFetching, error } = useGetEnrolledStudentsAttendanceQuery({
    blockId,
    date: filterDate || undefined,
  });

  // Hook para guardar asistencia masiva
  const [postBulkAttendance, { isLoading: isSubmitting }] = usePostBulkAttendanceMutation();

  // Estado local de estudiantes, mapeados desde la respuesta
  const [students, setStudents] = useState<StudentAttendance[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  // control para el campo de búsqueda
  const { control, watch } = useForm<FormValues>({ defaultValues: { search: '' } });
  const { search } = watch();
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Cada vez que cambia value (Dayjs), actualizamos filterDate en formato YYYY-MM-DD
  useEffect(() => {
    if (value) {
      setFilterDate(value.format('YYYY-MM-DD'));
    } else {
      setFilterDate(null);
    }
  }, [value]);

  // Cuando llega data nueva, la mapeamos a StudentAttendance[]
  useEffect(() => {
    if (!data) {
      setStudents([]);
      return;
    }

    const mapped: StudentAttendance[] = data.students.map((s) => {
      let opcion: AttendanceOption = null;
      if (s.attendanceStatus === AttendanceStatus.PRESENT) opcion = 'asistio';
      else if (s.attendanceStatus === AttendanceStatus.ABSENT) opcion = 'noAsistio';
      else if (s.attendanceStatus === AttendanceStatus.LATE) opcion = 'tardanza';

      return {
        id: s.enrollmentId,
        nombre: s.userName,
        asistencia: opcion,
      };
    });

    setStudents(mapped);
    // Reset save flag whenever data changes
    setIsSaved(false);
  }, [data]);

  // Filtrar estudiantes por debouncedSearch
  const filteredStudents = students.filter((s) => s.nombre.toLowerCase().includes(debouncedSearch.toLowerCase()));

  // Validación para habilitar "Guardar"
  const canSave =
    filteredStudents.length > 0 &&
    filteredStudents.every((s) => s.asistencia !== null) &&
    !isSubmitting &&
    !!data?.classSessionId;

  const handleAttendanceChange = (id: string, option: AttendanceOption) => {
    setStudents((prev) => prev.map((student) => (student.id === id ? { ...student, asistencia: option } : student)));
  };

  const handleSave = async () => {
    if (!canSave || !data?.classSessionId) return;

    // Construir payload para POST /attendance/bulk
    const attendanceRecords = students.map((s) => {
      let status: AttendanceStatus;
      switch (s.asistencia) {
        case 'asistio':
          status = AttendanceStatus.PRESENT;
          break;
        case 'noAsistio':
          status = AttendanceStatus.ABSENT;
          break;
        case 'tardanza':
          status = AttendanceStatus.LATE;
          break;
        default:
          status = AttendanceStatus.ABSENT; // fallback, aunque no debería ocurrir
      }
      return {
        enrollmentId: s.id,
        status,
      };
    });

    try {
      await postBulkAttendance({
        classSessionId: data.classSessionId,
        attendanceRecords,
      }).unwrap();

      showToast('Asistencia guardada correctamente', 'success');
      setIsSaved(true);
    } catch (err) {
      console.error('Error guardando asistencia:', err);
      showToast('Error al guardar la asistencia', 'error');
    }
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
        {/* Si quieres habilitar el DatePicker, descomenta y ajusta */}
        {/*
        <DatePicker
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
        />
        */}

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
              {filteredStudents.map((student) => (
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
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Guardar'}
        </Button>
      </Box>
    </>
  );
};

export default DocenteAsistenciaView;
