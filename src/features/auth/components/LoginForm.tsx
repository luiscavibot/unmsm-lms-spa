// src/features/auth/components/LoginForm.tsx

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
  import { useState } from 'react'
import GoogleIcon from '@/assets/icons/GoogleIcon'
  
  export const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false)
  
	return (
	  <Box sx={{ width: '100%', maxWidth: 360 }}>
		<Typography variant="h5" fontWeight={700} gutterBottom>
		  ¡Bienvenido/a a tu aula virtual!
		</Typography>
  
		<Typography variant="body2" sx={{ mb: 3 }}>
		  Ingresa para acceder a tus cursos y materiales en línea.
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
	
			<Link href="#" underline="hover" fontSize="14px">
				Olvidé mi contraseña
			</Link>
	
			<Button variant="contained" fullWidth>
				INGRESAR
			</Button>
	
			<Divider>o</Divider>
	
			<Button
				sx={{
					bgcolor: 'white',
					color: '#202124',
					fontWeight: '600',
					textTransform: 'initial',
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
  