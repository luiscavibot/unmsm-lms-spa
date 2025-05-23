// components/UploadFileDialog.tsx

import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  styled,
} from '@mui/material';
import { UploadFile, Close } from '@mui/icons-material';

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

interface UploadFileDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: () => void;
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
}

const MAX_FILE_SIZE_MB = 3;

const UploadFileDialog: React.FC<UploadFileDialogProps> = ({ open, onClose, onUpload, selectedFile, onFileSelect }) => {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [dragOver, setDragOver] = React.useState(false);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setErrorMessage('El archivo supera los 3MB.');
        onFileSelect(null as any);
        return;
      }
      setErrorMessage('');
      onFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setErrorMessage('El archivo supera los 3MB.');
        onFileSelect(null as any);
        return;
      }
      setErrorMessage('');
      onFileSelect(file);
    }
  };

  const handleClose = () => {
    setErrorMessage('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { borderRadius: '16px' } }}>
      <DialogTitle sx={{ m: 0, p: '16px 24px', fontSize: '20px', fontWeight: '700' }} color="secondary.dark">
        Cargar archivo
      </DialogTitle>
      <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
        <Close fontSize="inherit" />
      </IconButton>
      <DialogContent>
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
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', p: '24px' }}>
        <Button size="large" variant="contained" color="primary" onClick={onUpload} disabled={!selectedFile}>
          Subir material
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadFileDialog;
