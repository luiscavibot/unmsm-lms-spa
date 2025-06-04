// BloqueView.tsx
import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import CoursesDetailTabs from './CoursesDetailTabs';
import TabPanel from '../../components/TabPanel';
import MaterialesView from '../views/MaterialesView';
import AlumnoAsistenciaView from '../views/AlumnoAsistenciaView';
import DocenteAsistenciaView from '../views/DocenteAsistenciaView';
import AlumnoNotasView from '../views/AlumnoNotasView';
import TeacherGradesView from '../views/TeacherGradesView';
import { BlockDetailDto, BlockType } from '@/services/courses/types';
import { useAbility } from '@/hooks/useAbility';
import useBlockFiles from '../hooks/useBlockFiles';
import BlockGeneralInfo from './BlockGeneralInfo';

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

      <BlockGeneralInfo block={selectedBlock} canEdit={canViewGenResEditBtns()} fileActions={fileActions} />

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
