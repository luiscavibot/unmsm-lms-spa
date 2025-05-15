import React from 'react';
import { Avatar, Box, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

interface CardCourseProps {
  status?: 'sin-iniciar' | 'activo';
  slug?: string;
}

export default function CardCourse({ status = 'activo', slug }: CardCourseProps) {
  const theme = useTheme();
  return (
    <Box
      component={Link}
      sx={{ width: '100%', maxWidth: '344px', textDecoration: 'none' }}
      to={`/courses/posgrado/${slug}`}
    >
      <Card
        variant="outlined"
        sx={{
          bgcolor: status === 'sin-iniciar' ? theme.palette.neutral.light : 'background.paper',
        }}
      >
        <CardContent>
          {status === 'sin-iniciar' && (
            <Chip
              label="Sin iniciar"
              size="small"
              sx={{
                fontSize: '12px',
                fontWeight: 400,
                color: theme.palette.secondary.dark,
                borderColor: theme.palette.secondary.dark,
                mb: 1,
              }}
              variant="outlined"
            />
          )}
          <Typography
            gutterBottom
            sx={{
              color: theme.palette.secondary.dark,
              fontSize: '16px',
              fontWeight: '700',
              mb: '12px',
              lineHeight: '1.2',
            }}
          >
            Bioinformática Aplicada a la Vigilancia Genómica
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: 'center' }}>
            <Avatar sx={{ width: 32, height: 32 }}>NR</Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontSize: 14, fontWeight: 400 }} variant="body2">
                Docente responsable
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }} variant="body2">
                Eduardo Romero
              </Typography>
            </Box>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Stack direction="column" sx={{ gap: status === 'sin-iniciar' ? '12px 0px' : '44px 0px' }}>
            <Stack direction="column" spacing={'4px'}>
              <Typography variant="body2">Inicio: 01/03/2025</Typography>
              <Typography variant="body2">Fin: 24/09/2025</Typography>
            </Stack>
            <Typography sx={{ textAlign: 'right' }} variant="body2">
              2025-I | Módulo I
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
