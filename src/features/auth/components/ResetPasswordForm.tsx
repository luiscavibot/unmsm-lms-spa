// src/features/auth/components/ResetPasswordForm.tsx
import { Box, Button, Stack, TextField, IconButton, InputAdornment, CircularProgress, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { confirmPasswordResetAsync } from '@/store/thunks/forgotPasswordAsync';
import { clearPasswordState } from '@/store/slices/password/passwordSlice';

interface ResetPasswordFormProps {
  initialEmail: string;
  initialCode: string;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ initialEmail, initialCode }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Código o email también pueden venir por query string
  const emailFromQuery = searchParams.get('email') ?? '';
  const codeFromQuery = searchParams.get('code') ?? initialCode;

  const { resetStatus, resetError } = useAppSelector((s) => s.password);
  const loading = resetStatus === 'loading';

  const [email] = useState(emailFromQuery);
  const [code, setCode] = useState(codeFromQuery);
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Si la query cambia, actualizamos el input
  useEffect(() => {
    setCode(codeFromQuery);
  }, [codeFromQuery]);

  const passwordsMatch = newPass === confirm;
  const formIsValid = email.trim() !== '' && code.trim() !== '' && newPass.trim() !== '' && confirm.trim() !== '' && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formIsValid) return;

    try {
      await dispatch(confirmPasswordResetAsync({ email, code, newPassword: newPass })).unwrap();
      navigate('/reset-password/confirmation', { replace: true });
    } catch {
      // el error se mostrará en resetError
    }
  };

  // Limpia el estado del slice si el usuario abandona esta vista
  useEffect(() => {
    return () => {
      dispatch(clearPasswordState());
    };
  }, [dispatch]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      autoComplete="off" // desactiva autofill global
      noValidate
    >
      <Stack spacing={3}>
        {resetError && <Alert severity="error">{resetError}</Alert>}

        {/* Correo (solo lectura) */}
        <TextField label="Correo electrónico" name="email" autoComplete="email" fullWidth value={email} disabled />

        {/* Código de verificación */}
        <TextField
          label="Código de verificación"
          name="one-time-code"
          autoComplete="one-time-code"
          placeholder="Ej. 962751"
          fullWidth
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={loading}
          required
        />

        {/* Nueva contraseña */}
        <TextField
          label="Nueva contraseña"
          name="new-password"
          autoComplete="new-password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          disabled={loading}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  onClick={() => setShowPassword((v) => !v)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Confirmar contraseña */}
        <TextField
          label="Confirmar contraseña"
          name="confirm-password"
          autoComplete="new-password"
          type={showConfirm ? 'text' : 'password'}
          fullWidth
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          disabled={loading}
          required
          error={confirm !== '' && !passwordsMatch}
          helperText={confirm !== '' && !passwordsMatch ? 'Las contraseñas no coinciden' : undefined}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showConfirm ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  onClick={() => setShowConfirm((v) => !v)}
                  edge="end"
                >
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Botón con spinner interno */}
        <Button
          size="large"
          type="submit"
          variant="contained"
          fullWidth
          disabled={!formIsValid || loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? 'Restableciendo…' : 'Restablecer contraseña'}
        </Button>
      </Stack>
    </Box>
  );
};
