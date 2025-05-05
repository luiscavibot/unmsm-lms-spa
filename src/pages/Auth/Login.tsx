// import React from 'react'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { AppBar, Toolbar, Container, Box } from '@mui/material'
import EscudoBiologiaIcon from '@/assets/icons/EscudoBiologiaIcon'

const Login = () => {
	return (
		<div>
			{/* Header */}
			<AppBar
				position="static"
				sx={{
					bgcolor: 'transparent',
					boxShadow: 'none',
				}}
			>
				<Toolbar sx={{
					color: '#0B1621',
				}}>
					<EscudoBiologiaIcon />
				</Toolbar>
			</AppBar>

			{/* Contenido del Login */}
			<Container maxWidth="xs" sx={{ marginTop: 4 }}>
				<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					padding: 3,
					boxShadow: 3,
					borderRadius: 2,
				}}
				>
					<LoginForm />
				</Box>
			</Container>
		</div>
	)
}

export default Login;