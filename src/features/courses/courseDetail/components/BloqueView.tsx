// BloqueView.tsx
import React, { FC, useEffect } from 'react';
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
  // CircularProgress,
} from '@mui/material';
import { CheckCircleOutline, Close, ContentPaste, Videocam } from '@mui/icons-material';
import CoursesDetailTabs from './CoursesDetailTabs';
import TabPanel from '../../components/TabPanel';
import MaterialesView from '../views/MaterialesView';
import AlumnoAsistenciaView from '../views/AlumnoAsistenciaView';
import DocenteAsistenciaView from '../views/DocenteAsistenciaView';
import AlumnoNotasView from '../views/AlumnoNotasView';
import TeacherGradesView from '../views/TeacherGradesView';
import UploadFileDialog from '@/components/common/UploadFileDialog';
import { BlockDetailDto, BlockType } from '@/services/courses/types';

import { createCan } from '@/helpers/createCan';
import { role } from '@/configs/consts';
import { useAbility } from '@/hooks/useAbility';
import { showToast } from '@/helpers/notifier';
import { formatFullDateInPeru } from '@/helpers/formatDate';

import { useUploadUserResumeMutation, useDeleteUserResumeMutation } from '@/services/users';
import { useUploadBlockSyllabusMutation, useDeleteBlockSyllabusMutation } from '@/services/blocks/blocksSvc';

interface BloqueViewProps {
  selectedBlock: BlockDetailDto;
}

const BloqueView: FC<BloqueViewProps> = ({ selectedBlock }) => {
  // Resume mutations
  const [uploadUserResume, { isLoading: isUploadingResume, error: resumeUploadError }] = useUploadUserResumeMutation();
  const [deleteUserResume, { isLoading: isDeletingResume, error: deleteResumeError }] = useDeleteUserResumeMutation();

  // Syllabus mutations
  const [uploadBlockSyllabus, { isLoading: isUploadingSyllabus, error: uploadSyllabusError }] =
    useUploadBlockSyllabusMutation();
  const [deleteBlockSyllabus, { isLoading: isDeletingSyllabus, error: deleteSyllabusError }] =
    useDeleteBlockSyllabusMutation();

  const blockType = selectedBlock.blockType;
  const ability = useAbility();
  const canViewTheoGenResEditBtns = ability.can('view', 'theoGenResEditBtns');
  const canViewPracGenResEditBtns = ability.can('view', 'pracGenResEditBtns');
  const canViewTheoClassAttCtrl = ability.can('view', 'theoClassAttCtrl');
  const canViewPracClassAttCtrl = ability.can('view', 'pracClassAttCtrl');

  const [valueTab, setValueTab] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [openAddFileDialog, setOpenAddFileDialog] = React.useState(false);
  const [fileTarget, setFileTarget] = React.useState<'syllabus' | 'cv' | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleChange = (_event: React.SyntheticEvent, newValueTab: number) => {
    setValueTab(newValueTab);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenAddFileDialog = (type: 'syllabus' | 'cv') => {
    setFileTarget(type);
    setOpenAddFileDialog(true);
  };
  const handleCloseAddFileDialog = () => {
    setSelectedFile(null);
    setFileTarget(null);
    setOpenAddFileDialog(false);
  };

  const handleAddFile = async () => {
    if (!selectedFile || !fileTarget) return;

    try {
      if (fileTarget === 'cv') {
        await uploadUserResume({
          file: selectedFile,
          blockId: selectedBlock.blockId,
        }).unwrap();
        showToast('CV subido correctamente', 'success');
      } else if (fileTarget === 'syllabus') {
        await uploadBlockSyllabus({
          file: selectedFile,
          blockId: selectedBlock.blockId,
        }).unwrap();
        showToast('Syllabus subido correctamente', 'success');
      }
    } catch (err) {
      showToast(fileTarget === 'cv' ? 'Error subiendo CV' : 'Error subiendo Syllabus', 'error');
    } finally {
      handleCloseAddFileDialog();
    }
  };

  const handleDeleteResume = async () => {
    try {
      await deleteUserResume({ blockId: selectedBlock.blockId }).unwrap();
      showToast('CV eliminado correctamente', 'success');
    } catch {
      showToast('Error al eliminar CV', 'error');
    }
  };

  const handleDeleteSyllabus = async () => {
    try {
      await deleteBlockSyllabus({ blockId: selectedBlock.blockId }).unwrap();
      showToast('Syllabus eliminado correctamente', 'success');
    } catch {
      showToast('Error al eliminar Syllabus', 'error');
    }
  };

  const can = createCan(role);
  const canViewStudentGrades = can('viewStudentGrades', 'Grades');
  const canHandleGradeStudent = can('handleGradeStudent', 'Grades');

  const existsSyllabus = selectedBlock.syllabus && selectedBlock.syllabus.downloadUrl.trim() !== '';
  const existsCV = selectedBlock.cv && selectedBlock.cv.downloadUrl.trim() !== '';

  const canViewGenResEditBtns = (): boolean => {
    if (blockType === BlockType.THEORY) {
      return canViewTheoGenResEditBtns;
    } else if (blockType === BlockType.PRACTICE) {
      return canViewPracGenResEditBtns;
    } else {
      return false;
    }
  };

  const canViewClassAttCtrl = (): boolean => {
    if (blockType === BlockType.THEORY) {
      return canViewTheoClassAttCtrl;
    } else if (blockType === BlockType.PRACTICE) {
      return canViewPracClassAttCtrl;
    } else {
      return false;
    }
  };

  // Mostrar toast si hay error de mutaciones
  useEffect(() => {
    if (uploadSyllabusError) {
      showToast('Error al subir Syllabus', 'error');
    }
  }, [uploadSyllabusError]);

  useEffect(() => {
    if (deleteSyllabusError) {
      showToast('Error al eliminar Syllabus', 'error');
    }
  }, [deleteSyllabusError]);

  useEffect(() => {
    if (deleteResumeError) {
      showToast('Error al eliminar CV', 'error');
    }
  }, [deleteResumeError]);

  return (
    <Box sx={{ px: '24px', py: '32px', bgcolor: 'neutral.lightest', borderRadius: '8px' }}>
      <Typography variant="h6" sx={{ mb: '24px', fontSize: '20px', fontWeight: '700', color: 'neutral.dark' }}>
        {selectedBlock.name}
      </Typography>

      <Box sx={{ mb: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Datos de Horario, Aula, Docente */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              gap: { xs: '16px', md: '96px' },
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: '600', color: 'neutral.dark' }}>
                Horario:
              </Typography>
              <Box component="ul" sx={{ pl: 2, my: 0, listStyle: 'disc', color: 'neutral.main' }}>
                {selectedBlock.schedule.map((item) => (
                  <Box component="li" key={item} sx={{ fontSize: '14px' }}>
                    {item}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box>
              <Typography
                component="span"
                variant="body2"
                sx={{ fontSize: '14px', fontWeight: '600', color: 'neutral.dark' }}
              >
                Aula:
              </Typography>{' '}
              <Typography
                component="span"
                variant="body2"
                sx={{ fontSize: '14px', fontWeight: '400', color: 'neutral.main' }}
              >
                {selectedBlock.aula || 'No asignada'}
              </Typography>
            </Box>
          </Box>
          {selectedBlock.teacher && (
            <Box>
              <Typography
                component="span"
                variant="body2"
                sx={{ fontSize: '14px', fontWeight: '600', color: 'neutral.dark' }}
              >
                Docente:
              </Typography>{' '}
              <Typography
                component="span"
                variant="body2"
                sx={{ fontSize: '14px', fontWeight: '400', color: 'neutral.main' }}
              >
                {selectedBlock.teacher}
              </Typography>
            </Box>
          )}

          {!canViewGenResEditBtns() && (
            <Box sx={{ display: 'flex', gap: '10px' }}>
              {existsSyllabus && (
                <Button
                  size="small"
                  startIcon={<ContentPaste />}
                  variant="outlined"
                  color="secondary"
                  href={selectedBlock.syllabus.downloadUrl}
                  target="_blank"
                >
                  Syllabus
                </Button>
              )}
              {existsCV && (
                <Button
                  size="small"
                  startIcon={<ContentPaste />}
                  variant="outlined"
                  color="secondary"
                  href={selectedBlock.cv.downloadUrl}
                  target="_blank"
                >
                  CV del docente
                </Button>
              )}
            </Box>
          )}

          {canViewGenResEditBtns() && (
            <Box sx={{ display: 'flex', gap: '10px' }}>
              {/* Syllabus botón */}
              {existsSyllabus ? (
                <Button
                  size="small"
                  startIcon={<CheckCircleOutline />}
                  variant="outlined"
                  color="success"
                  href={selectedBlock.syllabus.downloadUrl}
                  target="_blank"
                >
                  Syllabus
                </Button>
              ) : (
                <Button size="small" startIcon={<Close />} variant="outlined" color="error" sx={{ cursor: 'default' }}>
                  Syllabus
                </Button>
              )}

              {/* CV botón */}
              {existsCV ? (
                <Button
                  size="small"
                  startIcon={<CheckCircleOutline />}
                  variant="outlined"
                  color="success"
                  href={selectedBlock.cv.downloadUrl}
                  target="_blank"
                >
                  CV del docente
                </Button>
              ) : (
                <Button size="small" startIcon={<Close />} variant="outlined" color="error" sx={{ cursor: 'default' }}>
                  CV del docente
                </Button>
              )}

              {/* “Editar archivos” abre diálogo padre */}
              <Button
                size="small"
                variant="text"
                color="secondary"
                sx={{ textDecoration: 'underline', '&:hover': { textDecoration: 'underline' } }}
                onClick={handleOpen}
              >
                Editar archivos
              </Button>

              {/* Diálogo padre “Archivos” */}
              <Dialog onClose={handleClose} open={open} sx={{ '& .MuiDialog-paper': { borderRadius: '24px' } }}>
                <DialogTitle sx={{ m: 0, p: '16px 24px', fontSize: '20px', fontWeight: '700' }} color="secondary.dark">
                  Archivos
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="medium"
                  sx={{ position: 'absolute', right: 8, top: 8 }}
                  onClick={handleClose}
                >
                  <Close fontSize="inherit" />
                </IconButton>

                <DialogContent sx={{ p: '0px 24px 24px' }}>
                  <List disablePadding>
                    {/* Syllabus item */}
                    <ListItem sx={{ py: '16px' }} disablePadding>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '24px' }}>
                        <Box sx={{ minWidth: { md: '300px' } }}>
                          <Typography sx={{ fontWeight: '700', color: 'neutral.dark' }}>Syllabus</Typography>
                          <Typography variant="body1">{selectedBlock.syllabus.fileName}</Typography>
                          <Typography sx={{ fontSize: '14', fontWeight: '400', color: 'neutral.dark' }}>
                            {formatFullDateInPeru(selectedBlock.syllabus.updateDate)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                          {existsSyllabus ? (
                            <>
                              <Button
                                size="medium"
                                variant="text"
                                color="secondary"
                                onClick={() => handleOpenAddFileDialog('syllabus')}
                                disabled={isDeletingSyllabus}
                              >
                                Editar
                              </Button>
                              <Button
                                size="medium"
                                variant="outlined"
                                color="error"
                                onClick={handleDeleteSyllabus}
                                disabled={isDeletingSyllabus}
                              >
                                {isDeletingSyllabus ? 'Eliminando…' : 'Eliminar'}
                              </Button>
                              {deleteSyllabusError && (
                                <Typography variant="caption" color="error" sx={{ mt: '4px' }}>
                                  No se pudo eliminar el Syllabus. Intenta de nuevo.
                                </Typography>
                              )}
                            </>
                          ) : (
                            <Button
                              size="medium"
                              variant="outlined"
                              color="secondary"
                              onClick={() => handleOpenAddFileDialog('syllabus')}
                              disabled={isDeletingSyllabus}
                            >
                              Agregar
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </ListItem>
                    <Divider />

                    {/* CV item */}
                    <ListItem sx={{ py: '16px' }} disablePadding>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '24px' }}>
                        <Box sx={{ minWidth: { md: '300px' } }}>
                          <Typography sx={{ fontWeight: '700', color: 'neutral.dark' }}>Currículum Vitae</Typography>
                          <Typography variant="body1">{selectedBlock.cv.fileName}</Typography>
                          {existsCV && (
                            <Typography sx={{ fontSize: '14', fontWeight: '400', color: 'neutral.dark' }}>
                              {formatFullDateInPeru(selectedBlock.cv.updateDate)}
                            </Typography>
                          )}
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                          {existsCV ? (
                            <>
                              <Button
                                size="medium"
                                variant="text"
                                color="secondary"
                                onClick={() => handleOpenAddFileDialog('cv')}
                                disabled={isDeletingResume}
                              >
                                Editar
                              </Button>
                              <Button
                                size="medium"
                                variant="outlined"
                                color="error"
                                onClick={handleDeleteResume}
                                disabled={isDeletingResume}
                              >
                                {isDeletingResume ? 'Eliminando…' : 'Eliminar'}
                              </Button>
                              {deleteResumeError && (
                                <Typography variant="caption" color="error" sx={{ mt: '4px' }}>
                                  No se pudo eliminar el CV. Intenta de nuevo.
                                </Typography>
                              )}
                            </>
                          ) : (
                            <Button
                              size="medium"
                              variant="outlined"
                              color="secondary"
                              onClick={() => handleOpenAddFileDialog('cv')}
                              disabled={isDeletingResume}
                            >
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

              {/* Diálogo hijo “Subir archivo” */}
              <UploadFileDialog
                open={openAddFileDialog}
                onClose={handleCloseAddFileDialog}
                onUpload={handleAddFile}
                selectedFile={selectedFile}
                onFileSelect={(file) => setSelectedFile(file)}
                isUploading={fileTarget === 'cv' ? isUploadingResume : isUploadingSyllabus}
                uploadError={fileTarget === 'cv' ? resumeUploadError : uploadSyllabusError}
              />
            </Box>
          )}
        </Box>

        <Button
          size="large"
          startIcon={<Videocam />}
          variant="contained"
          color="primary"
          href={selectedBlock.meetUrl}
          target="_blank"
        >
          Ir a clase
        </Button>
      </Box>

      <CoursesDetailTabs value={valueTab} onChange={handleChange} />
      <TabPanel value={valueTab} index={0}>
        <MaterialesView blockId={selectedBlock.blockId} blockType={blockType} />
      </TabPanel>
      <TabPanel value={valueTab} index={1}>
        {canViewClassAttCtrl() ? (
          <DocenteAsistenciaView blockId={selectedBlock.blockId} />
        ) : (
          <AlumnoAsistenciaView blockId={selectedBlock.blockId} />
        )}
      </TabPanel>
      <TabPanel value={valueTab} index={2}>
        {canViewStudentGrades && <AlumnoNotasView blockId={selectedBlock.blockId} />}
        {canHandleGradeStudent && <TeacherGradesView />}
      </TabPanel>
    </Box>
  );
};

export default BloqueView;
