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
import { useNavigate, useLocation } from 'react-router-dom';
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
  const { login } = useAuth(); // ← método expuesto por AuthProvider
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/courses';

  // ─────────────── Handlers ───────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password); // ← credenciales
      navigate(from, { replace: true }); // volver a la ruta original
    } catch (err: any) {
      setError(err.message ?? 'Ocurrió un error inesperado');
    } finally {
      setLoading(false);
    }
  };

  // ─────────────── UI ───────────────
  return (
    <Box width={{ xs: 'auto', sm: 320 }} mx="auto">
      <Typography variant="h2" fontWeight={800} textAlign="center" mb={1}>
        ¡Bienvenido/a a tu aula virtual!
      </Typography>
      <Typography variant="body2" textAlign="center" mb={3}>
        Ingresa para acceder a tus cursos y materiales en línea.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />

          <TextField
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

          <Link href="#" underline="hover" fontSize="0.9rem">
            Olvidé mi contraseña
          </Link>

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Ingresando…' : 'INGRESAR'}
          </Button>

          <Divider>o</Divider>

          <Button variant="outlined" startIcon={<GoogleIcon />} disabled>
            Inicia sesión con Google
          </Button>

          <Typography variant="body2" textAlign="center">
            ¿Necesitas una cuenta? <Link href="#">Contacta a soporte</Link>
          </Typography>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
