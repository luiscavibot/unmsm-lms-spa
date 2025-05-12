import React from 'react'
import { Box } from '@mui/material'

interface TabPanelProps {
	children?: React.ReactNode
	dir?: string
	index: number
	value: number
}

export default function TabPanel({ children, value, index, ...other }: TabPanelProps) {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
		{value === index && (
			<Box sx={{ p: 3 }}>
				{children}
			</Box>
		)}
		</div>
	)
}