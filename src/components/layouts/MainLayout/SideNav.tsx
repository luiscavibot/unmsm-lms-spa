import { BookOutlined, NewspaperOutlined } from '@mui/icons-material';
import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from '@mui/material';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
// import React from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { closeDrawer } from '@/store/slices/ui/uiSlice';
import { Link as RouterLink } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  //   padding: theme.spacing(0, 1),
  margin: '10px 4px',
  [theme.breakpoints.up('md')]: {
    margin: '12px 64px',
  },
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
  width: drawerWidth,
  display: 'flex',
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.neutral.lightest,
    color: theme.palette.neutral.dark,
    // position: 'static',
  },
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
        //   '& .MuiPaper-root': openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
        //   '& .MuiPaper-root': closedMixin(theme),
      },
    },
  ],
}));

export default function SideNav() {
  const open = useAppSelector((state) => state.ui.drawerOpen);
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={open}
      onClose={() => dispatch(closeDrawer())}
      ModalProps={{ keepMounted: true }}
    >
      <Toolbar />
      <Box sx={{ xs: { overflow: 'auto' }, md: { overflowX: 'hidden', overflowY: 'auto' } }}>
        <List>
          {/* Cursos */}
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={RouterLink}
              to="/courses"
              sx={[{ minHeight: 48, px: 2.5 }, open ? { justifyContent: 'initial' } : { justifyContent: 'center' }]}
            >
              <ListItemIcon sx={[{ minWidth: 0, justifyContent: 'center' }, open ? { mr: 3 } : { mr: 'auto' }]}>
                <BookOutlined />
              </ListItemIcon>
              <ListItemText primary="Cursos" sx={[open ? { opacity: 1 } : { opacity: 0 }]} />
            </ListItemButton>
          </ListItem>

          {/* Noticias */}
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component="a"
              href="https://biologia.unmsm.edu.pe/noticias"
              target="_blank"
              rel="noopener noreferrer"
              sx={[{ minHeight: 48, px: 2.5 }, open ? { justifyContent: 'initial' } : { justifyContent: 'center' }]}
            >
              <ListItemIcon sx={[{ minWidth: 0, justifyContent: 'center' }, open ? { mr: 3 } : { mr: 'auto' }]}>
                <NewspaperOutlined />
              </ListItemIcon>
              <ListItemText primary="Noticias" sx={[open ? { opacity: 1 } : { opacity: 0 }]} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
