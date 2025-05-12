// src/pages/Auth/ForgotPasswordConfirmation.tsx
import React, { useState } from 'react';
import { AuthLayout } from '@/components/layouts/AuthLayout/AuthLayout';
import { Box, Typography, TextField, Button, Stack, Alert, useTheme } from '@mui/material';
import { useNavigate, useSearchParams, Link as RouterLink } from 'react-router-dom';

export default function ForgotPasswordConfirmation() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Por favor ingresa el código que recibiste por correo');
      return;
    }
    // Pasamos email y código a la siguiente pantalla
    navigate(`/reset-password?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`, { replace: true });
  };

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
          <Box sx={{ maxWidth: '447px', mx: 'auto' }}>
            <Typography variant="h2" fontSize={{ xs: 16, md: 24 }} fontWeight={800} mb={1} sx={{ textAlign: 'center' }}>
              Introduce el código de verificación
            </Typography>
            <Typography variant="body1" mb={3} sx={{ textAlign: 'center' }}>
              Hemos enviado un código al correo <strong>{email}</strong>. Ingresa ese código a continuación.
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                {error && <Alert severity="error">{error}</Alert>}

                <TextField
                  label="Código de verificación"
                  placeholder="Ej. 962751"
                  fullWidth
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />

                <Button type="submit" variant="contained" size="large" fullWidth>
                  Continuar
                </Button>

                <Button
                  component={RouterLink}
                  to={`/forgot-password?email=${encodeURIComponent(email)}`}
                  variant="text"
                  size="large"
                  fullWidth
                  sx={{ textTransform: 'initial' }}
                >
                  Reenviar código
                </Button>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </AuthLayout>
  );
}
