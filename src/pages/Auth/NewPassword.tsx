import { AuthLayout } from '@/components/layouts/AuthLayout/AuthLayout';
import { NewPasswordForm } from '@/features/auth/components/NewPasswordForm';
import { Box, Typography, useTheme } from '@mui/material';

export default function NewPassword() {
  const theme = useTheme();

  return (
    <AuthLayout>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: theme.palette.primary.lightest,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: { xs: '100%', md: '659px' }, py: 5, px: 2, mx: 2, bgcolor: theme.palette.neutral.light, borderRadius: 6 }}>
          <Box sx={{ maxWidth: '419px', marginX: 'auto' }}>
            <Typography variant="h2" fontSize={{ xs: 16, md: 24 }} fontWeight={800} mb={1} sx={{ textAlign: 'center' }}>
              Cambia tu contraseña temporal
            </Typography>
            <Typography variant="body1" mb={3} sx={{ textAlign: 'center' }}>
              Has ingresado con una contraseña provisional. Por favor elige una nueva contraseña para continuar.
            </Typography>
            <NewPasswordForm />
          </Box>
        </Box>
      </Box>
    </AuthLayout>
  );
}
