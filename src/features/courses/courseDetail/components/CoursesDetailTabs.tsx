import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';

interface CoursesTabsProps {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export default function CoursesDetailTabs({ value, onChange }: CoursesTabsProps) {
  return (
    <Box>
      <Tabs value={value} onChange={onChange} indicatorColor="primary" textColor="primary" variant="standard" aria-label="full width tabs example">
        <Tab label="Materiales" />
        <Tab label="Asistencia" />
        <Tab label="Notas" />
      </Tabs>
    </Box>
  );
}
