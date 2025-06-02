import React, { FC, useEffect, useState } from 'react';
import { formatDate } from '@/helpers/formatDate';
import { ArrowDropDown, Close, ExitToApp, UploadFile } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { MaterialType, WeekWithMaterialsDto } from '@/services/materials/types';
import {
  useGetMaterialsByBlockIdQuery,
  useUploadMaterialMutation,
  useDeleteMaterialFileMutation,
} from '@/services/materials/materialsSvc';
import { useAbility } from '@/hooks/useAbility';
import { BlockType } from '@/services/courses/types';
import { useAppSelector } from '@/store/hooks';
import { UserRole } from '@/roles';
import { showToast } from '@/helpers/notifier';
import InfoItem from '../components/InfoItem';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface MaterialesViewProps {
  blockId: string;
  blockType: BlockType;
}

const getTypeLabel = (type: MaterialType): string => {
  switch (type) {
    case MaterialType.CLASS_RECORDING:
      return 'Grabación de clase';
    case MaterialType.CLASS_SLIDES:
      return 'Diapositivas';
    case MaterialType.PRACTICE_FILE:
      return 'Archivo de práctica';
    case MaterialType.EXTERNAL_LINK:
      return 'Enlace';
    default:
      return type;
  }
};

const MAX_FILE_SIZE_MB = 3;

const MaterialesView: FC<MaterialesViewProps> = ({ blockId, blockType }) => {
  // 1️⃣ Carga de semanas con materiales
  const { data: weeks, isLoading, isFetching, error: fetchError } = useGetMaterialsByBlockIdQuery({ blockId });

  // 2️⃣ Hooks para mutaciones
  const [uploadMaterial, { isLoading: isUploading, error: uploadError }] = useUploadMaterialMutation();
  const [deleteMaterialFile, { isLoading: isDeleting }] = useDeleteMaterialFileMutation();

  // 3️⃣ Estado local
  const [expanded, setExpanded] = useState<string | false>(false);
  const [dragOver, setDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [targetWeekId, setTargetWeekId] = useState<string | null>(null);
  const [openAddFileDialog, setOpenAddFileDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedMaterialType, setSelectedMaterialType] = useState<MaterialType | ''>('');
  const [materialName, setMaterialName] = useState('');
  const [resourceLink, setResourceLink] = useState('');
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  // **Nuevo estado para saber qué material está siendo eliminado**
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // 4️⃣ Permisos CASL
  const ability = useAbility();
  const canViewTheoMatAddBtn = ability.can('view', 'theoMatAddBtn');
  const canViewPracMatAddBtn = ability.can('view', 'pracMatAddBtn');
  const canViewAddBtn = (): boolean => {
    if (blockType === BlockType.THEORY) return canViewTheoMatAddBtn;
    if (blockType === BlockType.PRACTICE) return canViewPracMatAddBtn;
    return false;
  };

  // 5️⃣ Drag & Drop
  const handleDragLeave = () => setDragOver(false);
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setErrorMessage('El archivo supera los 3 MB.');
        setSelectedFile(null);
        return;
      }
      setErrorMessage('');
      setSelectedFile(file);
    }
  };
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setErrorMessage('El archivo supera los 3 MB.');
        setSelectedFile(null);
        return;
      }
      setErrorMessage('');
      setSelectedFile(file);
    }
  };

  // 6️⃣ Abrir/cerrar diálogo “Agregar material”
  const handleOpenAddFileDialog = (weekId: string) => {
    setTargetWeekId(weekId);
    setOpenAddFileDialog(true);
  };
  const handleCloseAddFileDialog = () => {
    setMaterialName('');
    setResourceLink('');
    setErrorMessage('');
    setSelectedMaterialType('');
    setSelectedFile(null);
    setTargetWeekId(null);
    setOpenAddFileDialog(false);
  };

  const handleOpenSuccessDialog = () => setOpenSuccessDialog(true);
  const handleCloseSuccessDialog = () => setOpenSuccessDialog(false);

  // 7️⃣ Expandir primera semana si no hay rol Teacher
  const { user } = useAppSelector((state) => state.auth);
  const roles = user?.['cognito:groups'] || [];
  useEffect(() => {
    if (roles.length === 0) return;
    if (weeks && weeks.length > 0 && !roles.includes(UserRole.Teacher)) {
      setExpanded(weeks[0].id);
    }
  }, [weeks, user]);

  // 8️⃣ Validación de formulario
  const canUpload = (): boolean => {
    if (!selectedMaterialType || materialName.trim() === '') return false;

    // Grabación de clase igual a Enlace externo
    if (selectedMaterialType === MaterialType.EXTERNAL_LINK || selectedMaterialType === MaterialType.CLASS_RECORDING) {
      return resourceLink.trim().length > 0;
    }
    // Diapositivas / Archivo de práctica
    if (selectedMaterialType === MaterialType.CLASS_SLIDES || selectedMaterialType === MaterialType.PRACTICE_FILE) {
      return selectedFile !== null;
    }
    return false;
  };

  // 9️⃣ Manejar subida
  const handleAddFile = async () => {
    if (!canUpload() || !targetWeekId) return;

    try {
      const formData = new FormData();
      formData.append('weekId', targetWeekId);
      formData.append('blockId', blockId);
      formData.append('title', materialName);
      formData.append('type', selectedMaterialType);

      if (
        selectedMaterialType === MaterialType.EXTERNAL_LINK ||
        selectedMaterialType === MaterialType.CLASS_RECORDING
      ) {
        formData.append('url', resourceLink.trim());
      } else {
        formData.append('url', '');
        if (selectedFile) {
          formData.append('file', selectedFile);
        }
      }

      await uploadMaterial(formData).unwrap();
      handleCloseAddFileDialog();
      handleOpenSuccessDialog();
    } catch (err) {
      console.error('Error subiendo material:', err);
      setErrorMessage('Ocurrió un error al subir. Intenta de nuevo.');
    }
  };

  // 🔟 Eliminar material (usando deletingId para controlar el botón correcto)
  const handleDeleteMaterial = async (materialId: string, weekId: string) => {
    setDeletingId(materialId); // marco este material como “en proceso”
    try {
      await deleteMaterialFile({ id: materialId, weekId, blockId }).unwrap();
      showToast('Material eliminado correctamente', 'success');
    } catch (err) {
      console.error('Error eliminando material:', err);
      showToast('Error al eliminar el material', 'error');
    } finally {
      setDeletingId(null); // sin importar resultado, limpio el estado
    }
  };

  // 1️⃣1️⃣ Loader / Error al cargar semanas
  if (isLoading || isFetching) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (fetchError) {
    return <Typography color="error">Error al cargar materiales.</Typography>;
  }

  return (
    <>
      {weeks?.map((week: WeekWithMaterialsDto) => (
        <Accordion
          key={week.id}
          elevation={0}
          expanded={expanded === week.id}
          onChange={(_, isExpanded) => setExpanded(isExpanded ? week.id : false)}
        >
          <AccordionSummary
            sx={{
              borderRadius: '4px',
              '&.Mui-expanded': { minHeight: '48px', bgcolor: 'primary.lightest' },
              '& .MuiAccordionSummary-content.Mui-expanded': { m: '12px 0' },
            }}
            expandIcon={<ArrowDropDown />}
            aria-controls={`panel-${week.id}-content`}
            id={`panel-${week.id}-header`}
          >
            <Typography component="span">{week.week}</Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ p: 0 }}>
            {week.materials.map((mat, idx) => (
              <React.Fragment key={mat.materialId}>
                <Box
                  sx={{
                    p: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                  }}
                >
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '8px' }}>
                      <Typography sx={{ color: 'neutral.dark' }}>
                        {getTypeLabel(mat.materialType)} {mat.fileExtension ? `| ${mat.fileExtension}` : ''}
                      </Typography>
                      {false && (
                        <Box
                          sx={{
                            borderRadius: '4px',
                            px: 1,
                            borderColor: 'secondary.light',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                          }}
                        >
                          <Typography sx={{ color: 'neutral.main', fontSize: '12px' }}>Recién agregado</Typography>
                        </Box>
                      )}
                    </Box>
                    <Typography sx={{ color: 'neutral.dark', lineHeight: 1, mb: '10px' }}>{mat.name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Typography sx={{ color: 'neutral.main', lineHeight: 1, fontSize: '14px' }}>
                        {formatDate(mat.uploadDate)}
                      </Typography>
                      <Typography sx={{ color: 'neutral.main', lineHeight: 1, fontSize: '14px' }}>
                        Subido por {mat.uploadedByName}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Button variant="outlined" color="secondary" href={mat.materialUrl} target="_blank">
                      Descargar
                    </Button>

                    {roles.includes(UserRole.Teacher) && (
                      <Button
                        size="medium"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteMaterial(mat.materialId, week.id)}
                        disabled={isDeleting && deletingId === mat.materialId}
                      >
                        {isDeleting && deletingId === mat.materialId ? 'Eliminando…' : 'Eliminar'}
                      </Button>
                    )}
                  </Box>
                </Box>

                {idx < week.materials.length - 1 && <Divider />}
              </React.Fragment>
            ))}

            {/* Botón “Agregar material” para esta semana */}
            {canViewAddBtn() && (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: '28px' }}>
                  <Button
                    color="secondary"
                    variant="outlined"
                    size="large"
                    onClick={() => handleOpenAddFileDialog(week.id)}
                  >
                    Agregar material
                  </Button>
                </Box>

                <Dialog
                  open={openAddFileDialog && targetWeekId === week.id}
                  onClose={handleCloseAddFileDialog}
                  sx={{ '& .MuiDialog-paper': { borderRadius: '16px', width: '600px' } }}
                >
                  <DialogTitle
                    sx={{ m: 0, p: '16px 24px', fontSize: '20px', fontWeight: '700' }}
                    color="secondary.dark"
                  >
                    Nuevo material
                  </DialogTitle>
                  <IconButton
                    aria-label="close"
                    onClick={handleCloseAddFileDialog}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                  >
                    <Close fontSize="inherit" />
                  </IconButton>

                  <DialogContent>
                    <FormControl fullWidth variant="standard">
                      <InputLabel id="select-material-type-label" shrink>
                        Tipo de material
                      </InputLabel>
                      <Select
                        variant="standard"
                        sx={{
                          backgroundColor: 'neutral.lightest',
                          '&.Mui-focused': {
                            backgroundColor: 'neutral.lightest',
                          },
                        }}
                        labelId="select-material-type-label"
                        id="select-material-type"
                        value={selectedMaterialType}
                        displayEmpty
                        onChange={(e) => setSelectedMaterialType(e.target.value as MaterialType)}
                      >
                        <MenuItem value="" disabled>
                          Seleccionar
                        </MenuItem>
                        <MenuItem value={MaterialType.EXTERNAL_LINK}>Enlace externo</MenuItem>
                        <MenuItem value={MaterialType.PRACTICE_FILE}>Archivo de prácticas</MenuItem>
                        <MenuItem value={MaterialType.CLASS_SLIDES}>Diapositivas de clase</MenuItem>
                        <MenuItem value={MaterialType.CLASS_RECORDING}>Grabación de clase</MenuItem>
                      </Select>
                    </FormControl>

                    {(selectedMaterialType === MaterialType.CLASS_SLIDES ||
                      selectedMaterialType === MaterialType.PRACTICE_FILE) && (
                      <Box sx={{ display: 'flex', gap: '24px', flexDirection: 'column', mt: '24px' }}>
                        <TextField
                          fullWidth
                          placeholder="Título de material"
                          label="Título de material"
                          variant="standard"
                          onChange={(e) => setMaterialName(e.target.value)}
                          value={materialName}
                          slotProps={{
                            inputLabel: {
                              shrink: true,
                            },
                          }}
                        />

                        <Box>
                          <Typography sx={{ color: 'neutral.dark', mb: '16px' }}>Cargar archivo</Typography>
                          <Box
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            sx={{
                              p: '24px 8px',
                              border: '1px dashed',
                              borderColor: dragOver ? 'primary.dark' : '#0000001F',
                              bgcolor: dragOver ? 'primary.lightest' : 'transparent',
                              transition: 'all 0.3s ease',
                              borderRadius: '4px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '8px',
                              justifyContent: 'center',
                              alignItems: 'center',
                              minWidth: { md: '552px' },
                            }}
                          >
                            <UploadFile color="primary" />
                            <Typography variant="body1" color="#000000DE">
                              Arrastra aquí o
                            </Typography>
                            <Button component="label" size="large" variant="outlined" color="secondary">
                              Subir desde el ordenador
                              <VisuallyHiddenInput type="file" onChange={handleFileInputChange} />
                            </Button>
                            <Typography variant="body2">SVG, PNG, JPG o GIF (máx. 3 MB)</Typography>
                            {errorMessage ? (
                              <Typography variant="body2" color="error">
                                {errorMessage}
                              </Typography>
                            ) : selectedFile ? (
                              <Typography variant="body2" color="success.main">
                                {selectedFile.name}
                              </Typography>
                            ) : null}
                          </Box>
                        </Box>
                      </Box>
                    )}

                    {(selectedMaterialType === MaterialType.EXTERNAL_LINK ||
                      selectedMaterialType === MaterialType.CLASS_RECORDING) && (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', mt: '24px' }}>
                        <TextField
                          required
                          fullWidth
                          placeholder="Título de material"
                          label="Título de material"
                          variant="standard"
                          onChange={(e) => setMaterialName(e.target.value)}
                          value={materialName}
                          slotProps={{
                            inputLabel: {
                              shrink: true,
                            },
                          }}
                        />

                        <TextField
                          required
                          type="url"
                          autoComplete="off"
                          fullWidth
                          placeholder="https://ejemplo.com"
                          label="URL de recurso"
                          variant="standard"
                          value={resourceLink}
                          onChange={(e) => setResourceLink(e.target.value)}
                          slotProps={{
                            inputLabel: {
                              shrink: true,
                            },
                          }}
                        />
                      </Box>
                    )}

                    {uploadError && (
                      <Typography color="error" sx={{ mt: 2 }}>
                        Ocurrió un error al intentar subir. Intenta nuevamente.
                      </Typography>
                    )}
                  </DialogContent>

                  <DialogActions sx={{ justifyContent: 'center', p: '24px' }}>
                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      onClick={handleAddFile}
                      disabled={!canUpload() || isUploading}
                    >
                      {isUploading ? 'Subiendo…' : 'Subir material'}
                    </Button>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={openSuccessDialog}
                  onClose={handleCloseSuccessDialog}
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
                    <Typography
                      color="secondary.darkest"
                      sx={{ fontSize: '20px', fontWeight: '800', textAlign: 'center' }}
                    >
                      ¡Material subido con éxito!
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: 'center', mb: '24px' }}>
                      Tu archivo ya está disponible para los estudiantes.
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
                    <Button
                      onClick={handleCloseSuccessDialog}
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={<ExitToApp />}
                    >
                      Volver al módulo
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default MaterialesView;
