import { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Tooltip, CircularProgress, Alert } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import { useGetStudentGradesByBlockIdQuery } from '@/services/grades/gradesSvc';

interface AlumnoNotasViewProps {
  blockId: string;
}

const AlumnoNotasView: FC<AlumnoNotasViewProps> = ({ blockId }) => {
  const { data, isLoading, isFetching, error } = useGetStudentGradesByBlockIdQuery({ blockId });
  console.log('data', data);

  if (isLoading || isFetching) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error || !data) {
    return <Alert severity="error">Error al cargar las notas.</Alert>;
  }

  const { averageGrade, evaluations } = data;

  return (
    <TableContainer component={Box}>
      <Table sx={{ width: 660 }} aria-label="Tabla de notas">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Evaluaciones</TableCell>
            <TableCell sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
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
          {evaluations.map((ev) => (
            <TableRow key={ev.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {ev.name}
              </TableCell>
              <TableCell>{ev.weight}</TableCell>
              <TableCell>{ev.evaluationDate}</TableCell>
              <TableCell sx={{ pl: 4 }}>{ev.grade}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={2} />
            <TableCell sx={{ fontWeight: 700 }}>Promedio</TableCell>
            <TableCell>
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: averageGrade >= 11 ? '#A5D6A7' : '#EF9A9A',
                  backgroundColor: averageGrade >= 11 ? '#F1F8E9' : '#FEEBEE',
                  color: averageGrade >= 11 ? '#33691E' : '#B71C1C',
                  borderRadius: '4px',
                  lineHeight: '12px',
                  px: 2,
                  py: 1,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {averageGrade}
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AlumnoNotasView;
