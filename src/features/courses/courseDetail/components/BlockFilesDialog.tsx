import React, { FC } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import UploadFileDialog from '@/components/common/UploadFileDialog';
import { BlockDetailDto } from '@/services/courses/types';
import { formatFullDateInPeru } from '@/helpers/formatDate';
import useBlockFiles, { FileTarget } from '../hooks/useBlockFiles';

interface BlockFilesDialogProps {
  block: BlockDetailDto;
  fileActions: ReturnType<typeof useBlockFiles>;
}

const BlockFilesDialog: FC<BlockFilesDialogProps> = ({ block, fileActions }) => {
  const {
    openDialog,
    handleCloseDialog,
    openUploadDialog,
    handleOpenUploadDialog,
    handleCloseUploadDialog,
    handleAddFile,
    handleDeleteResume,
    handleDeleteSyllabus,
    existsSyllabus,
    existsCV,
    selectedFile,
    setSelectedFile,
    fileTarget,
    isDeletingResume,
    isDeletingSyllabus,
    isUploadingResume,
    isUploadingSyllabus,
    resumeUploadError,
    uploadSyllabusError,
    deleteResumeError,
    deleteSyllabusError,
  } = fileActions;

  return (
    <>
      <Dialog onClose={handleCloseDialog} open={openDialog} sx={{ '& .MuiDialog-paper': { borderRadius: '24px' } }}>
        <DialogTitle sx={{ m: 0, p: '16px 24px', fontSize: '20px', fontWeight: '700' }} color="secondary.dark">
          Archivos
        </DialogTitle>
        <IconButton aria-label="close" color="inherit" size="medium" sx={{ position: 'absolute', right: 8, top: 8 }} onClick={handleCloseDialog}>
          <Close fontSize="inherit" />
        </IconButton>
        <DialogContent sx={{ p: '0px 24px 24px' }}>
          <List disablePadding>
            <ListItem sx={{ py: '16px' }} disablePadding>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '24px' }}>
                <Box sx={{ minWidth: { md: '300px' } }}>
                  <Typography sx={{ fontWeight: '700', color: 'neutral.dark' }}>Syllabus</Typography>
                  <Typography variant="body1">{block.syllabus.fileName}</Typography>
                  <Typography sx={{ fontSize: '14', fontWeight: '400', color: 'neutral.dark' }}>
                    {formatFullDateInPeru(block.syllabus.updateDate)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                  {existsSyllabus ? (
                    <>
                      <Button size="medium" variant="text" color="secondary" onClick={() => handleOpenUploadDialog('syllabus')} disabled={isDeletingSyllabus}>
                        Editar
                      </Button>
                      <Button size="medium" variant="outlined" color="error" onClick={handleDeleteSyllabus} disabled={isDeletingSyllabus}>
                        {isDeletingSyllabus ? 'Eliminando…' : 'Eliminar'}
                      </Button>
                      {deleteSyllabusError && (
                        <Typography variant="caption" color="error" sx={{ mt: '4px' }}>
                          No se pudo eliminar el Syllabus. Intenta de nuevo.
                        </Typography>
                      )}
                    </>
                  ) : (
                    <Button size="medium" variant="outlined" color="secondary" onClick={() => handleOpenUploadDialog('syllabus')} disabled={isDeletingSyllabus}>
                      Agregar
                    </Button>
                  )}
                </Box>
              </Box>
            </ListItem>
            <Divider />
            <ListItem sx={{ py: '16px' }} disablePadding>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '24px' }}>
                <Box sx={{ minWidth: { md: '300px' } }}>
                  <Typography sx={{ fontWeight: '700', color: 'neutral.dark' }}>Currículum Vitae</Typography>
                  <Typography variant="body1">{block.cv.fileName}</Typography>
                  {existsCV && (
                    <Typography sx={{ fontSize: '14', fontWeight: '400', color: 'neutral.dark' }}>
                      {formatFullDateInPeru(block.cv.updateDate)}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                  {existsCV ? (
                    <>
                      <Button size="medium" variant="text" color="secondary" onClick={() => handleOpenUploadDialog('cv')} disabled={isDeletingResume}>
                        Editar
                      </Button>
                      <Button size="medium" variant="outlined" color="error" onClick={handleDeleteResume} disabled={isDeletingResume}>
                        {isDeletingResume ? 'Eliminando…' : 'Eliminar'}
                      </Button>
                      {deleteResumeError && (
                        <Typography variant="caption" color="error" sx={{ mt: '4px' }}>
                          No se pudo eliminar el CV. Intenta de nuevo.
                        </Typography>
                      )}
                    </>
                  ) : (
                    <Button size="medium" variant="outlined" color="secondary" onClick={() => handleOpenUploadDialog('cv')} disabled={isDeletingResume}>
                      Agregar
                    </Button>
                  )}
                </Box>
              </Box>
            </ListItem>
            <Divider />
          </List>
        </DialogContent>
      </Dialog>
      <UploadFileDialog
        open={openUploadDialog}
        onClose={handleCloseUploadDialog}
        onUpload={handleAddFile}
        selectedFile={selectedFile}
        onFileSelect={(file) => setSelectedFile(file)}
        isUploading={fileTarget === 'cv' ? isUploadingResume : isUploadingSyllabus}
        uploadError={fileTarget === 'cv' ? resumeUploadError : uploadSyllabusError}
      />
    </>
  );
};

export default BlockFilesDialog;
