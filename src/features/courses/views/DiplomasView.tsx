import { useState } from 'react'
import { Autocomplete, Box, FormControl, IconButton, Input, InputAdornment, InputLabel, Stack, TextField, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import CardCourse from '@/components/common/CardCourse'
import ChipsFilter from '../components/ChipsFilter'
import { Search } from '@mui/icons-material'

const semesters = [
	'2025-I',
	'2024-II',
	'2024-I',
	'2023-II',
	'2023-I'
]

const DiplomasView = () => {
	const theme = useTheme()
	const [activeChip, setActiveChip] = useState<'vigentes' | 'finalizados'>('vigentes')

	const handleClickSearch = () => {
		// TODO: Implement search logic here
	}

	return (
		<Box sx={{ bgcolor: theme.palette.neutral.lightest, p: 3, borderRadius: '8px' }}>
			<Stack direction="row" justifyContent="space-between" alignItems="center" mb={5}>
				<ChipsFilter active={activeChip} onChange={setActiveChip} />
				<Stack direction="row" spacing={2} alignItems="center">
					<FormControl sx={{ m: 1, width: '309px' }} variant="standard" size="medium">
						<InputLabel htmlFor="search-input">Buscar</InputLabel>
						<Input
							id="search-input"
							type="text"
							endAdornment={
							<InputAdornment position="end">
								<IconButton
									onClick={handleClickSearch}
								>
									<Search />
								</IconButton>
							</InputAdornment>
							}
						/>
					</FormControl>
					<Autocomplete
						disablePortal
						options={semesters}
						sx={{ width: 300 }}
						renderInput={(params) => <TextField {...params} label="Semestre" variant="standard" />}
					/>
				</Stack>
			</Stack>
			<Typography sx={{ textAlign: 'right', mb: 4 }} variant="body2">
				<Typography component="span" sx={{ color: theme.palette.neutral.main, fontSize: '14px', fontWeight: '700' }} variant="body2">
					Resultados:
				</Typography>
				{' '}
				<Typography component="span" sx={{ color: theme.palette.neutral.main, fontSize: '14px', fontWeight: '400' }} variant="body2">
					5 cursos
				</Typography>
			</Typography>
			<Typography sx={{ color: theme.palette.secondary.dark, fontSize: '20px', fontWeight: '700', mb: 3 }} variant="h4">
				Bioinformática aplicada a la salud pública
			</Typography>
			<Stack direction="row" flexWrap="wrap" spacing={2} mb={4} useFlexGap>
				<Box sx={{ flex: '1 1 30%', minWidth: 280, maxWidth: '32%', display: 'flex', justifyContent: 'center', }}>
					<CardCourse />
				</Box>
				<Box sx={{ flex: '1 1 30%', minWidth: 280, maxWidth: '32%', display: 'flex', justifyContent: 'center', }}>
					<CardCourse />
				</Box>
				<Box sx={{ flex: '1 1 30%', minWidth: 280, maxWidth: '32%', display: 'flex', justifyContent: 'center', }}>
					<CardCourse />
				</Box>
				<Box sx={{ flex: '1 1 30%', minWidth: 280, maxWidth: '32%', display: 'flex', justifyContent: 'center', }}>
					<CardCourse />
				</Box>
				<Box sx={{ flex: '1 1 30%', minWidth: 280, maxWidth: '32%', display: 'flex', justifyContent: 'center', }}>
					<CardCourse status='sin-iniciar' />
				</Box>
			</Stack>
		</Box>
	)
}

export default DiplomasView