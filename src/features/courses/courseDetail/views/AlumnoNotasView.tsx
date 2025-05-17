import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Tooltip } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import { formatDate } from '@/helpers/formatDate';

function createData(name: string, peso: number, fecha: string, nota: number) {
  fecha = formatDate(fecha);
  return { name, peso, fecha, nota };
}

const rows = [
  createData('Test 01', 10, '2025/05/22', 16),
  createData('Test 02', 10, '2025/05/29', 18),
  createData('Parcial 01', 40, '2025/06/05', 19),
];

const notaPromedio = 10;

export default function AlumnoNotasView() {
  return (
    <TableContainer component={Box}>
      <Table sx={{ width: 660 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Evaluaciones</TableCell>
            <TableCell sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              Peso
              <Tooltip
                title="Es el valor que tiene una nota dentro del promedio final. Cuanto mayor es el peso, más influye en la calificación. Debe ingresar un número del 1 al 100."
                placement="top-start"
              >
                <InfoOutlined sx={{ fontSize: 14 }} />
              </Tooltip>
            </TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Fecha</TableCell>
            <TableCell sx={{ fontWeight: 700, pl: 4 }}>Nota</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.peso}</TableCell>
              <TableCell>{row.fecha}</TableCell>
              <TableCell sx={{ pl: 4 }}>{row.nota}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={1} colSpan={2} />
            <TableCell sx={{ fontWeight: 700 }}>Promedio</TableCell>
            <TableCell>
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: notaPromedio >= 11 ? '#A5D6A7' : '#EF9A9A',
                  backgroundColor: notaPromedio >= 11 ? '#F1F8E9' : '#FEEBEE',
                  color: notaPromedio >= 11 ? '#33691E' : '#B71C1C',
                  borderRadius: '4px',
                  lineHeight: '12px',
                  px: '12.5px',
                  py: '10px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  width: 'fit-content',
                }}
              >
                {notaPromedio}
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
