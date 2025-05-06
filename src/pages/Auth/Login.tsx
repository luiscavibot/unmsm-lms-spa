// import React from 'react'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { AppBar, Toolbar, Stack, Box } from '@mui/material'
import EscudoBiologiaIcon from '@/assets/icons/EscudoBiologiaIcon'
import { useTheme } from '@mui/material/styles'

const Login = () => {
	const theme = useTheme()
	return (
		<Stack sx={{ flexDirection: 'column', minHeight: '100vh', }}>
			<AppBar
				position="static"
				sx={{
					bgcolor: 'transparent',
					boxShadow: 'none',
					padding: { xs: '10px 4px', md: '12px 64px' },
				}}
			>
				<Toolbar sx={{
					color: theme.palette.secondary.darkest,
				}}>
					<EscudoBiologiaIcon />
				</Toolbar>
			</AppBar>
			<Stack
				marginX="auto"
				maxWidth="xl"
				paddingX={{xs: '4px', sm: '87px'}}
				direction="row"
				spacing={8}
				sx={{
					width: '100%',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
					flexGrow: '1',
				}}
				useFlexGap
			>
				<Box
					component="img"
					src="/src/assets/images/bg-login.png"
					alt="bg-login"
					sx={{
						display: { xs: 'none', md: 'block' },
						// maxWidth: '643px',
						maxWidth: { xs: '350px', lg: '500px', xl: '643px' },
						width: '100%',
						height: 'auto',
						objectFit: 'contain',
					}}
				/>
				<Stack justifyContent="center" marginX="auto">
					<LoginForm />
				</Stack>
			</Stack>
		</Stack>
	)
}

export default Login;