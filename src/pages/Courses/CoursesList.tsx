import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { MainLayout } from '@/components/layouts/MainLayout/MainLayout'
import { Alert, Box, Breadcrumbs, Button, Collapse, IconButton, Link, Typography } from '@mui/material'
const allowedTypes = ['pregrado', 'posgrado']
import { useTheme } from '@mui/material/styles'
import { Close, Sensors } from '@mui/icons-material'

export default function CoursesList() {
	const theme = useTheme()
	const { type } = useParams()
	if (!allowedTypes.includes(type || '')) {
		return <Navigate to="/404" replace />
	}

	const [open, setOpen] = React.useState(true);

	return (
		<MainLayout>
			<Breadcrumbs sx={{ mb: 6 }} aria-label="breadcrumb">
				<Link underline="hover" color="inherit" href="/courses/posgrado">
					Inicio
				</Link>
				<Typography sx={{ color: 'text.primary' }}>Cursos</Typography>
			</Breadcrumbs>
			<Collapse in={open}>
				<Alert
					icon={false}
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								setOpen(false);
							}}
						>
							<Close fontSize="inherit" />
						</IconButton>
					}
					sx={{
						mb: 2,
						backgroundColor: theme.palette.secondary.darkest,
						color: theme.palette.neutral.lightest,
						borderRadius: '24px',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: '64px',
						position: 'relative',
						'.MuiAlert-message': {
							width: '100%',
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
						},
						'.MuiAlert-action': {
							position: 'absolute',
							right: '24px',
							top: '16px',
						},
					}}
				>
					<Box sx={{ maxWidth: 550 }}>
						<Typography
							sx={{
								color: theme.palette.neutral.lightest,
								fontSize: 32,
								fontWeight: 700,
								lineHeight: 1,
								mb: '4px',
							}}
						>
							¡Atención!
							{' '}
							<Typography
								component="span"
								sx={{
									color: 'inherit',
									fontSize: 'inherit',
									fontWeight: 'inherit',
									textDecoration: 'underline',
									textUnderlineOffset: 8,
									textDecorationThickness: 2,
								}}
							>
								Genómica Evolutiva
							</Typography>
							{' '}
							está por comenzar.
						</Typography>
						<Typography
							sx={{
								color: theme.palette.neutral.lightest,
								fontSize: 24,
								fontWeight: 400,
							}}
						>
							Prepárate para seguir aprendiendo.
						</Typography>
						<Typography
							sx={{
								color: theme.palette.neutral.lightest,
								fontSize: 20,
								fontWeight: 700,
								mt: '16px',
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<Sensors fontSize="medium" sx={{ mr: '6px', color: '#F44336' }} />
							<span>Horario: 6:00pm</span>
						</Typography>
					</Box>
					<Button variant='contained' size='large'>Ir a clase</Button>
				</Alert>
			</Collapse>
		</MainLayout>
	)
}
