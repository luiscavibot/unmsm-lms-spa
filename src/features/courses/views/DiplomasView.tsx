import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import CardCourse from '@/components/common/CardCourse'
import ChipsFilter from '../components/ChipsFilter'

const DiplomasView = () => {
	const theme = useTheme()
	const [activeChip, setActiveChip] = useState<'vigentes' | 'finalizados'>('vigentes')

	return (
		<Box sx={{ bgcolor: theme.palette.neutral.lightest, p: 3, borderRadius: '8px' }}>
			<ChipsFilter active={activeChip} onChange={setActiveChip} />
			<Typography sx={{ color: theme.palette.secondary.dark, fontSize: '20px', fontWeight: '700', mb: 3 }} variant="h4">
				Bioinformática aplicada a la salud pública
			</Typography>
			<CardCourse />
		</Box>
	)
}

export default DiplomasView