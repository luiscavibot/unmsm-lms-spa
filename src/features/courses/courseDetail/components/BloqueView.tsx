import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import CoursesDetailTabs from './CoursesDetailTabs';
import TabPanel from '../../components/TabPanel';
import MaterialesView from '../views/MaterialesView';
import AlumnoAsistenciaView from '../views/AlumnoAsistenciaView';
import AlumnoNotasView from '../views/AlumnoNotasView';
import { ContentPaste, Videocam } from '@mui/icons-material';

interface BloqueViewProps {
  value: string;
  nombre: string;
}

export default function BloqueView({ value, nombre }: BloqueViewProps) {
  const [valueTab, setValueTab] = React.useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValueTab: number) => {
    setValueTab(newValueTab);
  };
  const handleClickSyllabus = () => {
    console.log('Ir a syllabus');
  };
  const handleClickCV = () => {
    console.log('Ir a CV');
  };
  const handleClickClass = () => {
    console.log('Ir a clase');
  };

  return (
    <Box sx={{ px: '24px', py: '32px', bgcolor: 'neutral.lightest', borderRadius: '8px' }}>
      <Typography variant="h6" sx={{ mb: '24px', fontSize: '20px', fontWeight: '700', color: 'neutral.dark' }}>
        {nombre}
      </Typography>

      <Box sx={{ mb: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: { xs: '16px', md: '96px' }, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: '600', color: 'neutral.dark' }}>
                Horario:
              </Typography>
              <Box component="ul" sx={{ pl: 2, my: 0, listStyle: 'disc', color: 'neutral.main' }}>
                <Box component="li" sx={{ fontSize: '14px' }}>
                  Lunes: 9:00 - 11:00
                </Box>
                <Box component="li" sx={{ fontSize: '14px' }}>
                  Jueves: 21:00 - 22:30
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography component="span" variant="body2" sx={{ fontSize: '14px', fontWeight: '600', color: 'neutral.dark' }}>
                Aula:
              </Typography>{' '}
              <Typography component="span" variant="body2" sx={{ fontSize: '14px', fontWeight: '400', color: 'neutral.main' }}>
                234
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Button size="small" startIcon={<ContentPaste />} variant="outlined" color="secondary" onClick={handleClickSyllabus}>
              Syllabus
            </Button>
            <Button size="small" startIcon={<ContentPaste />} variant="outlined" color="secondary" onClick={handleClickCV}>
              CV del docente
            </Button>
          </Box>
        </Box>
        <Button size="large" startIcon={<Videocam />} variant="contained" color="primary" onClick={handleClickClass}>
          Ir a clase
        </Button>
      </Box>

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
