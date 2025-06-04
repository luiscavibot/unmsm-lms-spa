import React, { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { CheckCircleOutline, Close, ContentPaste, Videocam } from '@mui/icons-material';
import { BlockDetailDto } from '@/services/courses/types';
import BlockFilesDialog from './BlockFilesDialog';
import useBlockFiles from '../hooks/useBlockFiles';

interface BlockGeneralInfoProps {
  block: BlockDetailDto;
  canEdit: boolean;
  fileActions: ReturnType<typeof useBlockFiles>;
}

const BlockGeneralInfo: FC<BlockGeneralInfoProps> = ({ block, canEdit, fileActions }) => (
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
            {block.schedule.map((item) => (
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
            {block.aula || 'No asignada'}
          </Typography>
        </Box>
      </Box>
      {block.teacher && (
        <Box>
          <Typography component="span" variant="body2" sx={{ fontSize: '14px', fontWeight: '600', color: 'neutral.dark' }}>
            Docente:
          </Typography>{' '}
          <Typography component="span" variant="body2" sx={{ fontSize: '14px', fontWeight: '400', color: 'neutral.main' }}>
            {block.teacher}
          </Typography>
        </Box>
      )}

      {!canEdit && (
        <Box sx={{ display: 'flex', gap: '10px' }}>
          {fileActions.existsSyllabus && (
            <Button size="small" startIcon={<ContentPaste />} variant="outlined" color="secondary" href={block.syllabus.downloadUrl} target="_blank">
              Syllabus
            </Button>
          )}
          {fileActions.existsCV && (
            <Button size="small" startIcon={<ContentPaste />} variant="outlined" color="secondary" href={block.cv.downloadUrl} target="_blank">
              CV del docente
            </Button>
          )}
        </Box>
      )}

      {canEdit && (
        <Box sx={{ display: 'flex', gap: '10px' }}>
          {fileActions.existsSyllabus ? (
            <Button size="small" startIcon={<CheckCircleOutline />} variant="outlined" color="success" href={block.syllabus.downloadUrl} target="_blank">
              Syllabus
            </Button>
          ) : (
            <Button size="small" startIcon={<Close />} variant="outlined" color="error" sx={{ cursor: 'default' }}>
              Syllabus
            </Button>
          )}

          {fileActions.existsCV ? (
            <Button size="small" startIcon={<CheckCircleOutline />} variant="outlined" color="success" href={block.cv.downloadUrl} target="_blank">
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
          <BlockFilesDialog block={block} fileActions={fileActions} />
        </Box>
      )}
    </Box>

    <Button size="large" startIcon={<Videocam />} variant="contained" color="primary" href={block.meetUrl} target="_blank">
      Ir a clase
    </Button>
  </Box>
);

export default BlockGeneralInfo;
