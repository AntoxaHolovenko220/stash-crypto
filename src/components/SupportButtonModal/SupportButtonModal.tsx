import { IconButton, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CustomerSupportModal from '../CustomerSupportModal'

const SupportButtonModal = () => {
	const { t } = useTranslation()
	const [openCustomerSupportModal, setOpenCustomerSupportModal] =
		useState(false)

	useEffect(() => {
		const handleOpen = () => setOpenCustomerSupportModal(true)

		window.addEventListener('openSupportModal', handleOpen)

		return () => {
			window.removeEventListener('openSupportModal', handleOpen)
		}
	}, [])

	return (
		<>
			<IconButton
				sx={{ position: 'fixed', bottom: '10px', right: '10px' }}
				onClick={() => setOpenCustomerSupportModal(true)}
			>
				<Box component='img' src='/support.svg' />
			</IconButton>

			<CustomerSupportModal
				open={openCustomerSupportModal}
				onClose={() => setOpenCustomerSupportModal(false)}
			/>
		</>
	)
}

export default SupportButtonModal
