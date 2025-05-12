import React from 'react';
import { Alert, Box, Button, Collapse, IconButton, Typography } from '@mui/material';
import { Close, Sensors } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface AlertBannerProps {
  open: boolean;
  onClose: () => void;
}

export default function AlertBanner({ open, onClose }: AlertBannerProps) {
  const theme = useTheme();

  return (
    <Collapse in={open}>
      <Alert
        icon={false}
        action={
          <IconButton aria-label="close" color="inherit" size="medium" onClick={onClose}>
            <Close fontSize="inherit" />
          </IconButton>
        }
        sx={{
          mb: 4,
          backgroundColor: theme.palette.secondary.darkest,
          color: theme.palette.neutral.lightest,
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '64px',
          position: 'relative',
          '.MuiAlert-message': {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
          '.MuiAlert-action': {
            position: 'absolute',
            right: '24px',
            top: '16px',
          },
        }}
      >
        <Box sx={{ maxWidth: 550 }}>
          <Typography
            sx={{
              color: theme.palette.neutral.lightest,
              fontSize: 32,
              fontWeight: 700,
              lineHeight: 1,
              mb: '4px',
            }}
          >
            ¡Atención!{' '}
            <Typography
              component="span"
              sx={{
                color: 'inherit',
                fontSize: 'inherit',
                fontWeight: 'inherit',
                textDecoration: 'underline',
                textUnderlineOffset: 8,
                textDecorationThickness: 2,
              }}
            >
              Genómica Evolutiva
            </Typography>{' '}
            está por comenzar.
          </Typography>
          <Typography
            sx={{
              color: theme.palette.neutral.lightest,
              fontSize: 24,
              fontWeight: 400,
            }}
          >
            Prepárate para seguir aprendiendo.
          </Typography>
          <Typography
            sx={{
              color: theme.palette.neutral.lightest,
              fontSize: 20,
              fontWeight: 700,
              mt: '16px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Sensors fontSize="medium" sx={{ mr: '6px', color: '#F44336' }} />
            <span>Horario: 6:00pm</span>
          </Typography>
        </Box>
        <Button variant="contained" size="large">
          Ir a clase
        </Button>
      </Alert>
    </Collapse>
  );
}
