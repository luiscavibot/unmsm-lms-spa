import { useParams, Navigate } from 'react-router-dom'
import { MainLayout } from '@/components/layouts/MainLayout/MainLayout'
// import React from 'react'
const allowedTypes = ['pregrado', 'posgrado']

export default function CoursesList() {
	const { type } = useParams()
	if (!allowedTypes.includes(type || '')) {
		return <Navigate to="/404" replace />
	}

	return (
		<MainLayout>
			<div>CoursesList {type}</div>
		</MainLayout>
	)
}
