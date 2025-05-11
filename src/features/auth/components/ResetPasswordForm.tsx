import {
	Box,
	Button,
	Stack,
	TextField,
	IconButton,
	InputAdornment,
} from '@mui/material'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
  
interface Props {
	token: string
}
  
export const ResetPasswordForm = ({ token }: Props) => {
	const navigate = useNavigate()
	const [password, setPassword] = useState('')
	const [confirm, setConfirm] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirm, setShowConfirm] = useState(false)

	const passwordsMatch = password === confirm
	const formIsValid = password !== '' && confirm !== '' && passwordsMatch

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!formIsValid) return

		console.log('Enviando nueva contraseña con token:', token)
		navigate('/reset-password/confirmation')
	}

	return (
		<Box component="form" onSubmit={handleSubmit}>
			<Stack spacing={4}>
				<TextField
				label="Nueva contraseña"
				type={showPassword ? 'text' : 'password'}
				fullWidth
				value={password}
				onChange={(e) => setPassword(e.target.value)}
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

				<TextField
				label="Confirmar contraseña"
				type={showConfirm ? 'text' : 'password'}
				fullWidth
				value={confirm}
				onChange={(e) => setConfirm(e.target.value)}
				error={confirm !== '' && !passwordsMatch}
				helperText={
					confirm !== '' && !passwordsMatch
					? 'Las contraseñas no coinciden'
					: ''
				}
				InputProps={{
					endAdornment: (
					<InputAdornment position="end">
						<IconButton
						onClick={() => setShowConfirm(!showConfirm)}
						edge="end"
						>
						{showConfirm ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
					),
				}}
				/>
			</Stack>

			<Button
				size="large"
				type="submit"
				variant="contained"
				fullWidth
				sx={{ mt: 3 }}
				disabled={!formIsValid}
			>
				Restablecer contraseña
			</Button>
		</Box>
	)
}