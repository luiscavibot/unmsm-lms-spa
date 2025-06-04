import React, { FC, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { UploadFile, Close, ExitToApp } from '@mui/icons-material';
import { MaterialType } from '@/services/materials/types';

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

interface AddMaterialDialogProps {
  open: boolean;
  weekId: string | null;
  blockId: string;
  isUploading: boolean;
  uploadError: unknown;
  onClose: () => void;
  onUpload: (formData: FormData) => Promise<void>;
}

const MAX_FILE_SIZE_MB = 3;

const AddMaterialDialog: FC<AddMaterialDialogProps> = ({
  open,
  weekId,
  blockId,
  isUploading,
  uploadError,
  onClose,
  onUpload,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedMaterialType, setSelectedMaterialType] = useState<MaterialType | ''>('');
  const [materialName, setMaterialName] = useState('');
  const [resourceLink, setResourceLink] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);

  const resetState = () => {
    setMaterialName('');
    setResourceLink('');
    setErrorMessage('');
    setSelectedMaterialType('');
    setSelectedFile(null);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleCloseSuccess = () => setOpenSuccess(false);

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
        setErrorMessage('El archivo supera los 3\u2009MB.');
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
        setErrorMessage('El archivo supera los 3\u2009MB.');
        setSelectedFile(null);
        return;
      }
      setErrorMessage('');
      setSelectedFile(file);
    }
  };

  const canUpload = (): boolean => {
    if (!selectedMaterialType || materialName.trim() === '') return false;
    if (selectedMaterialType === MaterialType.EXTERNAL_LINK || selectedMaterialType === MaterialType.CLASS_RECORDING) {
      return resourceLink.trim().length > 0;
    }
    if (selectedMaterialType === MaterialType.CLASS_SLIDES || selectedMaterialType === MaterialType.PRACTICE_FILE) {
      return selectedFile !== null;
    }
    return false;
  };

  const handleAddFile = async () => {
    if (!canUpload() || !weekId) return;
    const formData = new FormData();
    formData.append('weekId', weekId);
    formData.append('blockId', blockId);
    formData.append('title', materialName);
    formData.append('type', selectedMaterialType);
    if (selectedMaterialType === MaterialType.EXTERNAL_LINK || selectedMaterialType === MaterialType.CLASS_RECORDING) {
      formData.append('url', resourceLink.trim());
    } else {
      formData.append('url', '');
      if (selectedFile) {
        formData.append('file', selectedFile);
      }
    }
    try {
      await onUpload(formData);
      handleClose();
      setOpenSuccess(true);
    } catch (err) {
      console.error('Error subiendo material:', err);
      setErrorMessage('Ocurrió un error al subir. Intenta de nuevo.');
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { borderRadius: '16px', width: { xs: '100%', sm: '600px' } } }}
      >
        <DialogTitle sx={{ m: 0, p: '16px 24px', fontSize: '20px', fontWeight: '700' }} color="secondary.dark">
          Nuevo material
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <Close fontSize="inherit" />
        </IconButton>
        <DialogContent>
          <FormControl fullWidth variant="standard">
            <InputLabel id="select-material-type-label" shrink>
              Tipo de material
            </InputLabel>
            <Select
              variant="standard"
              sx={{ backgroundColor: 'neutral.lightest', '&.Mui-focused': { backgroundColor: 'neutral.lightest' } }}
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
                slotProps={{ inputLabel: { shrink: true } }}
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
                    width: '100%',
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
                  <Typography variant="body2">SVG, PNG, JPG o GIF (máx. 3\u2009MB)</Typography>
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
                slotProps={{ inputLabel: { shrink: true } }}
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
                slotProps={{ inputLabel: { shrink: true } }}
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
        open={openSuccess}
        onClose={handleCloseSuccess}
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
            onClick={handleCloseSuccess}
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
  );
};

export default AddMaterialDialog;
