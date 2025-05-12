import { AuthLayout } from '@/components/layouts/AuthLayout/AuthLayout';
import { ResetPasswordForm } from '@/features/auth/components/ResetPasswordForm';
import { Box, Typography, useTheme } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

export default function ResetPassword() {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const code = searchParams.get('code') ?? '';
  return (
    <AuthLayout>
      <Box
        sx={{
          flexGrow: '1',
          bgcolor: theme.palette.primary.lightest,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '659px' },
            py: 5,
            px: 2,
            mx: 2,
            bgcolor: theme.palette.neutral.light,
            borderRadius: 6,
          }}
        >
          <Box sx={{ maxWidth: '419px', marginX: 'auto' }}>
            <Typography variant="h2" fontSize={{ xs: 16, md: 24 }} fontWeight={800} mb={1} sx={{ textAlign: 'center' }}>
              Restablece tu contraseña
            </Typography>
            <Typography variant="body1" mb={3} sx={{ textAlign: 'center' }}>
              Ingresa tu nueva contraseña a continuación.
            </Typography>
            <ResetPasswordForm initialEmail={email} initialCode={code} />
          </Box>
        </Box>
      </Box>
    </AuthLayout>
  );
}
