import React from 'react';
import { Alert, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const GreenBox = () => <Box sx={{ bgcolor: '#A5D6A7', width: '24px', height: '24px', borderRadius: '4px' }}></Box>;
const RedBox = () => <Box sx={{ bgcolor: '#EF9A9A', width: '24px', height: '24px', borderRadius: '4px' }}></Box>;
const YellowBox = () => <Box sx={{ bgcolor: '#FFF59D', width: '24px', height: '24px', borderRadius: '4px' }}></Box>;

export default function AlumnoAsistenciaView() {
  const [cleared, setCleared] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<Dayjs | null>(null);
  return (
    <>
      <Alert sx={{ mb: '24px' }} variant="outlined" severity="info">
        La asistencia mínima requerida para pasar el curso es del 70%
      </Alert>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: 'space-between', mb: '40px' }}>
        <DatePicker
          label="Seleccionar fecha"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          format="DD/MM/YYYY"
          slotProps={{
            field: { clearable: true, onClear: () => setCleared(true) },
          }}
        />
        <Typography sx={{ color: 'neutral.main', fontSize: '16px', fontWeight: 400 }} variant="body2">
          Asistencia actual: 40%
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '32px', mb: '32px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
          <GreenBox />
          <Typography sx={{ color: 'neutral.main', fontSize: '14px', fontWeight: 400 }} variant="body2">
            Asistió
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
          <RedBox />
          <Typography sx={{ color: 'neutral.main', fontSize: '14px', fontWeight: 400 }} variant="body2">
            No asistió
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
          <YellowBox />
          <Typography sx={{ color: 'neutral.main', fontSize: '14px', fontWeight: 400 }} variant="body2">
            Tardanza
          </Typography>
        </Box>
      </Box>
      <TableContainer component={Box}>
        <Table sx={{ width: '306px' }} aria-label="Tabla de asistencia">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography sx={{ color: 'neutral.dark', fontSize: '16px', fontWeight: 700 }} variant="body2">
                  Fecha
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ color: 'neutral.dark', fontSize: '16px', fontWeight: 700 }} variant="body2">
                  Asistencia
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              '& tr:first-child th, & tr:first-child td': { pt: 2 },
              '& td, & th': { border: 'none', py: 1 },
            }}
          >
            <>
              <TableRow>
                <TableCell component="th" scope="row" colSpan={2}>
                  <Typography sx={{ color: 'neutral.dark', fontSize: '16px', fontWeight: 700 }} variant="body2">
                    Semana 1
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: 'neutral.main' }} component="th" scope="row">
                  Lunes 01/06/2024
                </TableCell>
                <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                  <GreenBox />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: 'neutral.main' }} component="th" scope="row">
                  Lunes 01/06/2024
                </TableCell>
                <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                  <RedBox />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: 'neutral.main' }} component="th" scope="row">
                  Lunes 01/06/2024
                </TableCell>
                <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                  <YellowBox />
                </TableCell>
              </TableRow>
            </>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
