import React from 'react'
import { Avatar, Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export default function CardCourse() {
	const theme = useTheme()
	return (
		<Box sx={{ width: '100%', maxWidth: '344px' }}>
			<Card variant="outlined">
				<CardContent>
					<Typography gutterBottom sx={{ color: theme.palette.secondary.dark, fontSize: '16px', fontWeight: '700', mb: '12px', lineHeight: '1.2' }}>
						Bioinformática Aplicada a la Vigilancia Genómica
					</Typography>
					<Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: 'center' }}>
						<Avatar sx={{ width: 32, height: 32 }}>
							NR
						</Avatar>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<Typography sx={{ fontSize: 14, fontWeight: 400 }} variant="body2">
								Docente responsable
							</Typography>
							<Typography sx={{ fontSize: 14, fontWeight: 600 }} variant="body2">
								Eduardo Romero
							</Typography>
						</Box>
					</Stack>
					<Divider sx={{ mb: 2 }} />
					<Stack direction="column" sx={{ gap: '44px 0px' }}>
						<Stack direction="column" spacing={'4px'}>
							<Typography variant="body2">
								Inicio: 01/03/2025
							</Typography>
							<Typography variant="body2">
								Fin: 24/09/2025
							</Typography>
						</Stack>
						<Typography sx={{ textAlign: 'right' }} variant="body2">
							2025-I | Módulo I
						</Typography>
					</Stack>
				</CardContent>
			</Card>
		</Box>
	)
}
