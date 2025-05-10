import { BookOutlined, NewspaperOutlined } from '@mui/icons-material';
import { Drawer as MuiDrawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box } from '@mui/material'
import { styled, Theme, CSSObject } from '@mui/material/styles';
// import React from 'react'
import { useAppSelector } from '@/store/hooks';

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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
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
  }),
);

export default function SideNav() {
	const open = useAppSelector((state) => state.ui.drawerOpen);

	return (
		<Drawer
			variant="permanent"
			open={open}
		>
			{/* <DrawerHeader /> */}
			<Toolbar />
			<Box sx={{ xs: {overflow: 'auto'}, md: {overflowX: 'hidden', overflowY: 'auto'} }}>
				<List>
					<ListItem disablePadding sx={{ display: 'block' }}>
						<ListItemButton
							sx={[
								{
									minHeight: 48,
									px: 2.5,
								},
								open
								? {
									justifyContent: 'initial',
									}
								: {
									justifyContent: 'center',
									},
							]}
						>
							<ListItemIcon
								sx={[
								{
									minWidth: 0,
									justifyContent: 'center',
								},
								open
									? {
										mr: 3,
									}
									: {
										mr: 'auto',
									},
								]}
							>
								<BookOutlined />
							</ListItemIcon>
							<ListItemText
								primary={'Cursos'}
								sx={[
								open
									? {
										opacity: 1,
									}
									: {
										opacity: 0,
									},
								]}
							/>
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding sx={{ display: 'block' }}>
						<ListItemButton
							sx={[
								{
									minHeight: 48,
									px: 2.5,
								},
								open
								? {
									justifyContent: 'initial',
									}
								: {
									justifyContent: 'center',
									},
							]}
						>
							<ListItemIcon
								sx={[
								{
									minWidth: 0,
									justifyContent: 'center',
								},
								open
									? {
										mr: 3,
									}
									: {
										mr: 'auto',
									},
								]}
							>
								<NewspaperOutlined />
							</ListItemIcon>
							<ListItemText
								primary={'Noticias'}
								sx={[
								open
									? {
										opacity: 1,
									}
									: {
										opacity: 0,
									},
								]}
							/>
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
		</Drawer>
	)
}
