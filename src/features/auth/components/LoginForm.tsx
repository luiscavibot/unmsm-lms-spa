import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Link,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import GoogleIcon from '@/assets/icons/GoogleIcon';
import { useAuth } from '../hooks/useAuth';

const LoginForm = () => {
  // ─────────────── State local ───────────────
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ─────────────── Context & Router ───────────────
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/courses';

  // ─────────────── Handlers ───────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message ?? 'Ocurrió un error inesperado');
    } finally {
      setLoading(false);
    }
  };

  // ─────────────── UI ───────────────
  return (
    <Box width={{ xs: 'auto', sm: '310px' }} maxWidth="100%">
      <Typography
        sx={{ maxWidth: '183px', textAlign: 'center', marginX: 'auto', mb: '8px' }}
        variant="h2"
        fontSize={{ xs: 16, md: 24 }}
        fontWeight={800}
      >
        ¡Bienvenido/a <br /> a tu aula virtual!
      </Typography>

      <Typography variant="body2" sx={{ mb: 3, textAlign: 'center' }}>
        Ingresa para acceder a tus cursos y <br /> materiales en línea.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={2}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <TextField
              label="Correo electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              fullWidth
            />

            <TextField
              fullWidth
              label="Contraseña"
              autoComplete="current-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputLabelProps={{ shrink: true }}
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

            <div>
              <Link
                component={RouterLink}
                to="/forgot-password"
                underline="hover"
                fontSize="14px"
                sx={{ display: 'inline-block' }}
              >
                Olvidé mi contraseña
              </Link>
            </div>

            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? 'Ingresando…' : 'INGRESAR'}
            </Button>
          </Stack>{' '}
        </Box>
        <Divider>o</Divider>

        <Button
          sx={{
            bgcolor: 'white',
            color: '#202124',
            fontWeight: '600',
            textTransform: 'initial',
            height: 48,
            borderRadius: '12px',
            border: '1px solid #F7F7F7',
          }}
          variant="text"
          fullWidth
          startIcon={<GoogleIcon />}
          disabled
        >
          Inicia sesión con Google
        </Button>

        <Typography variant="body2" align="center">
          ¿Necesitas una cuenta?{' '}
          <Link href="#" underline="hover">
            Contacta a soporte
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default LoginForm;
