import { useNavigate } from 'react-router-dom'
import { LanguageSwitcher } from '@/components'
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material'
import routes from '@/router/routes.json'
import { getUserData } from '@/api/authService'

interface HeaderProps {
	onLogoClick: () => void
}

const Header = ({ onLogoClick }: HeaderProps) => {
	const navigate = useNavigate()
	const userData = getUserData()
	const isWideScreen = useMediaQuery('(min-width:1280px)')
	const isMobile = useMediaQuery('(max-width:480px)')

	return (
		<Box
			sx={{
				width: '100%',
				height: '80px',
				px: isMobile ? '20px' : '50px',
				boxSizing: 'border-box',
				display: 'flex',
				justifyContent: !isWideScreen ? 'space-between' : 'flex-end',
				alignItems: 'center',
				backgroundColor: '#0246FF',
				position: 'relative',
				zIndex: 1,
			}}
		>
			{!isWideScreen && (
				<Box
					onClick={onLogoClick}
					sx={{
						width: '153px',
						height: '39px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						bgcolor: '#EFEFEF',
						borderRadius: '30px',
						cursor: 'pointer',
						boxSizing: 'border-box',
					}}
				>
					<Typography
						sx={{
							mt: '-2px',
							fontFamily: 'Benzin',
							fontSize: '16px',
							fontWeight: 700,
							lineHeight: 1.3,
							background: 'linear-gradient(90deg, #0044FF, #002999)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							display: 'inline-block',
						}}
					>
						Stash Crypto
					</Typography>
				</Box>
			)}
			<Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
				<LanguageSwitcher color='#FFFFFF' />
				<IconButton
					onClick={
						userData?.roles?.includes('user')
							? () => navigate(routes.ProfilePage.path)
							: undefined
					}
					sx={{ p: 0 }}
				>
					<Box component='img' src='/person-white.svg' />
				</IconButton>
			</Box>
		</Box>
	)
}

export default Header
