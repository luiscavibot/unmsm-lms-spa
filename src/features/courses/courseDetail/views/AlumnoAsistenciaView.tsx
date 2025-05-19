import React, { FC, useState, useEffect } from 'react';
import { Dayjs } from 'dayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import {
  Alert,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useGetAttendanceByBlockIdQuery } from '@/services/attendance/attendanceSvc';
import { AttendanceStatus, WeekAttendanceDto } from '@/services/attendance/types';

const GreenBox = () => <Box sx={{ bgcolor: '#A5D6A7', width: 24, height: 24, borderRadius: 1 }} />;
const RedBox = () => <Box sx={{ bgcolor: '#EF9A9A', width: 24, height: 24, borderRadius: 1 }} />;
const YellowBox = () => <Box sx={{ bgcolor: '#FFF59D', width: 24, height: 24, borderRadius: 1 }} />;

interface AlumnoAsistenciaViewProps {
  blockId: string;
}

const AlumnoAsistenciaView: FC<AlumnoAsistenciaViewProps> = ({ blockId }) => {
  const { data, isLoading, isFetching, error } = useGetAttendanceByBlockIdQuery({ blockId });
  console.log('data', data);
  const [value, setValue] = useState<Dayjs | null>(null);
  const [filterDate, setFilterDate] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      setFilterDate(value.format('DD/MM/YYYY'));
    } else {
      setFilterDate(null);
    }
  }, [value]);

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

  const weeks: WeekAttendanceDto[] = filterDate
    ? data.weeks
        .map((week) => ({
          ...week,
          attendances: week.attendances.filter((att) => att.date === filterDate),
        }))
        .filter((week) => week.attendances.length > 0)
    : data.weeks;

  return (
    <>
      <Alert sx={{ mb: 3 }} variant="outlined" severity="info">
        La asistencia mínima requerida para pasar el curso es del {data.attendancePercentage}.
      </Alert>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', mb: 4 }}>
        {/* TODO: IMPLEMENTAR FILTRO POR FECHA
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
        /> */}
        <Typography sx={{ color: 'neutral.main', fontSize: 16, fontWeight: 400 }}>
          Asistencia actual: {data.attendancePercentage}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 4, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GreenBox />
          <Typography sx={{ fontSize: 14 }}>Asistió</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <RedBox />
          <Typography sx={{ fontSize: 14 }}>No asistió</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <YellowBox />
          <Typography sx={{ fontSize: 14 }}>Tardanza</Typography>
        </Box>
      </Box>

      <TableContainer component={Box}>
        <Table sx={{ width: 306 }} aria-label="Tabla de asistencia">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography sx={{ fontWeight: 700 }}>Fecha</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: 700 }}>Asistencia</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ '& td, & th': { border: 'none', py: 1 } }}>
            {weeks.map((week) => (
              <React.Fragment key={week.weekId}>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Typography sx={{ fontWeight: 700 }}>{week.weekName}</Typography>
                  </TableCell>
                </TableRow>
                {week.attendances.map((att) => (
                  <TableRow key={att.date}>
                    <TableCell sx={{ color: 'neutral.main' }}>{att.formattedDate}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {att.status === AttendanceStatus.PRESENT && <GreenBox />}
                      {att.status === AttendanceStatus.ABSENT && <RedBox />}
                      {att.status === AttendanceStatus.LATE && <YellowBox />}
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AlumnoAsistenciaView;
