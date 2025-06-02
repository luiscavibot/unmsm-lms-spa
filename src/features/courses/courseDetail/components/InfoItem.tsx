import { Box, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

const InfoItem: FC<{ label?: string; value?: ReactNode }> = ({ label = '', value = '' }) => (
  <Box>
    <Typography component="span" sx={{ fontWeight: 700, color: 'neutral.dark' }}>
      {label}
    </Typography>
    <Typography component="span" sx={{ fontWeight: 400, color: 'neutral.main' }}>
      {value}
    </Typography>
  </Box>
);

export default InfoItem;
