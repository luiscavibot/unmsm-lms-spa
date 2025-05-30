import React from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import InfoItem from '../../components/InfoItem';
import { SentimentNeutral, SentimentSatisfiedAlt, SentimentVeryDissatisfied } from '@mui/icons-material';

const labelStyle = { fontWeight: 700, color: 'neutral.dark' };
const valueStyle = { fontWeight: 400, color: 'neutral.main' };

const GradesMessage = ({ approvedCount, totalStudents }: { approvedCount: number; totalStudents: number }) => {
  const percentage = (approvedCount / totalStudents) * 100;
  let borderColor = '';
  let backgroundColor = '';
  let message: React.ReactNode = null;
  let icon: React.ReactNode = null;
  const iconColorObj = {
    25: '#C62828',
    50: '#F9A825',
    75: '#2E7D32',
  };
  const borderColorObj = {
    25: '#E57373',
    50: '#FFF176',
    75: '#81C784',
  };
  const backgroundColorObj = {
    25: '#FEEBEE',
    50: '#FFFDE7',
    75: '#E8F5E9',
  };

  if (percentage >= 75) {
    borderColor = borderColorObj[75];
    backgroundColor = backgroundColorObj[75];
    message = (
      <Typography sx={{ color: 'neutral.dark' }}>
        <b>¡Felicidades!</b> Más del 75% aprobó el curso. Siga aplicando sus buenas prácticas y apoyando a quienes lo
        necesiten.
      </Typography>
    );
    icon = <SentimentSatisfiedAlt sx={{ fontSize: 48, color: iconColorObj[75] }} />;
  } else if (percentage >= 50) {
    borderColor = borderColorObj[50];
    backgroundColor = backgroundColorObj[50];
    message = (
      <Typography sx={{ color: 'neutral.dark' }}>
        El 50% de sus estudiantes aprobaron. <b>Buen punto de partida</b>. Hay oportunidad de reforzar métodos y
        acompañamiento.
      </Typography>
    );
    icon = <SentimentNeutral sx={{ fontSize: 48, color: iconColorObj[50] }} />;
  } else if (percentage >= 25) {
    borderColor = borderColorObj[25];
    backgroundColor = backgroundColorObj[25];
    message = (
      <Typography sx={{ color: 'neutral.dark' }}>
        Solo el 25% de sus estudiantes aprobaron. <b>Revise las estrategias</b> y considere ajustes para mejorar el
        aprendizaje en el próximo ciclo.
      </Typography>
    );
    icon = <SentimentVeryDissatisfied sx={{ fontSize: 48, color: iconColorObj[25] }} />;
  } else {
    return;
  }

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        color: 'neutral.dark',
        borderRadius: '4px',
        lineHeight: '12px',
        px: 2,
        py: 2,
        fontWeight: 'bold',
        display: 'flex',
        gap: '16px',
      }}
    >
      {icon}
      {message}
    </Box>
  );
};

const FinalGradeContent = () => {
  const students = [
    {
      name: 'Gutiérrez Luján, Sebastián Ignacio',
      teoria: 16.5,
      practica: 14,
      average: 15.25,
    },
    {
      name: 'Ramírez Torres, Ana María',
      teoria: 12,
      practica: 11,
      average: 11.5,
    },
    {
      name: 'Flores Huamán, Luis Alberto',
      teoria: 8,
      practica: 9,
      average: 8.5,
    },
    {
      name: 'Flores Huamán, Luis Alberto',
      teoria: 15,
      practica: 15,
      average: 15,
    },
  ];

  const approvedCount = students.filter((s) => s.average >= 11).length;
  const failedCount = students.length - approvedCount;
  const highest = Math.max(...students.map((s) => s.average));
  const lowest = Math.min(...students.map((s) => s.average));
  const courseAverage = students.reduce((acc, cur) => acc + cur.average, 0) / students.length;

  return (
    <>
      <Breadcrumbs sx={{ mb: 6 }} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/courses/posgrado">
          Inicio
        </Link>
        <Link underline="hover" color="inherit" href="/courses/posgrado">
          Cursos
        </Link>
        <Link underline="hover" color="inherit" href="/courses/posgrado/course">
          Curso nombre
        </Link>
        <Typography sx={{ color: 'text.primary' }}>Notas finales</Typography>
      </Breadcrumbs>

      <Typography sx={{ color: 'secondary.dark', fontSize: '44px', fontWeight: '700', mb: 1 }} variant="h4">
        Curso nombre
      </Typography>
      <Typography sx={{ color: 'neutral.main', fontSize: '14px', fontWeight: '400', mb: 5 }} variant="body2">
        Programa Curso nombre
      </Typography>

      <Box sx={{ borderRadius: '8px', p: 3, bgcolor: 'neutral.lightest', display: 'inline-flex', gap: 5, mb: 5 }}>
        <Box
          sx={{
            display: 'inline-grid',
            gap: '16px 40px',
            gridTemplateColumns: 'repeat(2, auto)',
          }}
        >
          <InfoItem label="Fecha de inicio: " value="fecha" />
          <InfoItem label="Fecha de fin: " value="fecha" />
          <Box>
            <Typography component="span" sx={labelStyle}>
              Año-semestre:{' '}
            </Typography>
            <Typography component="span" sx={valueStyle}>
              Semestre
            </Typography>
          </Box>
          <Box>
            <Typography component="span" sx={labelStyle}>
              Docente responsable:{' '}
            </Typography>
            <Typography component="span" sx={valueStyle}>
              Profesor
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ bgcolor: 'neutral.lightest', p: '32px 24px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '32px' }}>
          <Typography sx={{ fontSize: '20px', fontWeight: '700', color: 'neutral.dark' }}>
            Notas finales del curso
          </Typography>
          <Button size="large" variant="contained" color="primary">
            Exportar
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: '24px 16px' }}>
          <TableContainer component={Box}>
            <Table sx={{ width: 575 }} aria-label="Tabla de notas">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Nombre</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>
                    Teoría
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>
                    Práctica
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>
                    Final
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, index) => {
                  return (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell sx={{}}>{student.name}</TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'inline-block' }}>
                          <Box
                            sx={{
                              border: '1px solid',
                              borderColor: 'meutral',
                              backgroundColor: 'neutral.light',
                              color: 'neutral.dark',
                              borderRadius: '4px',
                              lineHeight: '12px',
                              px: 0,
                              py: 1,
                              fontWeight: 'bold',
                              textAlign: 'center',
                              width: '44px',
                            }}
                          >
                            {student.teoria}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'inline-block' }}>
                          <Box
                            sx={{
                              border: '1px solid',
                              borderColor: 'meutral',
                              backgroundColor: 'neutral.light',
                              color: 'neutral.dark',
                              borderRadius: '4px',
                              lineHeight: '12px',
                              px: 0,
                              py: 1,
                              fontWeight: 'bold',
                              textAlign: 'center',
                              width: '44px',
                            }}
                          >
                            {student.practica}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'inline-block' }}>
                          <Box
                            sx={{
                              border: '1px solid',
                              borderColor: student.average >= 11 ? '#A5D6A7' : '#EF9A9A',
                              backgroundColor: student.average >= 11 ? '#F1F8E9' : '#FEEBEE',
                              color: student.average >= 11 ? '#33691E' : '#B71C1C',
                              borderRadius: '4px',
                              lineHeight: '12px',
                              px: 0,
                              py: 1,
                              fontWeight: 'bold',
                              textAlign: 'center',
                              width: '44px',
                            }}
                          >
                            {student.average}
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box>
            {/* Gráfica */}
            <Typography sx={{ color: 'neutral.dark', fontWeight: '700', mb: '8px' }}>Resumen</Typography>
            <Box sx={{ mb: '24px' }}>
              <Typography variant="body1">
                Promedio general del curso: <span>{courseAverage.toFixed(1)}</span>
              </Typography>
              <Typography variant="body1">
                Nota más alta: <span>{highest}</span>
              </Typography>
              <Typography variant="body1">
                Nota más baja: <span>{lowest}</span>
              </Typography>
              <Typography variant="body1">
                Número de estudiantes aprobados: <span>{approvedCount}</span>
              </Typography>
              <Typography variant="body1">
                Número de estudiantes desaprobados: <span>{failedCount}</span>
              </Typography>
            </Box>
            <Box>
              <GradesMessage approvedCount={approvedCount} totalStudents={students.length} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FinalGradeContent;
