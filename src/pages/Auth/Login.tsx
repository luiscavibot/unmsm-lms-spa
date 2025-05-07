// import React from 'react'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { Stack, Box } from '@mui/material'
import { AuthLayout } from '@/components/layouts/AuthLayout/AuthLayout'

const Login = () => {
	return (
		<AuthLayout>
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
		</AuthLayout>
	)
}

export default Login;