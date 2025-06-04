// BloqueView.tsx
import React, { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { CheckCircleOutline, Close, ContentPaste, Videocam } from '@mui/icons-material';
import CoursesDetailTabs from './CoursesDetailTabs';
import TabPanel from '../../components/TabPanel';
import MaterialesView from '../views/MaterialesView';
import AlumnoAsistenciaView from '../views/AlumnoAsistenciaView';
import DocenteAsistenciaView from '../views/DocenteAsistenciaView';
import AlumnoNotasView from '../views/AlumnoNotasView';
import TeacherGradesView from '../views/TeacherGradesView';
import { BlockDetailDto, BlockType } from '@/services/courses/types';
import { useAbility } from '@/hooks/useAbility';
import BlockFilesDialog from './BlockFilesDialog';
import useBlockFiles from '../hooks/useBlockFiles';

interface BloqueViewProps {
  selectedBlock: BlockDetailDto;
}

const BloqueView: FC<BloqueViewProps> = ({ selectedBlock }) => {
  const blockType = selectedBlock.blockType;
  const ability = useAbility();
  const canViewTheoGenResEditBtns = ability.can('view', 'theoGenResEditBtns');
  const canViewPracGenResEditBtns = ability.can('view', 'pracGenResEditBtns');
  const canViewTheoClassAttCtrl = ability.can('view', 'theoClassAttCtrl');
  const canViewPracClassAttCtrl = ability.can('view', 'pracClassAttCtrl');
  const canViewTheoNotesCtrl = ability.can('view', 'theoCourseNotesCtrl');
  const canViewPracNotesCtrl = ability.can('view', 'pracCourseNotesCtrl');

  const [valueTab, setValueTab] = React.useState(0);
  const fileActions = useBlockFiles(selectedBlock);

  const handleChange = (_event: React.SyntheticEvent, newValueTab: number) => {
    setValueTab(newValueTab);
  };

  const canViewGenResEditBtns = (): boolean => {
    if (blockType === BlockType.THEORY) return canViewTheoGenResEditBtns;
    if (blockType === BlockType.PRACTICE) return canViewPracGenResEditBtns;
    return false;
  };

  const canViewClassAttCtrl = (): boolean => {
    if (blockType === BlockType.THEORY) return canViewTheoClassAttCtrl;
    if (blockType === BlockType.PRACTICE) return canViewPracClassAttCtrl;
    return false;
  };

  const canViewNotesCtrl = (): boolean => {
    if (blockType === BlockType.THEORY) return canViewTheoNotesCtrl;
    if (blockType === BlockType.PRACTICE) return canViewPracNotesCtrl;
    return false;
  };

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
              <Typography component="span" variant="body2" sx={{ fontSize: '14px', fontWeight: '600', color: 'neutral.dark' }}>
                Aula:
              </Typography>{' '}
              <Typography component="span" variant="body2" sx={{ fontSize: '14px', fontWeight: '400', color: 'neutral.main' }}>
                {selectedBlock.aula || 'No asignada'}
              </Typography>
            </Box>
          </Box>
          {selectedBlock.teacher && (
            <Box>
              <Typography component="span" variant="body2" sx={{ fontSize: '14px', fontWeight: '600', color: 'neutral.dark' }}>
                Docente:
              </Typography>{' '}
              <Typography component="span" variant="body2" sx={{ fontSize: '14px', fontWeight: '400', color: 'neutral.main' }}>
                {selectedBlock.teacher}
              </Typography>
            </Box>
          )}

          {!canViewGenResEditBtns() && (
            <Box sx={{ display: 'flex', gap: '10px' }}>
              {fileActions.existsSyllabus && (
                <Button size="small" startIcon={<ContentPaste />} variant="outlined" color="secondary" href={selectedBlock.syllabus.downloadUrl} target="_blank">
                  Syllabus
                </Button>
              )}
              {fileActions.existsCV && (
                <Button size="small" startIcon={<ContentPaste />} variant="outlined" color="secondary" href={selectedBlock.cv.downloadUrl} target="_blank">
                  CV del docente
                </Button>
              )}
            </Box>
          )}

          {canViewGenResEditBtns() && (
            <Box sx={{ display: 'flex', gap: '10px' }}>
              {fileActions.existsSyllabus ? (
                <Button size="small" startIcon={<CheckCircleOutline />} variant="outlined" color="success" href={selectedBlock.syllabus.downloadUrl} target="_blank">
                  Syllabus
                </Button>
              ) : (
                <Button size="small" startIcon={<Close />} variant="outlined" color="error" sx={{ cursor: 'default' }}>
                  Syllabus
                </Button>
              )}

              {fileActions.existsCV ? (
                <Button size="small" startIcon={<CheckCircleOutline />} variant="outlined" color="success" href={selectedBlock.cv.downloadUrl} target="_blank">
                  CV del docente
                </Button>
              ) : (
                <Button size="small" startIcon={<Close />} variant="outlined" color="error" sx={{ cursor: 'default' }}>
                  CV del docente
                </Button>
              )}

              <Button
                size="small"
                variant="text"
                color="secondary"
                sx={{ textDecoration: 'underline', '&:hover': { textDecoration: 'underline' } }}
                onClick={fileActions.handleOpenDialog}
              >
                Editar archivos
              </Button>
              <BlockFilesDialog block={selectedBlock} fileActions={fileActions} />
            </Box>
          )}
        </Box>

        <Button size="large" startIcon={<Videocam />} variant="contained" color="primary" href={selectedBlock.meetUrl} target="_blank">
          Ir a clase
        </Button>
      </Box>

      <CoursesDetailTabs value={valueTab} onChange={handleChange} />
      <TabPanel value={valueTab} index={0}>
        <MaterialesView blockId={selectedBlock.blockId} blockType={blockType} />
      </TabPanel>
      <TabPanel value={valueTab} index={1}>
        {canViewClassAttCtrl() ? <DocenteAsistenciaView blockId={selectedBlock.blockId} /> : <AlumnoAsistenciaView blockId={selectedBlock.blockId} />}
      </TabPanel>
      <TabPanel value={valueTab} index={2}>
        {!canViewNotesCtrl() ? <AlumnoNotasView blockId={selectedBlock.blockId} /> : <TeacherGradesView blockId={selectedBlock.blockId} />}
      </TabPanel>
    </Box>
  );
};

export default BloqueView;
