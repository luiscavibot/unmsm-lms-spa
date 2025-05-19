import { ReactNode } from 'react';
// import { Link } from 'react-router-dom'
import { Box, Container, Toolbar } from '@mui/material';
import Header from './Header';
import SideNav from './SideNav';

interface MainLayoutProps {
  children: ReactNode;
}
const CONTENT_MAX_WIDTH = 1200;
export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    // <Stack sx={{ flexDirection: 'column', minHeight: '100vh', }}>
    <Box sx={{ display: 'flex' }}>
      <Header />
      <SideNav />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: 2,
          py: 3,
          mx: 'auto',
          width: '100%',
          maxWidth: CONTENT_MAX_WIDTH,
        }}
      >
        <Toolbar />

        <Container disableGutters maxWidth={false} sx={{ p: 0 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};
