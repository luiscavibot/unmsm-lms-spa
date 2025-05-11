import { useParams, Navigate } from 'react-router-dom'
import { MainLayout } from '@/components/layouts/MainLayout/MainLayout'
import { Box, Breadcrumbs, Link, Typography } from '@mui/material'
// import React from 'react'
const allowedTypes = ['pregrado', 'posgrado']
import { useTheme } from '@mui/material/styles'
import CardCourse from '@/components/common/CardCourse'

export default function CoursesList() {
	const theme = useTheme()
	const { type } = useParams()
	if (!allowedTypes.includes(type || '')) {
		return <Navigate to="/404" replace />
	}

	return (
		<MainLayout>
			<Breadcrumbs aria-label="breadcrumb">
				<Link underline="hover" color="inherit" href="/courses/posgrado">
					Inicio
				</Link>
				<Typography sx={{ color: 'text.primary' }}>Cursos</Typography>
			</Breadcrumbs>
			<Box sx={{ bgcolor: theme.palette.neutral.lightest, p: 3, borderRadius: '8px', mt: 2 }}>
				<Typography sx={{ color: theme.palette.secondary.dark, fontSize: '20px', fontWeight: '700', mb: 3 }} variant="h4">
					Bioinformática aplicada a la salud pública
				</Typography>
				<CardCourse />
			</Box>
		</MainLayout>
	)
}
