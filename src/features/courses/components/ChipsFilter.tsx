import { Chip, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

type Option = 'vigentes' | 'finalizados'

interface ChipsFilterProps {
	active: Option
	onChange: (option: Option) => void
	options?: Option[]
}

const ChipsFilter = ({ active, onChange, options = ['vigentes', 'finalizados'] }: ChipsFilterProps) => {
	const theme = useTheme()

	return (
		<Box>
		{options.map((option) => (
			<Chip
			key={option}
			label={option.charAt(0).toUpperCase() + option.slice(1)}
			clickable
			onClick={() => onChange(option)}
			sx={{
				padding: '4px 10px',
				mr: 1,
				bgcolor: active === option ? theme.palette.primary.dark : 'transparent',
				color: active === option ? theme.palette.primary.contrastText : theme.palette.primary.main,
				border: active === option ? 'none' : `1px solid ${theme.palette.primary.main}`,
				'&:hover': {
				bgcolor:
					active === option
					? theme.palette.primary.main
					: theme.palette.action.hover
				}
			}}
			/>
		))}
		</Box>
	)
}

export default ChipsFilter
