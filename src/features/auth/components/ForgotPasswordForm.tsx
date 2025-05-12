// src/features/auth/components/ForgotPasswordForm.tsx
import { Box, Button, Stack, TextField, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { validateEmail } from '@/utils/validators';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordAsync } from '@/store/thunks/password';
import { clearPasswordState } from '@/store/slices/passwordSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export const ForgotPasswordForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { forgotStatus, forgotError } = useAppSelector((s) => s.password);
  const loading = forgotStatus === 'loading';

  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setLocalError('Ingresa un correo electrónico válido');
      return;
    }
    setLocalError('');
    await dispatch(forgotPasswordAsync(email))
      .unwrap()
      .catch(() => {
        // error queda en forgotError
      });

    // Si no hay error, avanzamos
    if (!forgotError) {
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearPasswordState());
    };
  }, [dispatch]);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {(localError || forgotError) && <Alert severity="error">{localError || forgotError}</Alert>}

        <TextField
          label="Correo electrónico"
          name="email"
          autoComplete="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <Button
          size="large"
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? 'Enviando…' : 'Enviar código'}
        </Button>

        <Button
          component={Link}
          to="/login"
          size="large"
          variant="text"
          fullWidth
          disabled={loading}
          sx={{ textTransform: 'initial' }}
        >
          Volver a inicio de sesión
        </Button>
      </Stack>
    </Box>
  );
};
