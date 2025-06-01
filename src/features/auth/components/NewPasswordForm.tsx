// src/features/auth/components/NewPasswordForm.tsx

import { Box, Button, Stack, TextField, IconButton, InputAdornment, CircularProgress, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logoutAsync } from '@/store/thunks/logoutAsync';
import { completeNewPasswordAsync } from '@/store/thunks/completeNewPasswordAsync';

export const NewPasswordForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { tempUsername, tempSession, status, error } = useAppSelector((s) => s.auth);

  const loading = status === 'loading';
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const match = newPass === confirm;
  const formIsValid = newPass !== '' && confirm !== '' && match;

  useEffect(() => {
    if (!tempSession || !tempUsername) {
      dispatch(logoutAsync());
      navigate('/login', { replace: true });
    }
  }, [dispatch, navigate, tempSession, tempUsername]);

  const sessionExpired =
    error?.toLowerCase().includes('invalid session') || error?.toLowerCase().includes('session is expired');

  const handleRestart = () => {
    dispatch(logoutAsync());
    navigate('/login', { replace: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formIsValid || sessionExpired || !tempUsername || !tempSession) return;
    try {
      await dispatch(
        completeNewPasswordAsync({
          username: tempUsername,
          session: tempSession,
          newPassword: newPass,
        }),
      ).unwrap();
      navigate('/courses', { replace: true });
    } catch {}
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
      <Stack spacing={2}>
        {tempUsername && (
          <TextField
            id="username"
            name="username"
            label="Username"
            autoComplete="username"
            value={tempUsername}
            sx={{
              display: 'none',
            }}
            InputProps={{
              readOnly: true,
            }}
          />
        )}

        {error && !sessionExpired && <Alert severity="error">{error}</Alert>}
        {sessionExpired && (
          <Alert severity="warning">
            Tu sesión para cambiar la contraseña ha expirado. Vuelve a iniciar sesión para solicitar un nuevo código.
          </Alert>
        )}

        {sessionExpired ? (
          <Button variant="contained" size="large" fullWidth onClick={handleRestart}>
            Volver a iniciar sesión
          </Button>
        ) : (
          <>
            <TextField
              autoComplete="new-password"
              label="Nueva contraseña"
              type={show1 ? 'text' : 'password'}
              fullWidth
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              disabled={loading}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={show1 ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      onClick={() => setShow1((v) => !v)}
                      edge="end"
                    >
                      {show1 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              autoComplete="new-password"
              label="Confirmar contraseña"
              type={show2 ? 'text' : 'password'}
              fullWidth
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              disabled={loading}
              required
              error={!!confirm && !match}
              helperText={!!confirm && !match ? 'Las contraseñas no coinciden' : undefined}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={show2 ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      onClick={() => setShow2((v) => !v)}
                      edge="end"
                    >
                      {show2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              size="large"
              type="submit"
              variant="contained"
              fullWidth
              disabled={!formIsValid || loading || !tempUsername} // Deshabilita si no hay tempUsername
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {loading ? 'Guardando…' : 'Cambiar contraseña'}
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};
