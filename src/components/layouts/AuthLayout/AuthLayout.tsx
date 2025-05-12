import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Stack } from '@mui/material'
import EscudoBiologiaIcon from '@/assets/icons/EscudoBiologiaIcon'
import { useTheme } from '@mui/material/styles'

interface AuthLayoutProps {
	children: ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
	const theme = useTheme()
	return (
		<Stack sx={{ flexDirection: 'column', minHeight: '100vh', }}>
			<AppBar
				position="static"
				sx={{
					bgcolor: 'primary.darkest',
					boxShadow: 'none',
					// padding: { xs: '10px 4px', md: '12px 64px' },
				}}
			>
				<Toolbar sx={{
					color: theme.palette.neutral.lightest,
				}}>
					<Link to="/" style={{ display: 'inline-flex', alignItems: 'center', color: 'inherit' }}>
						<EscudoBiologiaIcon />
					</Link>
				</Toolbar>
			</AppBar>
			{children}
		</Stack>
	)
}