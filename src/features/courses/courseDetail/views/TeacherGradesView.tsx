// src/components/TeacherGradesView.tsx

import React, { FC, useState, useEffect } from 'react';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { Add, InfoOutlined, Delete as DeleteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
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
  useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import {
  useGetEvaluationsByBlockQuery,
  useCreateEvaluationMutation,
  useUpdateEvaluationMutation,
  useDeleteEvaluationMutation,
} from '@/services/evaluations/evaluationsApi';

import { useGetEnrolledStudentsGradesQuery } from '@/services/enrollmentBlocks/enrollmentBlocksApi';
import { usePostBlockGradesMutation } from '@/services/grades/gradesSvc';

import { showToast } from '@/helpers/notifier';

interface Evaluacion {
  id: string;
  title: string;
  weight: string;
  date: Dayjs | null;
  isNew?: boolean;
}

type AlumnoConNotas = {
  id: number;
  name: string;
  enrollmentId: string;
  [key: string]: string | number;
};

interface TeacherGradesViewProps {
  blockId: string;
}

const TeacherGradesView: FC<TeacherGradesViewProps> = ({ blockId }) => {
  const theme = useTheme();

  // ─── 0️⃣ Hooks de estado ─────────────────────────────────────────────────────────────────
  const [evaluaciones, setEvaluaciones] = useState<Evaluacion[]>([]);
  const [isEditingAll, setIsEditingAll] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // ─── Diálogo de confirmación de guardado de notas ───────────────────────────────────────
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  // ─── “notas”, “notesEditable” y “editedStudentIds” ──────────────────────────────────────
  const [notas, setNotas] = useState<AlumnoConNotas[]>([]);
  const [notesEditable, setNotesEditable] = useState(false);
  const [editedStudentIds, setEditedStudentIds] = useState<Set<number>>(new Set());

  // ─── 1️⃣ RSQ: fetch de evaluaciones ──────────────────────────────────────────────────────
  const {
    data: fetchedEvaluations,
    isLoading: isLoadingEvals,
    isFetching: isFetchingEvals,
    error: errorEvals,
  } = useGetEvaluationsByBlockQuery({ blockId: blockId || '' }, { skip: !blockId });

  // ─── 2️⃣ Mutations para evaluaciones ─────────────────────────────────────────────────────
  const [createEvaluation, { isLoading: isCreating }] = useCreateEvaluationMutation();
  const [updateEvaluation, { isLoading: isUpdating }] = useUpdateEvaluationMutation();
  const [deleteEvaluation, { isLoading: isDeleting }] = useDeleteEvaluationMutation();

  // ─── 3️⃣ Mapear “fetchedEvaluations” a estado local ───────────────────────────────────────
  useEffect(() => {
    if (!fetchedEvaluations) return;
    const mapped: Evaluacion[] = fetchedEvaluations.map((ev) => ({
      id: ev.id,
      title: ev.title,
      weight: ev.weight.toString(),
      date: dayjs(ev.evaluationDate),
      isNew: false,
    }));
    setEvaluaciones(mapped);
    setHasChanges(false);
  }, [fetchedEvaluations]);

  // ─── 4️⃣ Cambios inline en tabla de evaluaciones ───────────────────────────────────────────
  const handleChange = (id: string, field: keyof Evaluacion, value: any) => {
    setEvaluaciones((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
    setHasChanges(true);
  };

  // ─── 5️⃣ Agregar nueva evaluación ─────────────────────────────────────────────────────────
  const handleAddEvaluacion = () => {
    const tempId = `temp-${Date.now()}`;
    setEvaluaciones((prev) => [...prev, { id: tempId, title: '', weight: '0', date: null, isNew: true }]);
    setIsEditingAll(true);
    setHasChanges(true);
  };

  // ─── 6️⃣ Eliminar evaluación ───────────────────────────────────────────────────────────────
  const handleDeleteEvaluacion = async (id: string) => {
    const ev = evaluaciones.find((e) => e.id === id);
    if (!ev || !blockId) return;

    if (ev.isNew) {
      setEvaluaciones((prev) => prev.filter((e) => e.id !== id));
    } else {
      try {
        await deleteEvaluation({ id, blockId }).unwrap();
        setEvaluaciones((prev) => prev.filter((e) => e.id !== id));
        showToast('Evaluación eliminada.', 'success');
      } catch {
        showToast('Error al eliminar la evaluación.', 'error');
      }
    }
    setHasChanges(true);
  };

  // ─── 7️⃣ Validar evaluación individual ─────────────────────────────────────────────────────
  const isValidEvaluacion = (ev: Evaluacion) => {
    const peso = parseFloat(ev.weight);
    return ev.title.trim() !== '' && !isNaN(peso) && peso >= 0 && peso <= 100 && ev.date !== null;
  };

  // ─── 8️⃣ Guardar todas las evaluaciones batch ────────────────────────────────────────────────
  const handleSaveAll = async () => {
    if (!blockId) return;

    for (const ev of evaluaciones) {
      if (!isValidEvaluacion(ev)) {
        showToast('Completa todos los campos correctamente.', 'error');
        return;
      }
    }

    try {
      await Promise.all(
        evaluaciones.map(async (ev) => {
          const payload = {
            blockId,
            title: ev.title,
            evaluationDate: ev.date!.format('YYYY-MM-DD'),
            weight: parseFloat(ev.weight),
          };

          if (ev.isNew) {
            const created = await createEvaluation(payload).unwrap();
            setEvaluaciones((prev) =>
              prev.map((row) =>
                row.id === ev.id
                  ? {
                      id: created.id,
                      title: created.title,
                      weight: created.weight.toString(),
                      date: dayjs(created.evaluationDate),
                      isNew: false,
                    }
                  : row,
              ),
            );
          } else {
            await updateEvaluation({ id: ev.id, ...payload }).unwrap();
          }
        }),
      );
      showToast('Evaluaciones guardadas.', 'success');
      setIsEditingAll(false);
      setHasChanges(false);
    } catch {
      showToast('Error al guardar las evaluaciones.', 'error');
    }
  };

  // ─── 9️⃣ Control de habilitación del botón “Guardar evaluaciones” ────────────────────────────
  const saveEnabled = hasChanges && !isCreating && !isUpdating && !isDeleting;

  // ─── 🔟 RSQ: fetch de las notas de estudiantes para este bloque ───────────────────────────────
  const {
    data: fetchedGrades,
    isLoading: isLoadingGrades,
    isFetching: isFetchingGrades,
    error: errorGrades,
  } = useGetEnrolledStudentsGradesQuery({ blockId }, { skip: !blockId });

  // ─── 1️⃣1️⃣ Cuando llegan las notas, mapear a “notas” con enrollmentId ────────────────────────
  useEffect(() => {
    if (!fetchedGrades) {
      setNotas([]);
      return;
    }

    const mappedNotas: AlumnoConNotas[] = fetchedGrades.students.map((stu, idx) => {
      const entry: AlumnoConNotas = {
        id: idx,
        name: stu.userName,
        enrollmentId: stu.enrollmentId,
      };
      stu.evaluations.forEach((ev, j) => {
        const letter = String.fromCharCode(65 + j);
        entry[letter] = ev.score;
      });
      return entry;
    });

    setNotas(mappedNotas);
    setEditedStudentIds(new Set());
  }, [fetchedGrades]);

  // ─── 1️⃣2️⃣ Reconstruir evaluaciones “válidas” + sus letras ──────────────────────────────────
  const evaluacionesValidas = evaluaciones
    .filter((ev) => !ev.isNew && ev.title.trim() !== '' && ev.date)
    .map((ev, idx) => ({
      ...ev,
      letter: String.fromCharCode(65 + idx),
    }));
  const evaluacionLetters = evaluacionesValidas.map((ev) => ev.letter!);

  // ─── 1️⃣3️⃣ Usar el hook para guardar notas por bloque ─────────────────────────────────────────
  const [postBlockGrades, { isLoading: isSavingGrades }] = usePostBlockGradesMutation();

  const handleNotaChange = (id: number, letra: string, value: string) => {
    setNotas((prev) => prev.map((alumno) => (alumno.id === id ? { ...alumno, [letra]: value } : alumno)));
    setEditedStudentIds((prev) => {
      const copy = new Set(prev);
      copy.add(id);
      return copy;
    });
  };

  // ─── 1️⃣4️⃣ Función para “Guardar notas” (solo filas editadas) ─────────────────────────────────
  const handleSaveGrades = async () => {
    if (!blockId) return;

    const editedNotas = notas.filter((alumno) => editedStudentIds.has(alumno.id));

    if (editedNotas.length === 0) {
      showToast('No hay cambios para guardar.', 'info');
      setNotesEditable(false);
      return;
    }

    const studentGrades = editedNotas.map((alumno) => {
      const gradeRecords = evaluacionesValidas.map((ev) => {
        const letra = ev.letter!;
        const raw = alumno[letra]?.toString() || '0';
        const score = parseFloat(raw);
        return {
          evaluationId: ev.id,
          score: isNaN(score) ? 0 : score,
        };
      });
      return {
        enrollmentId: alumno.enrollmentId,
        gradeRecords,
      };
    });

    try {
      await postBlockGrades({ blockId, studentGrades }).unwrap();
      showToast('Notas guardadas.', 'success');
      setNotesEditable(false);
      handleOpenDialog();
      setEditedStudentIds(new Set());
    } catch {
      showToast('Error al guardar las notas.', 'error');
    }
  };

  // ─── 1️⃣5️⃣ Mientras carga evaluaciones o notas → spinner ─────────────────────────────────────────
  if (isLoadingEvals || isFetchingEvals) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (errorEvals) {
    return <Alert severity="error">Error al cargar evaluaciones.</Alert>;
  }
  if (isLoadingGrades || isFetchingGrades) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (errorGrades) {
    return <Alert severity="error">Error al cargar las notas de alumnos.</Alert>;
  }

  // ─── 1️⃣6️⃣ Calcular pesos por letra ───────────────────────────────────────────────────────────
  const pesosPorLetra: Record<string, number> = {};
  evaluacionesValidas.forEach((ev, idx) => {
    const letter = evaluacionLetters[idx];
    pesosPorLetra[letter] = parseFloat(ev.weight);
  });

  // ─── 1️⃣7️⃣ JSX de renderizado ─────────────────────────────────────────────────────────────────
  return (
    <>
      <Typography sx={{ color: 'neutral.dark', fontWeight: '700' }}>Modelo de evaluaciones</Typography>
      <Typography variant="body1" sx={{ mb: '24px' }}>
        Edita todas las evaluaciones en bloque.
      </Typography>

      {/* Botones “Editar/Guardar” y “Agregar” para evaluaciones */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <Button
          variant="contained"
          onClick={() => (isEditingAll ? handleSaveAll() : setIsEditingAll(true))}
          disabled={isEditingAll ? !saveEnabled : isCreating || isUpdating}
        >
          {isEditingAll ? 'Guardar' : 'Editar'}
        </Button>
        <Button startIcon={<Add />} onClick={handleAddEvaluacion} color="secondary" sx={{ ml: 2 }}>
          Agregar
        </Button>
      </Box>

      {/* Tabla de evaluaciones */}
      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>#</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  Peso
                  <Tooltip title="Sistema de promedio ponderado.">
                    <InfoOutlined sx={{ fontSize: 14 }} />
                  </Tooltip>
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {evaluaciones.map((ev) => {
              const letterIndex = evaluacionesValidas.findIndex((v) => v.id === ev.id);
              const letter = letterIndex >= 0 ? String.fromCharCode(65 + letterIndex) : '';
              const isEditing = isEditingAll;

              return (
                <TableRow key={ev.id}>
                  <TableCell>{letter}</TableCell>
                  <TableCell>
                    <TextField
                      variant="standard"
                      fullWidth
                      disabled={!isEditing}
                      value={ev.title}
                      onChange={(e) => handleChange(ev.id, 'title', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <OutlinedInput
                      value={ev.weight}
                      disabled={!isEditing}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d{0,3}(\.\d{0,2})?$/.test(val)) {
                          handleChange(ev.id, 'weight', val);
                        }
                      }}
                      onBlur={() => {
                        let num = parseFloat(ev.weight);
                        if (isNaN(num) || num < 0) num = 0;
                        if (num > 100) num = 100;
                        handleChange(ev.id, 'weight', num.toFixed(2));
                      }}
                      inputProps={{ inputMode: 'decimal' }}
                      sx={{
                        '.MuiOutlinedInput-input': {
                          padding: 0,
                          textAlign: 'center',
                          width: '40px',
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
                      value={ev.date}
                      onChange={(newDate) => handleChange(ev.id, 'date', newDate)}
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
                    <IconButton
                      onClick={() => handleDeleteEvaluacion(ev.id)}
                      disabled={isCreating || isUpdating || isDeleting}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider sx={{ my: 4 }} />

      {/* ─── Sección “Notas de estudiantes” ────────────────────────────────────────────────────── */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography sx={{ color: 'neutral.dark', fontWeight: '700' }}>Notas de estudiantes</Typography>
          <Typography>Aquí se muestran las calificaciones que cada alumno obtuvo en las evaluaciones.</Typography>
        </Box>

        {/* --- Botón que alterna Editar / Guardar notas --- */}
        <Button
          variant="contained"
          onClick={() => (notesEditable ? handleSaveGrades() : setNotesEditable(true))}
          disabled={notesEditable ? isSavingGrades : false}
        >
          {notesEditable ? isSavingGrades ? <CircularProgress size={24} color="inherit" /> : 'Guardar' : 'Editar'}
        </Button>
      </Box>

      {/* ─── Diálogo “¡Notas subido con éxito!” (abre tras guardar) ────────────────────────────── */}
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
          <Button component={Link} to="/courses/posgrado/course/final-grades" variant="contained" size="large">
            Ver notas finales
          </Button>
        </DialogActions>
      </Dialog>

      {/* ─── Tabla de alumnos con calificaciones ───────────────────────────────────────────────── */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Nombre</TableCell>
              {evaluacionLetters.map((letra) => (
                <TableCell
                  key={letra}
                  align="center"
                  sx={{
                    fontWeight: 700,
                    '&:hover': { backgroundColor: theme.palette.action.hover }, // sombreado al pasar mouse
                  }}
                >
                  {letra}
                </TableCell>
              ))}
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  '&:hover': { backgroundColor: theme.palette.action.hover },
                }}
              >
                Promedio
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  '&:hover': { backgroundColor: theme.palette.action.hover },
                }}
              >
                Modificado
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {notas.map((alumno) => {
              let promedio = '-';
              if (evaluacionLetters.length > 0) {
                let suma = 0;
                let totalPeso = 0;
                evaluacionLetters.forEach((letra) => {
                  const notaStr = alumno[letra]?.toString() || '0';
                  const notaNum = parseFloat(notaStr);
                  const peso = pesosPorLetra[letra] || 0;
                  if (!isNaN(notaNum) && peso > 0) {
                    suma += notaNum * peso;
                    totalPeso += peso;
                  }
                });
                promedio = totalPeso > 0 ? (suma / totalPeso).toFixed(2) : '-';
              }

              const wasEdited = editedStudentIds.has(alumno.id);
              const dotColor = wasEdited ? '#198754' : '#e7e7e7';

              return (
                <TableRow
                  key={alumno.id}
                  sx={{
                    // Este bloque sombreará toda la fila al pasar el ratón
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <TableCell>{alumno.name}</TableCell>

                  {evaluacionLetters.map((letra) => {
                    // Detectar si el valor actual de esta celda es inválido
                    const raw = alumno[letra]?.toString() ?? '';
                    const num = parseFloat(raw);
                    const isInvalid = notesEditable && (raw === '' || isNaN(num) || num < 0 || num > 20);

                    return (
                      <TableCell
                        key={letra}
                        align="center"
                        sx={{
                          '&:hover': { backgroundColor: theme.palette.action.hover },
                        }}
                      >
                        <OutlinedInput
                          value={raw}
                          disabled={!notesEditable}
                          type="number"
                          onChange={(e) => handleNotaChange(alumno.id, letra, e.target.value)}
                          inputProps={{ step: 0.1, min: 0, max: 20 }}
                          sx={{
                            '.MuiOutlinedInput-input': {
                              paddingY: 0.1,
                              paddingX: 0.5,
                              textAlign: 'center',
                              width: '42px',
                              height: '32px',
                              color: isInvalid ? theme.palette.error.main : undefined,
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
                              borderColor: isInvalid ? theme.palette.error.main : 'neutral.dark',
                            },
                          }}
                        />
                      </TableCell>
                    );
                  })}

                  <TableCell
                    align="center"
                    sx={{
                      '&:hover': { backgroundColor: theme.palette.action.hover },
                    }}
                  >
                    {promedio}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      '&:hover': { backgroundColor: theme.palette.action.hover },
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-block',
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: dotColor,
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TeacherGradesView;
