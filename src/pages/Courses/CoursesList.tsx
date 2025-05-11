import { useParams, Navigate } from 'react-router-dom'
import { MainLayout } from '@/components/layouts/MainLayout/MainLayout'
import { Breadcrumbs, Link, Typography } from '@mui/material'
// import React from 'react'
const allowedTypes = ['pregrado', 'posgrado']

export default function CoursesList() {
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
		</MainLayout>
	)
}
