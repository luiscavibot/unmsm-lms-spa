import React from 'react';
import EscudoBiologiaIcon from '@/assets/icons/EscudoBiologiaIcon';
import { Menu as MenuIcon, Logout, Person, Settings } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
  styled,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleDrawer } from '@/store/slices/ui/uiSlice';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { getInitials } from '@/helpers/avatar';
import { logoutAsync } from '@/store/thunks/logoutAsync';

// const drawerWidth = 240;

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })<AppBarProps>(({ theme }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   variants: [
//     {
//       props: ({ open }) => open,
//       style: {
//         marginLeft: drawerWidth,
//         width: `calc(100% - ${drawerWidth}px)`,
//         transition: theme.transitions.create(['width', 'margin'], {
//           easing: theme.transitions.easing.sharp,
//           duration: theme.transitions.duration.enteringScreen,
//         }),
//       },
//     },
//   ],
// }));

export default function Header() {
  const user = useAppSelector((state) => state.auth.user);
  const name = user?.name ?? '';
  const initials = getInitials(name);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCerrarSesion = () => {
    dispatch(logoutAsync())
      .unwrap()
      .then(() => navigate('/login', { replace: true }));
  };
  const handleToggleDrawer = () => {
    dispatch(toggleDrawer());
  };

  return (
    // <AppBar
    // 	position="fixed"
    // 	open={open}
    // 	sx={{
    // 		bgcolor: theme.palette.primary.darkest,
    // 		boxShadow: 'none',
    // 		padding: { xs: '10px 0px', md: '12px 0px' },
    // 	}}
    // >
    <MuiAppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: theme.palette.primary.darkest,
        boxShadow: 'none',
        // padding: { xs: '10px 0px', md: '12px 0px' },
      }}
    >
      <Toolbar
        sx={{
          color: theme.palette.neutral.lightest,
          display: 'flex',
          justifyContent: 'space-between',
          // paddingY: { xs: '10px', md: '12px' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleToggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/courses/posgrado" style={{ display: 'inline-flex', alignItems: 'center', color: 'inherit' }}>
            <EscudoBiologiaIcon />
          </Link>
        </Box>
        <div>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography component="span" sx={{ fontSize: 14, fontWeight: 600, color: theme.palette.neutral.lightest }}>
              {user?.name || 'Usuario'}
            </Typography>
            <IconButton
              onClick={handleMenu}
              size="small"
              sx={{ ml: 1 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>{initials}</Avatar>
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography sx={{ color: theme.palette.neutral.dark }}>{user?.name || 'Usuario'}</Typography>
              <Typography variant="body3" sx={{ color: theme.palette.neutral.dark }}>
                {user?.email}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleClose} disabled>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              Perfil
            </MenuItem>
            <MenuItem onClick={handleClose} disabled>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Configuración
            </MenuItem>
            <MenuItem onClick={handleCerrarSesion}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Cerrar sesión
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </MuiAppBar>
  );
}
