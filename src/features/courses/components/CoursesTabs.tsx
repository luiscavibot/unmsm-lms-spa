import React from 'react';
import {
  Box,
  Tab,
  Tabs,
  useMediaQuery,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { SelectChangeEvent } from '@mui/material/Select';

interface CoursesTabsProps {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export default function CoursesTabs({ value, onChange }: CoursesTabsProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    onChange(event as unknown as React.SyntheticEvent, Number(event.target.value));
  };

  return (
    <Box sx={{ mb: '24px' }}>
      {isMobile ? (
        <FormControl fullWidth variant="standard">
          <InputLabel id="courses-tab-select-label">Cursos</InputLabel>
          <Select
            labelId="courses-tab-select-label"
            value={value}
            onChange={handleSelectChange}
            label="Cursos"
          >
            <MenuItem value={0} disabled>
              Maestrías
            </MenuItem>
            <MenuItem value={1} disabled>
              Doctorados
            </MenuItem>
            <MenuItem value={2}>Diplomados</MenuItem>
            <MenuItem value={3} disabled>
              Segundas especialidades
            </MenuItem>
          </Select>
        </FormControl>
      ) : (
        <Tabs
          value={value}
          onChange={onChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Maestrías" disabled />
          <Tab label="Doctorados" disabled />
          <Tab label="Diplomados" />
          <Tab label="Segundas especialidades" disabled />
        </Tabs>
      )}
    </Box>
  );
}
