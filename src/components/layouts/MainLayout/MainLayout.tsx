import { ReactNode } from 'react'
// import { Link } from 'react-router-dom'
import { Box, Toolbar } from '@mui/material'
import Header from './Header'
import SideNav from './SideNav'

interface MainLayoutProps {
	children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
	return (
		// <Stack sx={{ flexDirection: 'column', minHeight: '100vh', }}>
		<Box sx={{ display: 'flex' }}>
			<Header />
				<SideNav />
				<Box component="main" sx={{ flexGrow: 1 }}>
					<Toolbar />
					<Box sx={{ p: 3 }}>
						{children}
					</Box>
				</Box>
		</Box>
	)
}