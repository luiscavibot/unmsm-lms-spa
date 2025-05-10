import { ReactNode } from 'react'
// import { Link } from 'react-router-dom'
import { Stack } from '@mui/material'
import Header from './Header'

interface MainLayoutProps {
	children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
	return (
		<Stack sx={{ flexDirection: 'column', minHeight: '100vh', }}>
			<Header />
			{children}
		</Stack>
	)
}