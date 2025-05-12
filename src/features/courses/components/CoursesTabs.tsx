import React from 'react'
import { Box, Tab, Tabs } from '@mui/material'

interface CoursesTabsProps {
	value: number
	onChange: (event: React.SyntheticEvent, newValue: number) => void
}

export default function CoursesTabs({ value, onChange }: CoursesTabsProps) {
	return (
		<Box>
			<Tabs
				value={value}
				onChange={onChange}
				indicatorColor="primary"
				textColor="primary"
				variant="fullWidth"
				aria-label="full width tabs example"
			>
				<Tab label="Maestrías" disabled />
				<Tab label="Doctorados" disabled />
				<Tab label="Diplomados" />
				<Tab label="Segundas especialidades" disabled />
			</Tabs>
		</Box>
	)
}