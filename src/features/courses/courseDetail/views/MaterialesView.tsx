import React, { FC, useEffect, useState } from 'react';
import { formatDate } from '@/helpers/formatDate';
import { Add, ArrowDropDown, Close, ExitToApp, UploadFile } from '@mui/icons-material';
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
import { useGetMaterialsByBlockIdQuery } from '@/services/materials/materialsSvc';
import { createCan } from '@/helpers/createCan';
import { role } from '@/configs/consts';
import { SelectChangeEvent } from '@mui/material/Select';

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

const MaterialesView: FC<MaterialesViewProps> = ({ blockId }) => {
  const { data: weeks, isLoading, isFetching, error } = useGetMaterialsByBlockIdQuery({ blockId });
  const [expanded, setExpanded] = useState<string | false>(false);

  const [dragOver, setDragOver] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [fileTarget, setFileTarget] = React.useState<string | null>(null);
  const [openAddFileDialog, setOpenAddFileDialog] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [selectedMaterialType, setSelectedMaterialType] = useState('');
  const [materialName, setMaterialName] = useState('');
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);

  const can = createCan(role);
  const canAddWeeks = can('addWeeks', 'Weeks');
  const canAddMaterials = can('addMaterials', 'Materials');

  const handleAddFile = () => {
    if (!selectedFile || !fileTarget) return;
    // Agregar lógica para subir el archivo al servidor
    handleCloseAddFileDialog();
    handleOpenSuccessDialog();
  };

  const handleCloseAddFileDialog = () => {
    setMaterialName('');
    setErrorMessage('');
    setSelectedMaterialType('');
    setSelectedFile(null);
    setFileTarget(null);
    setOpenAddFileDialog(false);
  };

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
        setErrorMessage('El archivo supera los 3MB.');
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
        setErrorMessage('El archivo supera los 3MB.');
        setSelectedFile(null as any);
        return;
      }
      setErrorMessage('');
      setSelectedFile(file);
    }
  };

  const handleOpenAddFileDialog = (type: string) => {
    setFileTarget(type);
    setOpenAddFileDialog(true);
  };

  const handleChangeMaterialType = (event: SelectChangeEvent) => {
    setSelectedMaterialType(event.target.value);
  };

  const handleOpenSuccessDialog = () => {
    setOpenSuccessDialog(true);
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
  };

  useEffect(() => {
    if (weeks && weeks.length > 0) {
      setExpanded(weeks[0].id);
    }
  }, [weeks]);

  if (isLoading || isFetching) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return <Typography color="error">Error al cargar materiales.</Typography>;
  }

  return (
    <>
      {canAddWeeks && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '28px' }}>
          <Typography sx={{ fontWeight: '700', color: 'neutral.dark', pl: '16px' }}>Semanas</Typography>
          <Button color="secondary" variant="outlined" startIcon={<Add />} size="small">
            Nueva semana
          </Button>
        </Box>
      )}
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
            <>
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
                      <Typography sx={{ color: 'neutral.dark', lineHeight: 1, mb: '10px' }}>
                        {getTypeLabel(mat.materialType)} | {mat.materialName.split('.').pop()?.toUpperCase()}
                      </Typography>
                      <Typography sx={{ color: 'neutral.dark', lineHeight: 1, mb: '10px' }}>{mat.name}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Typography sx={{ color: 'neutral.dark', lineHeight: 1, fontSize: '14px' }}>
                          {formatDate(mat.uploadDate)}
                        </Typography>
                        <Typography sx={{ color: 'neutral.main', lineHeight: 1, fontSize: '14px' }}>
                          Subido por {mat.uploadedByName}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      variant="outlined"
                      color="secondary"
                      href={mat.materialUrl}
                      target="_blank"
                      // onClick={() => {
                      //   if (
                      //     mat.materialType === MaterialType.CLASS_RECORDING ||
                      //     mat.materialType === MaterialType.CLASS_SLIDES ||
                      //     mat.materialType === MaterialType.PRACTICE_FILE
                      //   ) {
                      //     downloadFileFromUrlString(mat.materialUrl);
                      //   } else {
                      //     window.open(mat.materialUrl, '_blank');
                      //   }
                      // }}
                    >
                      {mat.materialType === MaterialType.EXTERNAL_LINK ? 'Abrir' : 'Descargar'}
                    </Button>
                  </Box>
                  {idx < week.materials.length - 1 && <Divider />}
                </React.Fragment>
              ))}
              {canAddMaterials && (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: '28px' }}>
                    <Button
                      color="secondary"
                      variant="outlined"
                      size="large"
                      onClick={() => handleOpenAddFileDialog('semana1')}
                    >
                      Agregar material
                    </Button>
                  </Box>
                  <Dialog
                    open={openAddFileDialog}
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
                          onChange={handleChangeMaterialType}
                        >
                          <MenuItem value="" disabled>
                            Seleccionar
                          </MenuItem>
                          <MenuItem value="enlace_externo">Enlace externo</MenuItem>
                          <MenuItem value="archivo_practicas">Archivo de prácticas</MenuItem>
                          <MenuItem value="diapositivas">Diapositivas de clase</MenuItem>
                        </Select>
                      </FormControl>
                      {selectedMaterialType === 'diapositivas' && (
                        <Box sx={{ display: 'flex', gap: '24px', flexDirection: 'column', mt: '24px' }}>
                          <TextField
                            fullWidth
                            placeholder="Nombre"
                            label="Título de material"
                            variant="standard"
                            onChange={(e) => setMaterialName(e.target.value)}
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
                              <Typography variant="body2">SVG, PNG, JPG or GIF (max. 3MB)</Typography>
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
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'center', p: '24px' }}>
                      <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={handleAddFile}
                        disabled={!selectedFile || !selectedMaterialType || materialName.trim() === ''}
                      >
                        Subir material
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
            </>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default MaterialesView;
