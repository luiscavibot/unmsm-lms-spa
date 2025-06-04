import { Alert, Box, Button, Collapse, IconButton, Typography } from '@mui/material';
import { Close, Sensors } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface AlertBannerProps {
  open: boolean;
  onClose: () => void;
}

export default function AlertBanner2({ open, onClose }: AlertBannerProps) {
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
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          padding: { xs: '32px', md: '64px' },
          position: 'relative',
          height: { xs: 'auto', md: '308px' },
          overflow: 'hidden',
          gap: { xs: 2, md: 0 },
          '.MuiAlert-message': {
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            textAlign: { xs: 'center', md: 'left' },
          },
          '.MuiAlert-action': {
            position: 'absolute',
            right: '24px',
            top: '16px',
          },
        }}
      >
        <Box sx={{ position: 'absolute', top: '0', right: '0', zIndex: 0 }}>
          <Box
            component="img"
            src="/images/fondo-2-alerta.png"
            alt="bg-2"
            sx={{
              display: { xs: 'none', md: 'block' },
              //   maxWidth: { xs: '350px', lg: '500px', xl: '643px' },
              //   width: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
          <Box sx={{ position: 'absolute', bottom: '0', right: '0', zIndex: 0 }}>
            <Box
              component="img"
              src="/images/fondo-1-alerta.png"
              alt="bg-1"
              sx={{
                display: { xs: 'none', md: 'block' },
                // maxWidth: { xs: '350px', lg: '500px', xl: '643px' },
                // width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>
          <Box sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '159px', zIndex: 0 }}>
            <Box
              component="img"
              src="/images/encuesta.png"
              alt="bg-encuesta"
              sx={{
                display: { xs: 'none', md: 'block' },
                // maxWidth: { xs: '350px', lg: '500px', xl: '643px' },
                // width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>
        </Box>
        <Box sx={{ maxWidth: { xs: '100%', md: 550 } }}>
          <Typography
            sx={{
              color: theme.palette.neutral.lightest,
              fontSize: { xs: 20, md: 32 },
              fontWeight: 700,
              lineHeight: 1,
              mb: { xs: '4px', md: '8px' },
              display: 'block',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            ¡Tu opinión es importante!
          </Typography>
          <Typography
            sx={{
              color: theme.palette.neutral.lightest,
              fontSize: { xs: 16, md: 24 },
              fontWeight: 400,
              lineHeight: 1.2,
              mb: '4px',
              display: 'block',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            Participa en las Encuestas de Evaluación del Desempeño Docente (2025-I)
          </Typography>
          <Typography
            sx={{
              color: theme.palette.neutral.lightest,
              fontSize: { xs: 11, md: 12 },
              lineHeight: 1,
              fontWeight: 400,
              mt: '16px',
              display: 'block',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            *La encuesta es anónima. Tus respuestas se mantendrán confidenciales.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 2,
              justifyContent: { xs: 'center', md: 'flex-start' },
            }}
          >
            <Button
              href="https://docs.google.com/forms/d/e/1FAIpQLSep27iloSXAIhT5ZZTpezNECz1N9B2ixfN3QikUwOVEU6GYlw/viewform"
              target="_blank"
              variant="contained"
              size="large"
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Acceder al Formulario
            </Button>
          </Box>
        </Box>
      </Alert>
    </Collapse>
  );
}
