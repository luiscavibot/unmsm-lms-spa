import { Alert, Box, Button, Collapse, IconButton, Typography } from '@mui/material';
import { Close, Sensors } from '@mui/icons-material';

import { createCan } from '@/helpers/createCan';
import { role } from '@/configs/consts';

interface AlertBannerProps {
  open: boolean;
  onClose: () => void;
}

export default function AlertBanner({ open, onClose }: AlertBannerProps) {
  const can = createCan(role);

  const canStartClass = can('start', 'Class');
  const canJoinClass = can('join', 'Class');

  const description = canStartClass
    ? 'Prepárate para una nueva sesión de aprendizaje.'
    : 'Prepárate para seguir aprendiendo.';

  const buttonLabel = canStartClass ? 'Iniciar clase' : 'Ir a clase';

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
          backgroundColor: 'secondary.darkest',
          color: 'neutral.lightest',
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
              color: 'neutral.lightest',
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
              color: 'neutral.lightest',
              fontSize: 24,
              fontWeight: 400,
            }}
          >
            {description}
          </Typography>
          <Typography
            sx={{
              color: 'neutral.lightest',
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
        {(canStartClass || canJoinClass) && (
          <Button variant="contained" size="large">
            {buttonLabel}
          </Button>
        )}
      </Alert>
    </Collapse>
  );
}
