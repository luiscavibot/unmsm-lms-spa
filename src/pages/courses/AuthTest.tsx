import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';

const AuthTest = () => {
  const { user, logout } = useAuth();
  console.log('user', user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        ¡Hola, {user?.email ?? 'usuario'}!
      </Typography>

      <Button variant="outlined" color="secondary" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </Box>
  );
};

export default AuthTest;
