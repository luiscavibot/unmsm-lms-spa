import { AuthLayout } from '@/components/layouts/AuthLayout/AuthLayout'
import { Box, Typography, useTheme } from '@mui/material'

export default function ResetPasswordConfirmation() {
	const theme = useTheme()
	return (
		<AuthLayout>
			<Box sx={{ flexGrow: '1', bgcolor: theme.palette.primary.lightest, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<Box sx={{ width: { xs: '100%', md: '659px' }, py: 5, px: 2, mx: 2, bgcolor: theme.palette.neutral.light, borderRadius: 6 }}>
					<Box sx={{ maxWidth: '447px', marginX: 'auto' }}>
						<Typography variant="h2" fontSize={{xs: 16, md: 24}} fontWeight={800} mb={1} sx={{ textAlign: 'center' }}>
							Operación éxitosa
						</Typography>
						<Typography variant="body1" mb={3} sx={{ textAlign: 'center' }}>
							Ahora puedes iniciar sesión con tu nueva contraseña.
						</Typography>
						<Box
							component="img"
							src="/src/assets/images/operacion-exitosa.png"
							alt="Correo enviado"
							sx={{
								display: 'block',
								marginX: 'auto',
								maxWidth: { xs: '281px', md: '281px' },
								width: '100%',
								height: 'auto',
								objectFit: 'contain',
							}}
						/>
					</Box>
				</Box>
			</Box>
		</AuthLayout>
	)
}