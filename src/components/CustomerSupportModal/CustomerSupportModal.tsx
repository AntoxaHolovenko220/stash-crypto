import {
	Dialog,
	DialogContent,
	Typography,
	DialogActions,
	DialogTitle,
	Link,
	IconButton,
} from '@mui/material'
import TelegramIcon from '@mui/icons-material/Telegram'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { useTranslation } from 'react-i18next'

interface ModalProps {
	open: boolean
	onClose: () => void
}

const CustomerSupportModal = ({ open, onClose }: ModalProps) => {
	const { t } = useTranslation()
	return (
		<Dialog
			open={open}
			onClose={onClose}
			PaperProps={{
				sx: {
					boxSizing: 'border-box',
					width: '390px',
					minHeight: '263px',
					borderRadius: '24px',
					background: 'linear-gradient(180deg, #58A9FF 0%, #0044FF 50%)',
					color: '#FFFFFF',
					padding: '20px 16px',
				},
			}}
		>
			<DialogTitle sx={{ p: 0 }}>
				<Typography
					sx={{
						fontFamily: 'Manrope',
						fontSize: '20px',
						fontWeight: 700,
						textAlign: 'center',
					}}
				>
					{t('customer support')}
				</Typography>
			</DialogTitle>
			<DialogContent
				sx={{
					p: '8px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography
					sx={{
						mt: '15px',
						fontFamily: 'Manrope',
						fontSize: '18px',
						fontWeight: 400,
						textAlign: 'left',
					}}
				>
					{t('please select')}
				</Typography>
			</DialogContent>
			<DialogActions
				sx={{ display: 'flex', justifyContent: 'center', gap: '50px' }}
			>
				<Link
					href='https://t.me/+447879019929'
					target='_blank'
					rel='noopener noreferrer'
					style={{ textDecoration: 'none' }}
				>
					<IconButton>
						<TelegramIcon
							sx={{ width: '50px', height: '50px', color: '#FFFFFF' }}
						/>
					</IconButton>
				</Link>
				{/* <Link
						href='https://wa.me/380'
						target='_blank'
						rel='noopener noreferrer'
						style={{ textDecoration: 'none' }}
					> */}
				<IconButton>
					<WhatsAppIcon
						sx={{ width: '50px', height: '50px', color: '#1ed760' }}
					/>
				</IconButton>
				{/* </Link> */}
			</DialogActions>
		</Dialog>
	)
}

export default CustomerSupportModal
