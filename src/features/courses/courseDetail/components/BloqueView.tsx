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
import { CheckCircleOutline, Close, ContentPaste, Videocam } from '@mui/icons-material';
import { BlockDetailDto } from '@/services/courses/types';

import { createCan } from '@/helpers/createCan';
import { role } from '@/configs/consts';
import UploadFileDialog from '@/components/common/UploadFileDialog';
interface BloqueViewProps {
  selectedBlock: BlockDetailDto;
}

const BloqueView: FC<BloqueViewProps> = ({ selectedBlock }) => {
  const [valueTab, setValueTab] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [openAddFileDialog, setOpenAddFileDialog] = React.useState(false);
  const [fileTarget, setFileTarget] = React.useState<'syllabus' | 'cv' | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  // lógica de los tabs

  const handleChange = (_event: React.SyntheticEvent, newValueTab: number) => {
    setValueTab(newValueTab);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   lógica para subir archivos

  const handleOpenAddFileDialog = (type: 'syllabus' | 'cv') => {
    setFileTarget(type);
    setOpenAddFileDialog(true);
  };
  const handleCloseAddFileDialog = () => {
    setSelectedFile(null);
    setFileTarget(null);
    setOpenAddFileDialog(false);
  };

  const handleAddFile = () => {
    if (!selectedFile || !fileTarget) return;
    console.log(`Subiendo archivo para ${fileTarget}`, selectedFile);
    // Agregar lógica para subir el archivo al servidor
    handleCloseAddFileDialog();
  };

  //   lógica para verificar permisos, se reemplazará por CASL

  const can = createCan(role);

  const canViewAsStudent = can('viewStudentResources', 'Resources');
  const canViewAsTeacher = can('viewTeacherResources', 'Resources');
  const canEditResources = can('editTeacherResources', 'Resources');
  const canMarkAttendance = can('markAttendance', 'Attendance');
  const canViewStudentAttendance = can('viewStudentAttendance', 'Attendance');

  //   lógica para verificar si existen los archivos

  const existsSyllabus = selectedBlock.syllabus && selectedBlock.syllabus.downloadUrl.trim() !== '';
  const existsCV = selectedBlock.cv && selectedBlock.cv.downloadUrl.trim() !== '';

  return (
    <Box sx={{ px: '24px', py: '32px', bgcolor: 'neutral.lightest', borderRadius: '8px' }}>
      <Typography variant="h6" sx={{ mb: '24px', fontSize: '20px', fontWeight: '700', color: 'neutral.dark' }}>
        {selectedBlock.name}
      </Typography>

      <Box sx={{ mb: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                {selectedBlock.aula ? selectedBlock.aula : 'No asignada'}
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
          {canViewAsStudent && (
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
          {canViewAsTeacher && (
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
              {canEditResources && (
                <>
                  <Button
                    size="small"
                    variant="text"
                    color="secondary"
                    sx={{ textDecoration: 'underline', '&:hover': { textDecoration: 'underline' } }}
                    onClick={handleOpen}
                  >
                    Editar archivos
                  </Button>
                  <Dialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    sx={{ '& .MuiDialog-paper': { borderRadius: '24px' } }}
                  >
                    <DialogTitle
                      color="secondary.dark"
                      sx={{ m: 0, p: '16px 24px', fontSize: '20px', fontWeight: '700' }}
                    >
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
                              <Typography sx={{ fontSize: '14', fontWeight: '400', color: 'neutral.dark' }}>
                                28 de feb. de 2025
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
                              <Typography sx={{ fontWeight: '700', color: 'neutral.dark' }}>CV del docente</Typography>
                              {existsCV && (
                                <Typography sx={{ fontSize: '14', fontWeight: '400', color: 'neutral.dark' }}>
                                  28 de feb. de 2025
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
                  <UploadFileDialog
                    open={openAddFileDialog}
                    onClose={handleCloseAddFileDialog}
                    onUpload={handleAddFile}
                    selectedFile={selectedFile}
                    onFileSelect={(file) => setSelectedFile(file)}
                  />
                </>
              )}
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
        <AlumnoNotasView blockId={selectedBlock.blockId} />
      </TabPanel>
    </Box>
  );
};

export default BloqueView;
