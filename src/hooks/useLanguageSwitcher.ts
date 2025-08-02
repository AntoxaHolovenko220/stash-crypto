import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const useLanguageSwitcher = () => {
	const { i18n } = useTranslation()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

	const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const closeMenu = () => {
		setAnchorEl(null)
	}

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng)
		closeMenu()
	}

	return {
		anchorEl,
		openMenu,
		closeMenu,
		changeLanguage,
	}
}

export default useLanguageSwitcher
