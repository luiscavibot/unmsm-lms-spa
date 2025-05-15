import React from 'react';
import { Box, Typography } from '@mui/material';
import CoursesDetailTabs from './CoursesDetailTabs';
import TabPanel from '../../components/TabPanel';
import MaterialesView from '../views/MaterialesView';
import AlumnoAsistenciaView from '../views/AlumnoAsistenciaView';
import AlumnoNotasView from '../views/AlumnoNotasView';

interface BloqueViewProps {
  value: string;
  nombre: string;
}

export default function BloqueView({ value, nombre }: BloqueViewProps) {
  const [valueTab, setValueTab] = React.useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValueTab: number) => {
    setValueTab(newValueTab);
  };

  return (
    <Box sx={{ px: '24px', py: '32px', bgcolor: 'neutral.lightest', borderRadius: '8px' }}>
      <Typography variant="h6" sx={{ mb: '24px', fontSize: '20px', fontWeight: '700', color: 'neutral.dark' }}>
        {nombre}
      </Typography>

      <CoursesDetailTabs value={valueTab} onChange={handleChange} />
      <TabPanel value={valueTab} index={0}>
        <MaterialesView />
      </TabPanel>
      <TabPanel value={valueTab} index={1}>
        <AlumnoAsistenciaView />
      </TabPanel>
      <TabPanel value={valueTab} index={2}>
        <AlumnoNotasView />
      </TabPanel>
    </Box>
  );
}
