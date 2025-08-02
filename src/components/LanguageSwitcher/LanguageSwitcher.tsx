import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, MenuItem, Typography, Box } from '@mui/material'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'

interface LanguageSwitcherProps {
	color?: string
}

const languages = [
	{ code: 'en', name: 'EN' },
	{ code: 'ru', name: 'RU' },
]

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
	color = '#1F1FFF',
}) => {
	const { i18n } = useTranslation()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng)
		handleClose()
	}

	const currentLang =
		languages.find(lng => lng.code === i18n.language)?.name ||
		i18n.language.toUpperCase()

	return (
		<Box>
			<Box
				onClick={handleClick}
				sx={{
					display: 'flex',
					alignItems: 'center',
					cursor: 'pointer',
					color: color,
					fontWeight: 500,
				}}
			>
				<Typography variant='body1'>{currentLang}</Typography>
				<ExpandMoreIcon fontSize='small' sx={{ ml: 0.5, mt: '-2px' }} />
			</Box>

			<Menu
				id='language-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'language-display',
				}}
				PaperProps={{
					sx: {
						width: '70px',
						ml: '-16px',
					},
				}}
			>
				{languages.map(language => (
					<MenuItem
						key={language.code}
						onClick={() => changeLanguage(language.code)}
						selected={i18n.language === language.code}
					>
						<Typography variant='body1'>{language.name}</Typography>
					</MenuItem>
				))}
			</Menu>
		</Box>
	)
}

export default LanguageSwitcher
