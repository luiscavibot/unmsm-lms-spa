// src/pages/Auth/LoginForm.tsx
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
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import GoogleIcon from '@/assets/icons/GoogleIcon';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginAsync } from '@/store/thunks/loginAsync';
import { AuthStatusLogin } from '@/store/slices/auth/types';
import { ChallengeName } from '../interfaces/Cognito';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { status, error: authError } = useAppSelector((state) => state.auth);
  const loading = status === AuthStatusLogin.Loading;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/courses';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginAsync({ username: email, password })).unwrap();
      if (result.challengeName === ChallengeName.NewPasswordRequired) {
        navigate('/new-password', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch {}
  };

  return (
    <Box width={{ xs: 'auto', sm: 310 }} maxWidth="100%" mx="auto">
      <Typography
        sx={{ maxWidth: 400, textAlign: 'center', mx: 'auto', mb: 1 }}
        variant="h1"
        fontSize={{ xs: 16, md: 24 }}
        fontWeight={800}
      >
        AULA VIRTUAL RAIMONDI
      </Typography>

      <Typography variant="body2" sx={{ mb: 3, textAlign: 'center' }}>
        Ingrese para acceder a sus cursos y <br /> materiales en línea.
      </Typography>

      {authError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {t(authError)}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Correo electrónico"
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            fullWidth
          />

          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            autoComplete="current-password"
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

          <Link component={RouterLink} to="/forgot-password" underline="hover" fontSize="0.9rem">
            Olvidé mi contraseña
          </Link>
          <Button type="submit" variant="contained" disabled={loading} fullWidth>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'INGRESAR'}
          </Button>
        </Stack>
      </Box>
      {/* 
      <Divider sx={{ my: 2 }}>o</Divider> */}

      {/* <Button
        sx={{
          bgcolor: 'white',
          color: '#202124',
          fontWeight: 600,
          textTransform: 'none',
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
      </Button> */}

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        ¿Necesitas una cuenta?{' '}
        <Link target="_blank" href="mailto:soporteinformaticoupg.fcb@unmsm.edu.pe" underline="hover">
          Contacta a soporte
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
