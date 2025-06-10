import React, { FC, useState, useEffect, useMemo } from 'react';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
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

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import {
  useGetEnrolledStudentsAttendanceQuery,
  useGetClassSessionsDatesQuery,
} from '@/services/enrollmentBlocks/enrollmentBlocksApi';
import { usePostBulkAttendanceMutation } from '@/services/attendance/attendanceSvc';

import { showToast } from '@/helpers/notifier';
import { AttendanceStatus } from '@/services/attendance/types';

interface DocenteAsistenciaViewProps {
  blockId: string;
}

interface FormValues {
  search: string;
}

// Añadimos la nueva opción 'justified'
type AttendanceOption = 'asistio' | 'noAsistio' | 'tardanza' | 'justified' | null;

interface StudentAttendance {
  id: string; // enrollmentId
  nombre: string; // userName
  asistencia: AttendanceOption;
}

const DocenteAsistenciaView: FC<DocenteAsistenciaViewProps> = ({ blockId }) => {
  const [value, setValue] = useState<Dayjs | null>(null);
  const [filterDate, setFilterDate] = useState<string | null>(null);

  const {
    data: attendanceData,
    isLoading: isLoadingAttendance,
    isFetching: isFetchingAttendance,
    error: errorAttendance,
  } = useGetEnrolledStudentsAttendanceQuery({ blockId, date: filterDate || undefined });

  const {
    data: classDaysData,
    isLoading: isLoadingClassDays,
    isFetching: isFetchingClassDays,
    error: errorClassDays,
  } = useGetClassSessionsDatesQuery({ blockId });

  const [postBulkAttendance, { isLoading: isSubmitting }] = usePostBulkAttendanceMutation();

  const [students, setStudents] = useState<StudentAttendance[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  const { control, watch } = useForm<FormValues>({ defaultValues: { search: '' } });
  const { search } = watch();
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    if (value) {
      setFilterDate(value.format('YYYY-MM-DD'));
    } else {
      setFilterDate(null);
    }
  }, [value]);

  useEffect(() => {
    if (attendanceData && attendanceData.date) {
      const defaultDay = dayjs(attendanceData.date, 'YYYY-MM-DD');
      setValue(defaultDay);
      setFilterDate(attendanceData.date);
    }
  }, [attendanceData]);

  useEffect(() => {
    if (!attendanceData) {
      setStudents([]);
      return;
    }

    const mapped: StudentAttendance[] = attendanceData.students.map((s) => {
      let opcion: AttendanceOption = null;
      if (s.attendanceStatus === AttendanceStatus.PRESENT) opcion = 'asistio';
      else if (s.attendanceStatus === AttendanceStatus.ABSENT) opcion = 'noAsistio';
      else if (s.attendanceStatus === AttendanceStatus.LATE) opcion = 'tardanza';
      else if (s.attendanceStatus === AttendanceStatus.JUSTIFIED) opcion = 'justified';

      return {
        id: s.enrollmentId,
        nombre: s.userName,
        asistencia: opcion,
      };
    });

    setStudents(mapped);
    setIsSaved(false);
  }, [attendanceData]);

  const filteredStudents = useMemo(
    () => students.filter((s) => s.nombre.toLowerCase().includes(debouncedSearch.toLowerCase())),
    [students, debouncedSearch],
  );

  const canSave =
    filteredStudents.length > 0 &&
    filteredStudents.every((s) => s.asistencia !== null) &&
    !isSubmitting &&
    !!attendanceData?.classSessionId &&
    attendanceData.canEditAttendance;

  const handleAttendanceChange = (id: string, option: AttendanceOption) => {
    setStudents((prev) => prev.map((student) => (student.id === id ? { ...student, asistencia: option } : student)));
  };

  const handleSave = async () => {
    if (!canSave || !attendanceData?.classSessionId) return;

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
        case 'justified':
          status = AttendanceStatus.JUSTIFIED;
          break;
        default:
          status = AttendanceStatus.ABSENT;
      }
      return {
        enrollmentId: s.id,
        status,
      };
    });

    try {
      await postBulkAttendance({ classSessionId: attendanceData.classSessionId, attendanceRecords }).unwrap();
      showToast('Asistencia guardada correctamente', 'success');
      setIsSaved(true);
    } catch (err) {
      console.error('Error guardando asistencia:', err);
      showToast('Error al guardar la asistencia', 'error');
    }
  };

  if (isLoadingAttendance || isFetchingAttendance || isLoadingClassDays || isFetchingClassDays) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (errorClassDays) return <Alert severity="error">Error al cargar fechas de clase.</Alert>;
  if (errorAttendance || !attendanceData) return <Alert severity="error">Error al cargar asistencias.</Alert>;
  if (!classDaysData) return <Alert severity="error">No se encontraron días de clase.</Alert>;

  const availableDates = classDaysData.classDays.map((d) => d.date);
  const shouldDisableDate = (date: Dayjs) => !availableDates.includes(date.format('YYYY-MM-DD'));

  return (
    <>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: '24px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Seleccionar fecha"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            format="DD/MM/YYYY"
            slotProps={{
              field: { clearable: true, onClear: () => setValue(null) },
              actionBar: { actions: ['clear'] },
            }}
            shouldDisableDate={shouldDisableDate}
            sx={{ mr: 2, width: '200px' }}
          />
        </LocalizationProvider>

        <FormControl variant="standard" size="medium" sx={{ width: '309px' }}>
          <InputLabel htmlFor="search-input">Buscar estudiante</InputLabel>
          <Controller
            name="search"
            control={control}
            render={({ field }) => (
              <Input
                id="search-input"
                {...field}
                placeholder="Apellido o nombre"
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

      {attendanceData.attendanceStatusMessage && (
        <Alert sx={{ mb: 2 }} severity={attendanceData.messageType as 'success' | 'error' | 'warning' | 'info'}>
          {attendanceData.attendanceStatusMessage}
        </Alert>
      )}

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
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Justificada
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell component="th" scope="row">
                    {student.nombre}
                  </TableCell>
                  {(['asistio', 'noAsistio', 'tardanza', 'justified'] as AttendanceOption[]).map((option) => (
                    <TableCell key={option} align="center">
                      <Checkbox
                        checked={student.asistencia === option}
                        onChange={() => handleAttendanceChange(student.id, option)}
                        color="secondary"
                        disabled={!attendanceData.canEditAttendance || isSaved}
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
