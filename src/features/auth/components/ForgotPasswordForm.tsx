import { Box, Button, Stack, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateEmail } from '@/utils/validators'

export const ForgotPasswordForm = () => {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [error, setError] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!validateEmail(email)) {
			setError('Ingresa un correo electrónico válido')
			return
		}
		setError('')
		console.log('Solicitando reset para:', email)
		navigate('/forgot-password/confirmation')
	}

	return (
		<Box component="form" onSubmit={handleSubmit}>
			<Stack>
				<TextField
					label="Correo electrónico"
					fullWidth
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					error={Boolean(error)}
					helperText={error}
					sx={{ mb: 3 }}
				/>
				<Button size="large" type="submit" variant="contained" fullWidth sx={{ mb: 2 }}>
					Enviar enlace
				</Button>
				<Button component={Link} to="/" size="large" type="button" variant="text" fullWidth sx={{ textTransform: 'initial' }}>
					Volver a Inicio de sesión
				</Button>
			</Stack>
		</Box>
	)
}