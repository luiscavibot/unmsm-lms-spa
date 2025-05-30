// TeacherGradesView.tsx
import React from 'react';
import { Add, Delete, Edit, InfoOutlined, Save } from '@mui/icons-material';
import { Dayjs } from 'dayjs';
import {
  // useLocation,
  Link,
} from 'react-router-dom';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

interface Evaluacion {
  id: number;
  name: string;
  weight: string;
  date: Dayjs | null;
}

type AlumnoConNotas = {
  id: number;
  name: string;
  [key: string]: string | number;
};

const TeacherGradesView = () => {
  //   const location = useLocation();
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  //   const initialized = React.useRef(false);
  const [evaluaciones, setEvaluaciones] = React.useState<Evaluacion[]>([]);
  const [editingRows, setEditingRows] = React.useState<Record<number, boolean>>({});

  const handleChange = (id: number, field: keyof Evaluacion, value: any) => {
    setEvaluaciones((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const toggleEdit = (id: number) => {
    setEditingRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDeleteEvaluacion = (id: number) => {
    setEvaluaciones((prev) => prev.filter((e) => e.id !== id));
    setEditingRows((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handleAddEvaluacion = () => {
    const newId = evaluaciones.length ? Math.max(...evaluaciones.map((e) => e.id)) + 1 : 1;
    setEvaluaciones((prev) => [...prev, { id: newId, name: '', weight: '1', date: null }]);
    setEditingRows((prev) => ({ ...prev, [newId]: true }));
  };

  const canSaveEvaluacion = (evaluacion: Evaluacion) => {
    const pesoNum = parseInt(evaluacion.weight, 10);
    return (
      evaluacion.name.trim() !== '' && !isNaN(pesoNum) && pesoNum >= 1 && pesoNum <= 100 && evaluacion.date !== null
    );
  };

  const evaluacionesValidas = evaluaciones
    .filter((ev) => {
      const pesoNum = parseInt(ev.weight, 10);
      return (
        ev.name.trim() !== '' &&
        !isNaN(pesoNum) &&
        pesoNum >= 1 &&
        pesoNum <= 100 &&
        ev.date !== null &&
        !editingRows[ev.id] // ✅ Asegurarse de que esté guardada
      );
    })
    .map((ev, idx) => ({
      ...ev,
      letter: String.fromCharCode(65 + idx), // ✅ Asignar letra directamente
    }));

  const evaluacionLetters = evaluacionesValidas.map((ev) => ev.letter);

  const [notas, setNotas] = React.useState<AlumnoConNotas[]>(
    [
      { id: 1, name: 'Ana Torres' },
      { id: 2, name: 'Luis Martínez' },
      { id: 3, name: 'Pedro Gómez' },
    ].map((alumno) => {
      const base: AlumnoConNotas = { ...alumno };
      evaluacionesValidas.forEach((ev) => (base[ev.letter] = ''));
      return base;
    }),
  );

  const calcularPromedioPonderado = (alumno: AlumnoConNotas, pesos: Record<string, number>) => {
    let suma = 0;
    let totalPeso = 0;

    for (const { letter: letra } of evaluacionesValidas) {
      const nota = parseFloat(alumno[letra]?.toString() || '0');
      const peso = pesos[letra] || 0;

      if (!isNaN(nota) && peso > 0) {
        suma += nota * peso;
        totalPeso += peso;
      }
    }

    return totalPeso > 0 ? (suma / totalPeso).toFixed(1) : '-';
  };

  const [editingNotas, setEditingNotas] = React.useState<Record<number, boolean>>({});

  const handleNotaChange = (id: number, letra: string, value: string) => {
    setNotas((prev) => prev.map((alumno) => (alumno.id === id ? { ...alumno, [letra]: value.toString() } : alumno)));
  };

  const todosGuardados = notas.every((alumno) => !editingNotas[alumno.id]);

  const todasNotasCompletas = notas.every((alumno) =>
    evaluacionLetters.every((letra) => {
      const notaStr = alumno[letra]?.toString() || '';
      const nota = parseFloat(notaStr);
      return notaStr !== '' && !isNaN(nota) && nota >= 0 && nota <= 20;
    }),
  );

  const guardarHabilitado = todosGuardados && todasNotasCompletas;

  const handleSaveGrades = () => {
    handleOpenDialog();
  };

  //   React.useEffect(() => {
  //     if (!initialized.current && evaluaciones.length === 0) {
  //       const newId = 1;
  //       setEvaluaciones([{ id: newId, name: '', weight: '1', date: null }]);
  //       setEditingRows({ [newId]: true });
  //       initialized.current = true;
  //     }
  //   }, [evaluaciones.length]);

  return (
    <>
      <Typography sx={{ color: 'neutral.dark', fontWeight: '700' }}>Modelo de evaluaciones</Typography>
      <Typography variant="body1" sx={{ mb: '24px' }}>
        Edite el tipo y la fecha de cada evaluación según la planificación del curso.
      </Typography>
      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Detalle de evaluaciones</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  Peso
                  <Tooltip title="Es el valor que tiene una nota dentro del promedio final. Cuanto mayor es el peso, más influye en la calificación. Debe ingresar un número entero del 1 al 100.">
                    <InfoOutlined sx={{ fontSize: 14 }} />
                  </Tooltip>
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Fecha</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {evaluaciones.map(({ id, name, weight, date }, idx) => {
              const isEditing = editingRows[id] || false;
              return (
                <TableRow key={id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0px 48px' }}>
                      <Typography sx={{ fontWeight: '700' }}>{evaluacionLetters[idx]}</Typography>
                      <TextField
                        label="Nombre"
                        variant="standard"
                        disabled={!isEditing}
                        value={name}
                        onChange={(e) => handleChange(id, 'name', e.target.value)}
                        slotProps={{
                          inputLabel: { shrink: true },
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <OutlinedInput
                      value={weight}
                      disabled={!isEditing}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '' || /^[1-9][0-9]{0,1}$|^100$/.test(val)) {
                          handleChange(id, 'weight', val);
                        }
                      }}
                      onBlur={() => {
                        let num = parseInt(weight, 10);
                        if (isNaN(num) || num < 1) num = 1;
                        if (num > 100) num = 100;
                        handleChange(id, 'weight', num.toString());
                      }}
                      inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                      }}
                      sx={{
                        '.MuiOutlinedInput-input': {
                          padding: 0,
                          textAlign: 'center',
                          width: '32px',
                          height: '32px',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'neutral.dark',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <DatePicker
                      label="Seleccionar fecha"
                      value={date}
                      onChange={(newDate) => handleChange(id, 'date', newDate)}
                      disabled={!isEditing}
                      format="DD/MM/YYYY"
                      slotProps={{
                        textField: {
                          variant: 'standard',
                          InputLabelProps: { shrink: true },
                          InputProps: {
                            disabled: !isEditing,
                            sx: !isEditing
                              ? {
                                  color: 'text.disabled',
                                  '& .MuiInputBase-input': {
                                    color: 'text.disabled',
                                  },
                                  '& .MuiInput-underline:before': {
                                    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
                                  },
                                }
                              : {},
                          },
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <IconButton
                        onClick={() => {
                          if (isEditing && !canSaveEvaluacion({ id, name, weight, date })) {
                            alert('Completa todos los campos antes de guardar.');
                            return;
                          }
                          toggleEdit(id);
                        }}
                      >
                        {isEditing ? <Save /> : <Edit />}
                      </IconButton>
                      <IconButton onClick={() => handleDeleteEvaluacion(id)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 1 }}>
        <Button startIcon={<Add />} onClick={handleAddEvaluacion} color="secondary" fullWidth>
          Agregar evaluación
        </Button>
      </Box>
      <Divider sx={{ my: 4 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography sx={{ color: 'neutral.dark', fontWeight: '700' }}>Ingrese las notas</Typography>
          <Typography>Complete la tabla con las calificaciones de sus alumnos.</Typography>
        </Box>
        <Button onClick={handleSaveGrades} variant="contained" size="large" disabled={!guardarHabilitado}>
          Guardar
        </Button>
      </Box>
      <Dialog
        onClose={handleCloseDialog}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '24px',
            padding: '40px',
            width: { xs: '100%', sm: '659px' },
            maxWidth: '100%',
          },
        }}
      >
        <DialogContent sx={{ pb: '48px' }}>
          <Typography color="secondary.darkest" sx={{ fontSize: '20px', fontWeight: '800', textAlign: 'center' }}>
            ¡Notas subido con éxito!
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', mb: '24px' }}>
            Las calificaciones finales ya están disponibles.
          </Typography>
          <Box
            component="img"
            src="/images/operacion-exitosa.png"
            alt="Operación exitosa"
            sx={{
              display: 'block',
              mx: 'auto',
              maxWidth: { xs: '281px', md: '281px' },
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: '8px' }}>
          <Button onClick={handleCloseDialog} variant="outlined" color="secondary" size="large">
            Volver al módulo
          </Button>
          <Button
            component={Link}
            to="/courses/posgrado/course/final-grades"
            // to={`${location.pathname}/final-grades`}
            variant="contained"
            size="large"
          >
            Ver notas finales
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Nombre</TableCell>
              {evaluacionLetters.map((letra) => (
                <TableCell key={letra} align="center" sx={{ fontWeight: 700 }}>
                  {letra}
                </TableCell>
              ))}
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                Promedio
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {(() => {
              const pesos: Record<string, number> = {};
              evaluacionesValidas.forEach((evalItem, idx) => {
                const letra = evaluacionLetters[idx];
                pesos[letra] = parseInt(evalItem.weight || '0', 10);
              });
              return notas.map((alumno) => {
                const isEditing = editingNotas[alumno.id] || false;
                const promedio = calcularPromedioPonderado(alumno, pesos);
                return (
                  <TableRow key={alumno.id}>
                    <TableCell>{alumno.name}</TableCell>
                    {evaluacionLetters.map((letra) => (
                      <TableCell key={letra} align="center">
                        <OutlinedInput
                          value={alumno[letra]?.toString() || ''}
                          disabled={!isEditing}
                          type="number"
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '' || /^(\d{1,2})(\.\d{0,2})?$|^20(\.0{0,2})?$/.test(val)) {
                              handleNotaChange(alumno.id, letra, val);
                            }
                          }}
                          onBlur={() => {
                            let num = parseFloat(alumno[letra]?.toString() || '0');
                            if (isNaN(num)) num = 0;
                            if (num < 0) num = 0;
                            if (num > 20) num = 20;
                            handleNotaChange(alumno.id, letra, num.toFixed(1));
                          }}
                          inputProps={{ step: 0.1, min: 0, max: 20 }}
                          sx={{
                            '.MuiOutlinedInput-input': {
                              padding: 0,
                              textAlign: 'center',
                              width: '42px',
                              height: '32px',
                              '&::-webkit-outer-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0,
                              },
                              '&::-webkit-inner-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0,
                              },
                              '&[type=number]': {
                                MozAppearance: 'textfield',
                              },
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'neutral.dark',
                            },
                          }}
                        />
                      </TableCell>
                    ))}
                    <TableCell align="center">{promedio}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => setEditingNotas((prev) => ({ ...prev, [alumno.id]: !prev[alumno.id] }))}
                      >
                        {isEditing ? <Save /> : <Edit />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              });
            })()}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TeacherGradesView;
