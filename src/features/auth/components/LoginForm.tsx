import { Box, Button, Divider, IconButton, Stack, TextField, Typography, InputAdornment, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import GoogleIcon from '@/assets/icons/GoogleIcon';
import { signIn } from '@/services/authService';
// import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //   const [confirmPassword, setConfirmPassword] = useState('');
  //   const navigate = useNavigate();

  const handleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const session = await signIn(email, password);
      console.log('Sign in successful', session);
      if (session && typeof session.AccessToken !== 'undefined') {
        localStorage.setItem('accessToken', session.AccessToken);
        if (localStorage.getItem('accessToken')) {
          //TODO: ¿POR QUÉ LOCATION HREF Y NO UN NAVIGATE?
          window.location.href = '/only-authenticated';
        } else {
          console.error('Session token was not set properly.');
        }
      } else {
        console.error('SignIn session or AccessToken is undefined.');
      }
    } catch (error) {
      alert(`Sign in failed: ${error}`);
    }
  };

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

      <form onSubmit={handleSignIn}>
        <Stack spacing={2}>
          <TextField
            label="Correo electrónico"
            fullWidth
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <TextField
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <div>
            <Link href="#" underline="hover" fontSize="14px" sx={{ display: 'inline-block' }}>
              Olvidé mi contraseña
            </Link>
          </div>

          <Button size="large" variant="contained" fullWidth type="submit">
            INGRESAR
          </Button>

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
      </form>
    </Box>
  );
};
