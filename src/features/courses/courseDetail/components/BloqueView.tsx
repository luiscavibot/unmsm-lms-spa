import React, { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CoursesDetailTabs from './CoursesDetailTabs';
import TabPanel from '../../components/TabPanel';
import MaterialesView from '../views/MaterialesView';
import AlumnoAsistenciaView from '../views/AlumnoAsistenciaView';
import AlumnoNotasView from '../views/AlumnoNotasView';
import { ContentPaste, Videocam } from '@mui/icons-material';
import { BlockDetailDto } from '@/services/courses/types';
interface BloqueViewProps {
  selectedBlock: BlockDetailDto;
}

const BloqueView: FC<BloqueViewProps> = ({ selectedBlock }) => {
  const [valueTab, setValueTab] = React.useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValueTab: number) => {
    setValueTab(newValueTab);
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
          <Box sx={{ display: 'flex', gap: '10px' }}>
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
          </Box>
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
};

export default BloqueView;
