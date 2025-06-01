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
import CoursesDetailTabs from './CoursesDetailTabs';
import TabPanel from '../../components/TabPanel';
import MaterialesView from '../views/MaterialesView';
import AlumnoAsistenciaView from '../views/AlumnoAsistenciaView';
import DocenteAsistenciaView from '../views/DocenteAsistenciaView';
import AlumnoNotasView from '../views/AlumnoNotasView';
import TeacherGradesView from '../views/TeacherGradesView';
import UploadFileDialog from '@/components/common/UploadFileDialog';
import { CheckCircleOutline, Close, ContentPaste, Videocam } from '@mui/icons-material';
import { BlockDetailDto, BlockType } from '@/services/courses/types';

import { createCan } from '@/helpers/createCan';
import { role } from '@/configs/consts';
import { useAbility } from '@/hooks/useAbility';
import { showToast } from '@/helpers/notifier';
import { formatFullDateInPeru } from '@/helpers/formatDate';

import { useUploadUserResumeMutation, useDeleteUserResumeMutation } from '@/services/users';

interface BloqueViewProps {
  selectedBlock: BlockDetailDto;
}

const BloqueView: FC<BloqueViewProps> = ({ selectedBlock }) => {
  const [uploadUserResume, { isLoading: isUploadingResume, error: resumeUploadError }] = useUploadUserResumeMutation();
  const [deleteUserResume, { isLoading: isDeletingResume, error: deleteResumeError }] = useDeleteUserResumeMutation();

  const blockType = selectedBlock.blockType;
  const ability = useAbility();
  const canViewTheoGenResEditBtns = ability.can('view', 'theoGenResEditBtns');
  const canViewPracGenResEditBtns = ability.can('view', 'pracGenResEditBtns');

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
    if (!selectedFile || !fileTarget) {
      return;
    }

    try {
      if (fileTarget === 'cv') {
        await uploadUserResume({
          file: selectedFile,
          blockId: selectedBlock.blockId,
        }).unwrap();
        showToast('CV subido correctamente', 'success');
      }
    } catch (err) {
      showToast('Error subiendo archivo', 'error');
    } finally {
      handleCloseAddFileDialog();
    }
  };
  const handleDeleteResume = async () => {
    try {
      await deleteUserResume({ blockId: selectedBlock.blockId }).unwrap();
      showToast('CV eliminado correctamente', 'success');
    } catch (err) {
      console.error('Error borrando CV:', err);
      showToast('Error al eliminar CV', 'error');
    }
  };

  const can = createCan(role);
  const canMarkAttendance = can('markAttendance', 'Attendance');
  const canViewStudentAttendance = can('viewStudentAttendance', 'Attendance');
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

  return (
    <Box sx={{ px: '24px', py: '32px', bgcolor: 'neutral.lightest', borderRadius: '8px' }}>
      <Typography variant="h6" sx={{ mb: '24px', fontSize: '20px', fontWeight: '700', color: 'neutral.dark' }}>
        {selectedBlock.name}
      </Typography>

      <Box sx={{ mb: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* … (datos de Horario, Aula, Docente, etc.) … */}

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

              {/* ⇨ Ahora “Editar archivos” abre el diálogo padre (no el hijo) */}
              <Button
                size="small"
                variant="text"
                color="secondary"
                sx={{ textDecoration: 'underline', '&:hover': { textDecoration: 'underline' } }}
                onClick={handleOpen} // <-- aquí abrimos el diálogo padre “Archivos”
              >
                Editar archivos
              </Button>

              {/* —————— DIÁLOGO PADRE “Archivos” —————— */}
              <Dialog onClose={handleClose} open={open} sx={{ '& .MuiDialog-paper': { borderRadius: '24px' } }}>
                <DialogTitle sx={{ m: 0, p: '16px 24px', fontSize: '20px', fontWeight: '700' }} color="secondary.dark">
                  Archivos
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="medium"
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                  }}
                  onClick={handleClose}
                >
                  <Close fontSize="inherit" />
                </IconButton>

                <DialogContent sx={{ p: '0px 24px 24px' }}>
                  <List disablePadding>
                    <ListItem sx={{ py: '16px' }} disablePadding>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '24px' }}>
                        <Box sx={{ minWidth: { md: '300px' } }}>
                          <Typography sx={{ fontWeight: '700', color: 'neutral.dark' }}>Syllabus</Typography>
                          <Typography variant="body1">{selectedBlock.syllabus.fileName}</Typography>
                          <Typography sx={{ fontSize: '14', fontWeight: '400', color: 'neutral.dark' }}>
                            {formatFullDateInPeru(selectedBlock.syllabus.updateDate)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                          {existsSyllabus ? (
                            <>
                              <Button
                                size="medium"
                                variant="text"
                                color="secondary"
                                onClick={() => handleOpenAddFileDialog('syllabus')}
                              >
                                Editar
                              </Button>
                              <Button size="medium" variant="outlined" color="secondary">
                                Eliminar
                              </Button>
                            </>
                          ) : (
                            <Button
                              size="medium"
                              variant="outlined"
                              color="secondary"
                              onClick={() => handleOpenAddFileDialog('syllabus')}
                            >
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
                          <Typography variant="body1">{selectedBlock.cv.fileName}</Typography>
                          {existsCV && (
                            <Typography sx={{ fontSize: '14', fontWeight: '400', color: 'neutral.dark' }}>
                              {formatFullDateInPeru(selectedBlock.cv.updateDate)}
                            </Typography>
                          )}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
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

              {/* —————— DIÁLOGO HIJO “Subir archivo” —————— */}
              <UploadFileDialog
                open={openAddFileDialog}
                onClose={handleCloseAddFileDialog}
                onUpload={handleAddFile}
                selectedFile={selectedFile}
                onFileSelect={(file) => setSelectedFile(file)}
                isUploading={isUploadingResume}
                uploadError={resumeUploadError}
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
        <MaterialesView blockId={selectedBlock.blockId} />
      </TabPanel>
      <TabPanel value={valueTab} index={1}>
        {canMarkAttendance && <DocenteAsistenciaView blockId={selectedBlock.blockId} />}
        {canViewStudentAttendance && <AlumnoAsistenciaView blockId={selectedBlock.blockId} />}
      </TabPanel>
      <TabPanel value={valueTab} index={2}>
        {canViewStudentGrades && <AlumnoNotasView blockId={selectedBlock.blockId} />}
        {canHandleGradeStudent && <TeacherGradesView />}
      </TabPanel>
    </Box>
  );
};

export default BloqueView;
