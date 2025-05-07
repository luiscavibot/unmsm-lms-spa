import {
	Box,
	Button,
	Divider,
	IconButton,
	Stack,
	TextField,
	Typography,
	InputAdornment,
	Link,
  } from '@mui/material'
  import { Visibility, VisibilityOff } from '@mui/icons-material'
  import { Link as RouterLink } from 'react-router-dom';
  import { useState } from 'react'
import GoogleIcon from '@/assets/icons/GoogleIcon'
  
  export const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false)
  
	return (
		<Box width={{xs: 'auto', sm: '310px'}} maxWidth="100%">
			<Typography sx={{ maxWidth: '183px', textAlign: 'center', marginX: 'auto', mb: '8px' }} variant="h2" fontSize={{xs: 16, md: 24}} fontWeight={800}>
				¡Bienvenido/a <br /> a tu aula virtual!
			</Typography>
	
			<Typography variant="body2" sx={{ mb: 3, textAlign: 'center' }}>
				Ingresa para acceder a tus cursos y <br /> materiales en línea.
			</Typography>
	
			<Stack spacing={2}>
				<TextField
					label="Correo electrónico"
					fullWidth
				/>
		
				<TextField
					label="Contraseña"
					type={showPassword ? 'text' : 'password'}
					fullWidth
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
							<IconButton
								onClick={() => setShowPassword(!showPassword)}
								edge="end"
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
							</InputAdornment>
						),
					}}
				/>

				<div>
					<Link component={RouterLink} to="/forgot-password" underline="hover" fontSize="14px" sx={{ display: 'inline-block' }}>
						Olvidé mi contraseña
					</Link>
				</div>
		
				<Button size="large" variant="contained" fullWidth>
					INGRESAR
				</Button>
		
				<Divider>o</Divider>
		
				<Button
					sx={{
						bgcolor: 'white',
						color: '#202124',
						fontWeight: '600',
						textTransform: 'initial',
						height: 48,
						borderRadius: '12px',
						border: '1px solid #F7F7F7',
					}}
					variant="text"
					fullWidth
					startIcon={
						<GoogleIcon />
					}
				>
					Inicia sesión con Google
				</Button>
		
				<Typography variant="body2" align="center">
					¿Necesitas una cuenta?{' '}
					<Link href="#" underline="hover">
					Contacta a soporte
					</Link>
				</Typography>
			</Stack>
		</Box>
	)
  }
  