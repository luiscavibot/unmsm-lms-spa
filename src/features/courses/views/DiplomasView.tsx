import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import CardCourse from '@/components/common/CardCourse'

const DiplomasView = () => {
	const theme = useTheme()

	return (
		<Box sx={{ bgcolor: theme.palette.neutral.lightest, p: 3, borderRadius: '8px' }}>
		<Typography sx={{ color: theme.palette.secondary.dark, fontSize: '20px', fontWeight: '700', mb: 3 }} variant="h4">
			Bioinformática aplicada a la salud pública
		</Typography>
		<CardCourse />
		</Box>
	)
}

export default DiplomasView